/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { InquiryModal } from './components/InquiryModal.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { CollectionPage } from './pages/CollectionPage.tsx';
import { ArtworkDetailPage } from './pages/ArtworkDetailPage.tsx';
import { ArtistsPage } from './pages/ArtistsPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { JournalPage } from './pages/JournalPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';

// Clean data sources for manual editing (mano-mano)
import { ARTWORKS_DATA } from './data/artworks.ts';
import { ARTISTS_DATA } from './data/artists.ts';
import { JOURNAL_DATA } from './data/journal.ts';
import { FOUNDER_DATA } from './data/founder.ts';
import { Artwork, Artist } from './types.ts';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedArtworkId, setSelectedArtworkId] = useState<string | null>(null);
  const [selectedJournalId, setSelectedJournalId] = useState<string | null>(null);
  const [selectedArtistSlug, setSelectedArtistSlug] = useState<string | null>(null);

  // Gallery Data directly from easy-to-edit data files
  const [artworks] = useState<Artwork[]>(ARTWORKS_DATA);
  const [artists] = useState<Artist[]>(ARTISTS_DATA);
  const [journalPosts] = useState(JOURNAL_DATA);
  const [founder] = useState(FOUNDER_DATA);

  // Contact modal state
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryArtwork, setInquiryArtwork] = useState<Artwork | null>(null);

  // Synchronize hash routing (#/collection, #/artists, #/artist/slug, #/artwork/id, #/about, etc.)
  const parseHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) {
      setCurrentTab('home');
      setSelectedArtworkId(null);
      setSelectedJournalId(null);
      setSelectedArtistSlug(null);
      return;
    }
    const [route, param] = hash.split('/');
    if (route === 'artwork' && param) {
      setCurrentTab('artwork');
      setSelectedArtworkId(param);
    } else if (route === 'artist' && param) {
      setCurrentTab('artists');
      setSelectedArtistSlug(param);
    } else if (route === 'artists') {
      setCurrentTab('artists');
      setSelectedArtistSlug(null);
    } else if (route === 'journal' && param) {
      setCurrentTab('journal');
      setSelectedJournalId(param);
    } else if (['collection', 'about', 'journal', 'contact', 'artists'].includes(route)) {
      setCurrentTab(route);
      if (route !== 'journal') setSelectedJournalId(null);
      if (route !== 'artists') setSelectedArtistSlug(null);
    } else {
      setCurrentTab('home');
    }
  }, []);

  const navigateTo = (tab: string, param?: string) => {
    if (tab === 'artwork' && param) {
      window.location.hash = `#/artwork/${param}`;
      setSelectedArtworkId(param);
      setCurrentTab('artwork');
    } else if (tab === 'artist' && param) {
      window.location.hash = `#/artist/${param}`;
      setSelectedArtistSlug(param);
      setCurrentTab('artists');
    } else if (tab === 'artists') {
      window.location.hash = '#/artists';
      setSelectedArtistSlug(null);
      setCurrentTab('artists');
    } else if (tab === 'journal' && param) {
      window.location.hash = `#/journal/${param}`;
      setSelectedJournalId(param);
      setCurrentTab('journal');
    } else if (tab === 'home') {
      window.location.hash = '#/';
      setCurrentTab('home');
      setSelectedArtworkId(null);
      setSelectedJournalId(null);
      setSelectedArtistSlug(null);
    } else {
      window.location.hash = `#/${tab}`;
      setCurrentTab(tab);
      if (tab !== 'journal') setSelectedJournalId(null);
      if (tab !== 'artwork') setSelectedArtworkId(null);
      if (tab !== 'artists') setSelectedArtistSlug(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, [parseHash]);

  const handleOpenGeneralInquiry = (artwork?: Artwork) => {
    setInquiryArtwork(artwork || null);
    setInquiryModalOpen(true);
  };

  const selectedArtwork = artworks.find((a) => a.id === selectedArtworkId);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#E5DFD5]">
      {/* Top 3-Zone Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onNavigate={navigateTo}
        onOpenInquiry={() => handleOpenGeneralInquiry()}
      />

      {/* Main Content Stage */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            artworks={artworks}
            artists={artists}
            journalPosts={journalPosts}
            founder={founder}
            onSelectArtwork={(id) => navigateTo('artwork', id)}
            onSelectArticle={(id) => navigateTo('journal', id)}
            onSelectArtist={(slug) => navigateTo('artist', slug)}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'collection' && (
          <CollectionPage
            artworks={artworks}
            onSelectArtwork={(id) => navigateTo('artwork', id)}
            onOpenInquiry={() => handleOpenGeneralInquiry()}
          />
        )}

        {currentTab === 'artists' && (
          <ArtistsPage
            artists={artists}
            artworks={artworks}
            selectedArtistSlug={selectedArtistSlug}
            onSelectArtist={(slug) => (slug ? navigateTo('artist', slug) : navigateTo('artists'))}
            onSelectArtwork={(id) => navigateTo('artwork', id)}
            onOpenInquiry={(art) => handleOpenGeneralInquiry(art)}
          />
        )}

        {currentTab === 'artwork' && selectedArtwork && (
          <ArtworkDetailPage
            artwork={selectedArtwork}
            allArtworks={artworks}
            onBack={() => navigateTo('collection')}
            onSelectArtwork={(id) => navigateTo('artwork', id)}
            onSelectArtist={(slug) => navigateTo('artist', slug)}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            founder={founder}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'journal' && (
          <JournalPage
            posts={journalPosts}
            selectedPostId={selectedJournalId}
            onSelectPost={(id) => (id ? navigateTo('journal', id) : navigateTo('journal'))}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'contact' && <ContactPage />}
      </main>

      {/* Direct Contact Modal (Gmail & Phone) */}
      <InquiryModal
        artwork={inquiryArtwork}
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />

      {/* Minimal Editorial Footer with Letters from Art Circle */}
      <Footer
        onNavigate={navigateTo}
        onOpenInquiry={() => handleOpenGeneralInquiry()}
      />
    </div>
  );
}
