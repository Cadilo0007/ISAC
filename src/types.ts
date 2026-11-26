export type ArtworkCategory = 'Paintings' | 'Photography' | 'Sculptures' | 'Prints';
export type ArtworkStatus = 'available' | 'reserved' | 'sold';

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistSlug?: string;
  year: number;
  medium: string;
  dimensions: string;
  price: number;
  currency: string;
  category: ArtworkCategory;
  status: ArtworkStatus;
  image: string;
  description: string;
  artistBio: string;
  edition?: string;
  featured: boolean;
  reservedAt?: string;
  reservedBy?: string;
  soldAt?: string;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  role: string;
  discipline: 'Painting' | 'Photography' | 'Sculpture' | 'Printmaking';
  location: string;
  portrait: string;
  bio: string;
  statement: string;
  exhibitions: string[];
  techniques: string[];
  featured: boolean;
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
  type: string;
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
