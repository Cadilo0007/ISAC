import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { store } from './server/store.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'artcircle2026';

app.use(express.json({ limit: '10mb' }));

// Helper to extract bearer token
function getBearerToken(req: Request): string | undefined {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return undefined;
}

// Admin Auth Middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = getBearerToken(req);
  if (!token || !store.validateAdminSession(token)) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
  }
  next();
}

// -------------------------------------------------------------
// PUBLIC & ADMIN API ROUTES
// -------------------------------------------------------------

// Admin Auth Routes
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  if (password === ADMIN_PASSWORD) {
    const token = store.createAdminSession();
    return res.json({ success: true, token, role: 'curator_admin' });
  }
  return res.status(401).json({ error: 'Incorrect administrative password' });
});

app.post('/api/admin/logout', (req: Request, res: Response) => {
  const token = getBearerToken(req);
  if (token) {
    store.invalidateAdminSession(token);
  }
  return res.json({ success: true });
});

app.get('/api/admin/check', (req: Request, res: Response) => {
  const token = getBearerToken(req);
  const isValid = store.validateAdminSession(token);
  return res.json({ authenticated: isValid });
});

// Artworks
app.get('/api/artworks', (req: Request, res: Response) => {
  const artworks = store.getArtworks();
  return res.json(artworks);
});

app.get('/api/artworks/:id', (req: Request, res: Response) => {
  const artwork = store.getArtworkById(req.params.id);
  if (!artwork) {
    return res.status(404).json({ error: 'Artwork not found' });
  }
  return res.json(artwork);
});

app.post('/api/artworks', requireAdmin, (req: Request, res: Response) => {
  const { title, artist, year, medium, dimensions, price, category, status, image, description, artistBio, edition, featured } = req.body;
  if (!title || !artist || !price || !category) {
    return res.status(400).json({ error: 'Missing required artwork fields' });
  }
  const newArtwork = store.addArtwork({
    title,
    artist,
    year: parseInt(year, 10) || new Date().getFullYear(),
    medium: medium || 'Mixed media on archival support',
    dimensions: dimensions || 'Variable dimensions',
    price: Number(price),
    currency: 'USD',
    category: category || 'Paintings',
    status: status || 'available',
    image: image || '/src/assets/images/artwork_silent_contour_1792565466306.jpg',
    description: description || '',
    artistBio: artistBio || '',
    edition: edition || 'Original unique artwork',
    featured: !!featured,
  });
  return res.status(201).json(newArtwork);
});

app.put('/api/artworks/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = store.updateArtwork(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Artwork not found' });
  }
  return res.json(updated);
});

app.delete('/api/artworks/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = store.deleteArtwork(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Artwork not found' });
  }
  return res.json({ success: true, id: req.params.id });
});

// Admin status change: Available / Reserved / Sold
app.post('/api/artworks/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { status } = req.body;
  if (!['available', 'reserved', 'sold'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be available, reserved, or sold.' });
  }
  const updated = store.updateArtworkStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ error: 'Artwork not found' });
  }
  return res.json(updated);
});

// Public reservation endpoint: locks artwork if available
app.post('/api/artworks/:id/reserve', (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Collector name and email are required to request a reservation.' });
  }
  const result = store.reserveArtwork(req.params.id, name);
  if (!result.success) {
    return res.status(409).json({ error: result.error });
  }

  // Also log inquiry for the admin
  store.addInquiry({
    artworkId: req.params.id,
    artworkTitle: result.artwork?.title,
    type: 'reservation',
    name,
    email,
    phone,
    subject: `Artwork Reservation: ${result.artwork?.title}`,
    message: message || `Collector ${name} placed a reservation request for ${result.artwork?.title}.`,
  });

  return res.json({
    success: true,
    message: `Artwork "${result.artwork?.title}" is now held in reservation. Our curator will contact you shortly.`,
    artwork: result.artwork,
  });
});

// Journal
app.get('/api/journal', (req: Request, res: Response) => {
  const posts = store.getJournal();
  return res.json(posts);
});

app.get('/api/journal/:id', (req: Request, res: Response) => {
  const post = store.getJournalById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Article not found' });
  }
  return res.json(post);
});

app.post('/api/journal', requireAdmin, (req: Request, res: Response) => {
  const { title, category, author, date, readTime, excerpt, content, coverImage, published } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newPost = store.addJournalPost({
    title,
    slug,
    category: category || 'Reflections',
    author: author || 'Art Circle Studio',
    date: date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: readTime || '5 min read',
    excerpt: excerpt || content.slice(0, 160) + '...',
    content,
    coverImage: coverImage || '/src/assets/images/journal_studio_visit_1792565486137.jpg',
    published: published !== undefined ? published : true,
  });
  return res.status(201).json(newPost);
});

app.put('/api/journal/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = store.updateJournalPost(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Article not found' });
  }
  return res.json(updated);
});

app.delete('/api/journal/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = store.deleteJournalPost(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Article not found' });
  }
  return res.json({ success: true, id: req.params.id });
});

// Founder & About Story
app.get('/api/founder', (req: Request, res: Response) => {
  const founder = store.getFounder();
  return res.json(founder);
});

app.put('/api/founder', requireAdmin, (req: Request, res: Response) => {
  const updated = store.updateFounder(req.body);
  return res.json(updated);
});

// Inquiries
app.get('/api/inquiries', requireAdmin, (req: Request, res: Response) => {
  const inquiries = store.getInquiries();
  return res.json(inquiries);
});

app.post('/api/inquiries', (req: Request, res: Response) => {
  const { name, email, phone, subject, message, artworkId, artworkTitle, type } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  const inquiry = store.addInquiry({
    name,
    email,
    phone,
    subject: subject || 'General Gallery Inquiry',
    message,
    artworkId,
    artworkTitle,
    type: type || 'general',
  });
  return res.status(201).json({ success: true, inquiry, message: 'Thank you for reaching out. A studio curator will reply within 24 hours.' });
});

app.put('/api/inquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const { status } = req.body;
  const updated = store.updateInquiryStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }
  return res.json(updated);
});

// Newsletter
app.post('/api/newsletter', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }
  store.addSubscriber(email);
  return res.json({ success: true, message: 'You have been added to Letters from Art Circle.' });
});

// -------------------------------------------------------------
// VITE DEV SERVER OR PRODUCTION STATIC SERVING
// -------------------------------------------------------------
async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ART CIRCLE Studio server running on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
