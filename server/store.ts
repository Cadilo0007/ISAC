import fs from 'fs';
import path from 'path';

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  price: number;
  currency: string;
  category: 'Paintings' | 'Photography' | 'Sculptures' | 'Prints';
  status: 'available' | 'reserved' | 'sold';
  image: string;
  description: string;
  artistBio: string;
  edition?: string;
  featured: boolean;
  reservedAt?: string;
  reservedBy?: string;
  soldAt?: string;
}

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
}

export interface FounderInfo {
  name: string;
  role: string;
  portrait: string;
  philosophyStatement: string;
  originStory: string;
  missionStatement: string;
  curatorialApproach: string;
  location: string;
  foundedYear: number;
}

export interface Inquiry {
  id: string;
  artworkId?: string;
  artworkTitle?: string;
  type: 'artwork_purchase' | 'reservation' | 'artist_submission' | 'collaboration' | 'general';
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'in_progress' | 'replied' | 'archived';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface StudioData {
  artworks: Artwork[];
  journal: JournalPost[];
  founder: FounderInfo;
  inquiries: Inquiry[];
  subscribers: NewsletterSubscriber[];
  adminSessionTokens: string[];
}

const DATA_FILE = path.resolve(process.cwd(), 'server-data.json');

const INITIAL_DATA: StudioData = {
  artworks: [
    {
      id: 'art-silent-contour',
      title: 'Silent Contour No. 4',
      artist: 'Elena Vance & Studio',
      year: 2024,
      medium: 'Oil, marble dust, and raw pigment on heavy Belgian linen',
      dimensions: '140 × 110 cm (55 × 43 in)',
      price: 4800,
      currency: 'USD',
      category: 'Paintings',
      status: 'available',
      image: '/src/assets/images/artwork_silent_contour_1792565466306.jpg',
      description: 'An exploration of architectural silence and textural restraint. Thick impasto contrasts with exposed raw linen weave, creating a quiet tactile dialogue between light and void. Created across eight weeks of successive pigment stratification in our London studio.',
      artistBio: 'Elena Vance (b. 1984) is a London and Lisbon-based painter and founder of Art Circle. Her practice examines architectural reduction, tactile materiality, and quiet meditative spaces.',
      edition: 'Unique original piece',
      featured: true,
    },
    {
      id: 'art-chroma-meridian',
      title: 'Chroma Meridian at Dawn',
      artist: 'Evelyn Dubois',
      year: 2023,
      medium: 'Archival pigment print on Hahnemühle Photo Rag, museum float frame in American walnut',
      dimensions: '120 × 90 cm (47 × 35 in)',
      price: 3200,
      currency: 'USD',
      category: 'Photography',
      status: 'sold',
      soldAt: '2026-09-12T14:20:00Z',
      image: '/src/assets/images/artwork_chroma_meridian_1792565467666.jpg',
      description: 'Captured along the misty North Atlantic coast during the winter solstice, Chroma Meridian isolates subtle mineral gradients across sea and horizon. The minimal composition dissolves the boundary between liquid atmosphere and sky.',
      artistBio: 'Evelyn Dubois (b. 1978, Normandy) investigates the atmospheric liminality of coastal topographies. Her works are held in institutional and private collections throughout Paris, Basel, and Zurich.',
      edition: 'Edition 3 of 6 (Sold)',
      featured: true,
    },
    {
      id: 'art-monolith-study',
      title: 'Monolith Study in Basalt',
      artist: 'Kaelen Chen',
      year: 2024,
      medium: 'Hand-coiled textured stoneware, blackened bronze patina, honed travertine pedestal',
      dimensions: '48 × 34 × 36 cm (19 × 13 × 14 in)',
      price: 5600,
      currency: 'USD',
      category: 'Sculptures',
      status: 'reserved',
      reservedAt: '2026-10-18T10:15:00Z',
      reservedBy: 'Collector in Munich',
      image: '/src/assets/images/artwork_monolith_study_1792565468143.jpg',
      description: 'A weighty sculptural vessel exploring balance, compression, and geological time. Created through gradual reductive carving and high-fire reduction, resulting in an ancient, tactile surface reminiscent of volcanic strata.',
      artistBio: 'Kaelen Chen (b. 1982, Taipei) works between ceramic sculpture and spatial design, interrogating tectonic gestures and organic imperfection.',
      edition: 'Unique original sculpture',
      featured: true,
    },
    {
      id: 'art-vellum-monotype',
      title: 'Vellum Monotype VII',
      artist: 'Astrid Lindholm',
      year: 2024,
      medium: 'Monotype relief print and mineral sumi ink on handmade Japanese washi paper',
      dimensions: '76 × 56 cm (30 × 22 in)',
      price: 1950,
      currency: 'USD',
      category: 'Prints',
      status: 'available',
      image: '/src/assets/images/artwork_vellum_monotype_1792565484177.jpg',
      description: 'A singular, non-editioned monotype created with slow ink washes and dampened botanical fibers. Deckled raw edges float over natural warm cotton matting within a bespoke white oak floater frame.',
      artistBio: 'Astrid Lindholm (b. 1991, Stockholm) is a master printmaker whose delicate ink matrices examine ephemerality and quiet cadence.',
      edition: 'Monotype 1 of 1 (Non-editioned)',
      featured: true,
    },
    {
      id: 'art-spatial-echoes',
      title: 'Spatial Echoes in Ochre & Indigo',
      artist: 'Julian Croft',
      year: 2024,
      medium: 'Casein, oil wash, and graphite on stretched Belgian linen',
      dimensions: '165 × 135 cm (65 × 53 in)',
      price: 6400,
      currency: 'USD',
      category: 'Paintings',
      status: 'available',
      image: '/src/assets/images/artwork_spatial_echoes_1792565485026.jpg',
      description: 'Layered semi-transparent wash strokes build an inner luminosity. The juxtaposition of earth umber against raw indigo evokes architectural shadows cast across warm plaster walls.',
      artistBio: 'Julian Croft (b. 1975, Melbourne) explores chromatic resonance and color-field architecture, exhibiting widely across Europe and Australia.',
      edition: 'Unique original piece',
      featured: true,
    },
    {
      id: 'art-bronze-torso',
      title: 'Brutalist Column No. 3',
      artist: 'Marcus Vane',
      year: 2023,
      medium: 'Cast bronze with hand-applied cold wax finish, volcanic basalt plinth',
      dimensions: '72 × 38 × 30 cm (28 × 15 × 12 in)',
      price: 8200,
      currency: 'USD',
      category: 'Sculptures',
      status: 'sold',
      soldAt: '2026-08-30T16:00:00Z',
      image: '/src/assets/images/artwork_bronze_torso_1792565485911.jpg',
      description: 'A sharp geometric study in architectural gravity and cast bronze mass. Each planar facet catches ambient gallery light in stark, contemplative contrast.',
      artistBio: 'Marcus Vane (b. 1969, Manchester) creates architectural monuments and bronze studies focused on tectonic structural rhythm.',
      edition: 'Edition 1 of 3 (Sold)',
      featured: false,
    },
  ],
  journal: [
    {
      id: 'post-quiet-resilience',
      title: 'The Quiet Resilience of Texture: A Morning in the Studio',
      slug: 'the-quiet-resilience-of-texture',
      category: 'Studio Visits',
      author: 'Soren Blake',
      date: 'October 14, 2026',
      readTime: '5 min read',
      excerpt: 'How natural pigments, unprimed linen, and slow artisanal practices reshape our relationship with modern domestic interiors.',
      coverImage: '/src/assets/images/journal_studio_visit_1792565486137.jpg',
      published: true,
      content: `There is an unmistakable stillness that greets anyone who steps into the Art Circle atelier before mid-morning. Outside, the city hums with its relentless cadence, but here on the high floors of the studio, the light enters softly through high north-facing windows.

Elena Vance stands beside a six-foot canvas stretched with unbleached Belgian linen. Her hands bear faint traces of raw umber and marble dust. "We have grown accustomed to screens that offer instantaneous brightness," she observes, gesturing toward a fresh stratification of warm lime wash. "Texture, however, does not demand immediate attention. It reveals itself only when you are willing to slow down."

In contemporary interior architecture, walls are frequently treated as empty voids to be quickly filled. Yet the artists represented by Art Circle view the canvas not as a decorative finish, but as a sensory surface that alters how a room feels and sounds. Unvarnished linen absorbs ambient reverberation; coarse pumice and egg tempera catch raking evening sunlight differently than midday beams.

Collecting art with this awareness transforms the home into a sanctuary of sustained contemplation. A piece is not chosen to match a sofa or follow a transient auction trend—it is welcomed as an enduring silent presence that deepens in meaning through the seasons.`
    },
    {
      id: 'post-living-object',
      title: 'The Living Object: Why Original Art Belongs in Contemplative Spaces',
      slug: 'the-living-object',
      category: 'On Collecting',
      author: 'Elena Vance',
      date: 'September 28, 2026',
      readTime: '7 min read',
      excerpt: 'An essay on collecting with intention, eschewing rapid trends for pieces that retain their resonance over decades.',
      coverImage: '/src/assets/images/hero_artwork_gallery_1792565466291.jpg',
      published: true,
      content: `What does it mean to live with art? For many first-time collectors, the process can feel intimidating, governed by gatekeeping jargon, commercial speculation, and fear of making the "wrong" choice.

At Art Circle, we advocate for a return to intimacy. When you encounter a piece of art that truly speaks to you, the reaction is rarely intellectual; it is felt in the chest. It is a sudden recognition of an emotion, a silence, or an unspoken truth that the artist has rendered visible.

Original artworks possess what Walter Benjamin famously termed an "aura"—the irreplaceable physical presence of an object made by human hands over time. The subtle imperfection of hand-coiled stoneware, the deckled edge of Japanese washi paper, or the brushstroke where an artist hesitated for a fraction of a second: these are records of living consciousness.

When you bring such a piece into your space, it changes the temperature of your daily life. It offers an anchor point in an increasingly ethereal, digital world.`
    },
    {
      id: 'post-form-and-void',
      title: 'Between Form and Void: Exploring Contemporary Sculptural Vessels',
      slug: 'between-form-and-void',
      category: 'Critical Essays',
      author: 'Clara Moreau',
      date: 'August 19, 2026',
      readTime: '6 min read',
      excerpt: 'A critical dialogue with sculptor Kaelen Chen on volcanic clay bodies, bronze patinas, and the weight of physical presence.',
      coverImage: '/src/assets/images/artwork_monolith_study_1792565468143.jpg',
      published: true,
      content: `Sculpture possesses an undeniable physicality: it occupies space in the room alongside us. Unlike two-dimensional works that ask the viewer to gaze into an illusionary plane, a sculptural vessel insists on being walked around, shadowed, and experienced from multiple angles.

In his studio, Kaelen Chen works with high-fire stoneware and molten bronze. His recent monolith studies, such as the pieces currently showcased at Art Circle, exhibit an intriguing duality. From one angle, the form appears as an unyielding ancient geological block; from another, an intentional negative aperture pierces through the core.

"A vessel is defined not by its walls, but by the emptiness it encloses," Chen explains. "The clay simply honors that emptiness."

In our current exhibition, Chen's vessels are paired with raw travertine pedestals, allowing collectors to observe how changes in natural room illumination alter the interplay of highlighted bronze lips and deep cast shadows throughout the day.`
    }
  ],
  founder: {
    name: 'Elena Vance',
    role: 'Founder & Principal Curator',
    portrait: '/src/assets/images/founder_portrait_editorial_1792565468351.jpg',
    philosophyStatement: 'Art is not mere ornamentation for empty walls; it is a resonant conversation between maker and beholder that deepens with time.',
    originStory: 'Art Circle began in 2019 as a private studio sanctuary, founded out of a desire to step away from the commercial spectacle of mega-fairs and restore intimacy to the experience of viewing art. Elena Vance, after over a decade curating institutional exhibitions across Europe, envisioned a space where collectors could encounter artworks quietly—free from haste, artificial prestige, and sterile corporate white cubes.',
    missionStatement: 'To curate, celebrate, and preserve authentic contemporary artworks that honor slow materiality, architectural harmony, and the human narrative behind every stroke.',
    curatorialApproach: 'We champion a tightly edited roster of international artists working across painting, photography, sculpture, and original printmaking. Every piece in our collection is selected not for decorative convenience, but for structural integrity, tactile depth, and poetic longevity.',
    location: '42 Pavilion Mews, Mayfair, London',
    foundedYear: 2019,
  },
  inquiries: [
    {
      id: 'inq-101',
      artworkId: 'art-monolith-study',
      artworkTitle: 'Monolith Study in Basalt',
      type: 'reservation',
      name: 'Julianna von Berg',
      email: 'j.vonberg@munich-collectors.de',
      phone: '+49 89 2180 3400',
      subject: 'Inquiry regarding Monolith Study reservation',
      message: 'Good afternoon. I saw this extraordinary sculpture in your collection. I would love to confirm shipping details to Munich and schedule a private viewing if possible.',
      createdAt: '2026-10-18T10:15:00Z',
      status: 'in_progress'
    },
    {
      id: 'inq-102',
      artworkId: 'art-silent-contour',
      artworkTitle: 'Silent Contour No. 4',
      type: 'artwork_purchase',
      name: 'Arthur Pendelton',
      email: 'a.pendelton@arch-design.co.uk',
      subject: 'Acquisition inquiry for residential project in Cotswolds',
      message: 'Hello Art Circle team. We are designing a stone pavilion residence and believe Silent Contour No. 4 would be the ideal centerpiece for the gallery hall.',
      createdAt: '2026-10-19T14:40:00Z',
      status: 'new'
    }
  ],
  subscribers: [
    {
      id: 'sub-1',
      email: 'collector@berlin-modern.com',
      subscribedAt: '2026-10-15T09:30:00Z'
    }
  ],
  adminSessionTokens: ['artcircle_admin_token_default_session']
};

class Store {
  private data: StudioData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): StudioData {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const content = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(content);
      }
    } catch (err) {
      console.error('Error reading store data file, using defaults:', err);
    }
    this.saveData(INITIAL_DATA);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  private saveData(data: StudioData): void {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save store data:', err);
    }
  }

  public getArtworks(): Artwork[] {
    return this.data.artworks;
  }

  public getArtworkById(id: string): Artwork | undefined {
    return this.data.artworks.find(a => a.id === id);
  }

  public addArtwork(artwork: Omit<Artwork, 'id'>): Artwork {
    const id = 'art-' + Date.now();
    const newArtwork: Artwork = { ...artwork, id };
    this.data.artworks.unshift(newArtwork);
    this.saveData(this.data);
    return newArtwork;
  }

  public updateArtwork(id: string, updates: Partial<Artwork>): Artwork | null {
    const index = this.data.artworks.findIndex(a => a.id === id);
    if (index === -1) return null;
    this.data.artworks[index] = { ...this.data.artworks[index], ...updates };
    this.saveData(this.data);
    return this.data.artworks[index];
  }

  public deleteArtwork(id: string): boolean {
    const initialLength = this.data.artworks.length;
    this.data.artworks = this.data.artworks.filter(a => a.id !== id);
    if (this.data.artworks.length !== initialLength) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  public reserveArtwork(id: string, reserverName: string): { success: boolean; artwork?: Artwork; error?: string } {
    const artwork = this.getArtworkById(id);
    if (!artwork) return { success: false, error: 'Artwork not found' };
    if (artwork.status === 'sold') {
      return { success: false, error: 'This artwork has already been sold and cannot be reserved.' };
    }
    if (artwork.status === 'reserved') {
      return { success: false, error: 'This artwork is currently reserved by another collector.' };
    }

    artwork.status = 'reserved';
    artwork.reservedAt = new Date().toISOString();
    artwork.reservedBy = reserverName;
    this.saveData(this.data);
    return { success: true, artwork };
  }

  public updateArtworkStatus(id: string, status: 'available' | 'reserved' | 'sold'): Artwork | null {
    const artwork = this.getArtworkById(id);
    if (!artwork) return null;
    artwork.status = status;
    if (status === 'sold') {
      artwork.soldAt = new Date().toISOString();
      delete artwork.reservedAt;
      delete artwork.reservedBy;
    } else if (status === 'available') {
      delete artwork.reservedAt;
      delete artwork.reservedBy;
      delete artwork.soldAt;
    } else if (status === 'reserved') {
      artwork.reservedAt = artwork.reservedAt || new Date().toISOString();
    }
    this.saveData(this.data);
    return artwork;
  }

  public getJournal(): JournalPost[] {
    return this.data.journal;
  }

  public getJournalById(id: string): JournalPost | undefined {
    return this.data.journal.find(j => j.id === id || j.slug === id);
  }

  public addJournalPost(post: Omit<JournalPost, 'id'>): JournalPost {
    const id = 'post-' + Date.now();
    const newPost: JournalPost = { ...post, id };
    this.data.journal.unshift(newPost);
    this.saveData(this.data);
    return newPost;
  }

  public updateJournalPost(id: string, updates: Partial<JournalPost>): JournalPost | null {
    const index = this.data.journal.findIndex(j => j.id === id);
    if (index === -1) return null;
    this.data.journal[index] = { ...this.data.journal[index], ...updates };
    this.saveData(this.data);
    return this.data.journal[index];
  }

  public deleteJournalPost(id: string): boolean {
    const len = this.data.journal.length;
    this.data.journal = this.data.journal.filter(j => j.id !== id);
    if (this.data.journal.length !== len) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  public getFounder(): FounderInfo {
    return this.data.founder;
  }

  public updateFounder(updates: Partial<FounderInfo>): FounderInfo {
    this.data.founder = { ...this.data.founder, ...updates };
    this.saveData(this.data);
    return this.data.founder;
  }

  public getInquiries(): Inquiry[] {
    return this.data.inquiries;
  }

  public addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
    const id = 'inq-' + Date.now();
    const newInquiry: Inquiry = {
      ...inquiry,
      id,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    this.data.inquiries.unshift(newInquiry);
    this.saveData(this.data);
    return newInquiry;
  }

  public updateInquiryStatus(id: string, status: Inquiry['status']): Inquiry | null {
    const inq = this.data.inquiries.find(i => i.id === id);
    if (!inq) return null;
    inq.status = status;
    this.saveData(this.data);
    return inq;
  }

  public addSubscriber(email: string): boolean {
    const exists = this.data.subscribers.some(s => s.email.toLowerCase() === email.toLowerCase());
    if (exists) return true;
    this.data.subscribers.unshift({
      id: 'sub-' + Date.now(),
      email,
      subscribedAt: new Date().toISOString(),
    });
    this.saveData(this.data);
    return true;
  }

  public getSubscribers(): NewsletterSubscriber[] {
    return this.data.subscribers;
  }

  public createAdminSession(): string {
    const token = 'act_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    this.data.adminSessionTokens.push(token);
    this.saveData(this.data);
    return token;
  }

  public validateAdminSession(token: string | undefined): boolean {
    if (!token) return false;
    return this.data.adminSessionTokens.includes(token);
  }

  public invalidateAdminSession(token: string): void {
    this.data.adminSessionTokens = this.data.adminSessionTokens.filter(t => t !== token);
    this.saveData(this.data);
  }
}

export const store = new Store();
