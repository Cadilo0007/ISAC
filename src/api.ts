import { Artwork, JournalPost, FounderInfo, Inquiry, ArtworkStatus } from './types.ts';

const ADMIN_TOKEN_KEY = 'artcircle_admin_token';

export const authStorage = {
  getToken(): string | null {
    try {
      return localStorage.getItem(ADMIN_TOKEN_KEY);
    } catch {
      return null;
    }
  },
  setToken(token: string) {
    try {
      localStorage.setItem(ADMIN_TOKEN_KEY, token);
    } catch {
      // storage unavailable
    }
  },
  removeToken() {
    try {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
    } catch {
      // storage unavailable
    }
  }
};

const getHeaders = (includeAuth = false): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (includeAuth) {
    const token = authStorage.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const api = {
  // Artworks
  async getArtworks(): Promise<Artwork[]> {
    const res = await fetch('/api/artworks');
    if (!res.ok) throw new Error('Failed to fetch artworks');
    return res.json();
  },

  async getArtworkById(id: string): Promise<Artwork> {
    const res = await fetch(`/api/artworks/${id}`);
    if (!res.ok) throw new Error('Artwork not found');
    return res.json();
  },

  async createArtwork(artwork: Omit<Artwork, 'id'>): Promise<Artwork> {
    const res = await fetch('/api/artworks', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(artwork),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create artwork');
    }
    return res.json();
  },

  async updateArtwork(id: string, updates: Partial<Artwork>): Promise<Artwork> {
    const res = await fetch(`/api/artworks/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update artwork');
    }
    return res.json();
  },

  async updateArtworkStatus(id: string, status: ArtworkStatus): Promise<Artwork> {
    const res = await fetch(`/api/artworks/${id}/status`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update artwork status');
    }
    return res.json();
  },

  async deleteArtwork(id: string): Promise<void> {
    const res = await fetch(`/api/artworks/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    if (!res.ok) throw new Error('Failed to delete artwork');
  },

  async reserveArtwork(id: string, reservation: { name: string; email: string; phone?: string; message?: string }): Promise<{ success: boolean; message: string; artwork: Artwork }> {
    const res = await fetch(`/api/artworks/${id}/reserve`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(reservation),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Reservation failed');
    }
    return res.json();
  },

  // Journal
  async getJournal(): Promise<JournalPost[]> {
    const res = await fetch('/api/journal');
    if (!res.ok) throw new Error('Failed to fetch journal');
    return res.json();
  },

  async getJournalById(id: string): Promise<JournalPost> {
    const res = await fetch(`/api/journal/${id}`);
    if (!res.ok) throw new Error('Article not found');
    return res.json();
  },

  async createJournalPost(post: Omit<JournalPost, 'id'>): Promise<JournalPost> {
    const res = await fetch('/api/journal', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error('Failed to create journal article');
    return res.json();
  },

  async updateJournalPost(id: string, updates: Partial<JournalPost>): Promise<JournalPost> {
    const res = await fetch(`/api/journal/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update journal article');
    return res.json();
  },

  async deleteJournalPost(id: string): Promise<void> {
    const res = await fetch(`/api/journal/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    if (!res.ok) throw new Error('Failed to delete article');
  },

  // Founder Info
  async getFounder(): Promise<FounderInfo> {
    const res = await fetch('/api/founder');
    if (!res.ok) throw new Error('Failed to fetch founder information');
    return res.json();
  },

  async updateFounder(updates: Partial<FounderInfo>): Promise<FounderInfo> {
    const res = await fetch('/api/founder', {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update founder info');
    return res.json();
  },

  // Inquiries
  async submitInquiry(inquiry: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    artworkId?: string;
    artworkTitle?: string;
    type?: string;
  }): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(inquiry),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to submit inquiry');
    }
    return res.json();
  },

  async getInquiries(): Promise<Inquiry[]> {
    const res = await fetch('/api/inquiries', {
      headers: getHeaders(true),
    });
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    return res.json();
  },

  async updateInquiryStatus(id: string, status: Inquiry['status']): Promise<Inquiry> {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update inquiry status');
    return res.json();
  },

  // Newsletter
  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to subscribe');
    }
    return res.json();
  },

  // Admin Auth
  async adminLogin(password: string): Promise<{ success: boolean; token: string }> {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Authentication failed');
    }
    const data = await res.json();
    authStorage.setToken(data.token);
    return data;
  },

  async adminCheck(): Promise<boolean> {
    const token = authStorage.getToken();
    if (!token) return false;
    try {
      const res = await fetch('/api/admin/check', {
        headers: getHeaders(true),
      });
      if (!res.ok) return false;
      const data = await res.json();
      return !!data.authenticated;
    } catch {
      return false;
    }
  },

  async adminLogout(): Promise<void> {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: getHeaders(true),
      });
    } finally {
      authStorage.removeToken();
    }
  }
};
