import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Mail, Sparkles, Check } from 'lucide-react';
import { Artist, Artwork } from '../types.ts';
import { StatusIndicator } from '../components/StatusIndicator.tsx';

interface ArtistsPageProps {
  artists: Artist[];
  artworks: Artwork[];
  selectedArtistSlug?: string | null;
  onSelectArtist: (slug: string | null) => void;
  onSelectArtwork: (id: string) => void;
  onOpenInquiry: (artwork?: Artwork) => void;
}

export const ArtistsPage: React.FC<ArtistsPageProps> = ({
  artists,
  artworks,
  selectedArtistSlug,
  onSelectArtist,
  onSelectArtwork,
  onOpenInquiry,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Painting' | 'Photography' | 'Sculpture' | 'Printmaking'>('All');

  const selectedArtist = artists.find((a) => a.slug === selectedArtistSlug);

  const categories: Array<'All' | 'Painting' | 'Photography' | 'Sculpture' | 'Printmaking'> = [
    'All',
    'Painting',
    'Photography',
    'Sculpture',
    'Printmaking',
  ];

  const filteredArtists = activeFilter === 'All'
    ? artists
    : artists.filter((a) => a.discipline === activeFilter);

  // INDIVIDUAL ARTIST PORTFOLIO VIEW
  if (selectedArtist) {
    const artistArtworks = artworks.filter(
      (art) => art.artistSlug === selectedArtist.slug || art.artist.toLowerCase().includes(selectedArtist.name.toLowerCase())
    );

    return (
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
        {/* Back Link */}
        <div className="mb-10">
          <button
            onClick={() => onSelectArtist(null)}
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans text-[#7A756D] hover:text-[#111111] transition-colors cursor-pointer py-1"
          >
            <ArrowLeft size={14} />
            <span>Back to All Represented Artists</span>
          </button>
        </div>

        {/* Artist Hero Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start border-b border-[#E8E2D8] pb-16">
          {/* Portrait side (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F2EDE6] border border-[#E8E2D8] p-3">
              <img
                src={selectedArtist.portrait}
                alt={selectedArtist.name}
                className="w-full aspect-[3/4] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-[#F7F4EE] border border-[#E5DFD5] text-xs font-sans space-y-1">
              <p className="font-semibold text-[#111111]">{selectedArtist.name}</p>
              <p className="text-[#666057]">{selectedArtist.role}</p>
              <p className="text-[#8C8478] flex items-center gap-1.5 pt-1">
                <MapPin size={13} className="text-[#111111]" />
                <span>Atelier: {selectedArtist.location}</span>
              </p>
            </div>
          </div>

          {/* Bio & Artist Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans block mb-2">
                {selectedArtist.discipline} · Art Circle Collective
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#111111] tracking-tight leading-tight">
                {selectedArtist.name}
              </h1>
              <p className="text-sm font-sans text-[#666057] mt-1.5 font-light">
                {selectedArtist.role}
              </p>
            </div>

            {/* Quote / Statement */}
            <blockquote className="p-6 bg-[#F4EFEA] border-l-2 border-[#111111] font-serif text-xl sm:text-2xl text-[#111111] italic font-light leading-snug">
              “{selectedArtist.statement}”
            </blockquote>

            {/* Full Biography */}
            <div className="space-y-4 text-sm sm:text-base font-sans text-[#4A453E] leading-relaxed font-light">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#111111]">
                {selectedArtist.bio}
              </p>
              <p>
                As part of the Art Circle collective, {selectedArtist.name.split(' ')[0]} works in sustained dialogue with our studio space, creating works calibrated for intentional domestic and architectural settings.
              </p>
            </div>

            {/* Techniques & Materiality */}
            <div className="border-t border-[#E8E2D8] pt-6 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] font-sans">
                Materiality & Techniques
              </h3>
              <div className="flex flex-wrap gap-2 text-xs font-sans">
                {selectedArtist.techniques.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-[#F2EDE6] text-[#333333] border border-[#DDD5C7] rounded-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Exhibitions */}
            <div className="border-t border-[#E8E2D8] pt-6 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] font-sans">
                Selected Exhibitions & Provenance
              </h3>
              <ul className="space-y-2 text-xs font-sans text-[#554F47]">
                {selectedArtist.exhibitions.map((ex, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#111111] font-medium">·</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Studio Inquiry Button */}
            <div className="pt-2">
              <button
                onClick={() => onOpenInquiry()}
                className="px-8 py-3.5 bg-[#111111] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-sans border border-[#111111] hover:bg-transparent hover:text-[#111111] transition-all cursor-pointer rounded-none inline-flex items-center gap-2"
              >
                <Mail size={14} />
                <span>Inquire About {selectedArtist.name}’s Works</span>
              </button>
            </div>
          </div>
        </div>

        {/* Artist's Curated Works Section */}
        <section className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
                Studio Archive
              </p>
              <h2 className="font-serif text-3xl font-light text-[#111111] tracking-tight mt-1">
                Works by {selectedArtist.name} ({artistArtworks.length})
              </h2>
            </div>
            <span className="text-xs text-[#7A756D] font-sans">
              Click any piece to view details or contact via Gmail/Phone
            </span>
          </div>

          {artistArtworks.length === 0 ? (
            <div className="p-12 text-center border border-[#E8E2D8] bg-[#FAF8F5] text-xs text-[#7A756D]">
              New pieces currently in studio production. Please contact us for preview catalogue.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artistArtworks.map((art) => (
                <article
                  key={art.id}
                  onClick={() => onSelectArtwork(art.id)}
                  className="group cursor-pointer flex flex-col justify-between border-b border-[#EFEAE2] pb-6"
                >
                  <div className="space-y-4">
                    <div className="overflow-hidden bg-[#F2EDE6] border border-[#E8E2D8] aspect-[4/3] p-3 flex items-center justify-center relative">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 bg-[#FAF8F5]/90 px-2.5 py-1 border border-[#E8E2D8]">
                        <StatusIndicator status={art.status} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-xl font-normal text-[#111111] group-hover:underline underline-offset-4 decoration-1">
                          {art.title}
                        </h3>
                        <span className="font-sans text-xs font-semibold text-[#111111]">
                          ${art.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-[#554F47] font-sans">
                        {art.medium}
                      </p>
                      <p className="text-[11px] text-[#8C8478] font-sans">
                        {art.dimensions} · {art.year}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EFEAE2] flex items-center justify-between text-xs font-sans text-[#7A756D]">
                    <StatusIndicator status={art.status} />
                    <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#111111] group-hover:text-[#554F47]">
                      <span>Examine</span>
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  // ARTISTS DIRECTORY / COLLECTIVE INDEX VIEW
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="border-b border-[#E8E2D8] pb-10 mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
          The Artist Collective
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#111111] tracking-tight mt-2">
          Represented Artists
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#554F47] font-sans font-light max-w-2xl leading-relaxed">
          Art Circle is home to a select circle of multidisciplinary artists working alongside founder Elena Vance. Each brings distinct material rigor, poetic restraint, and singular vision.
        </p>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pt-6 border-t border-[#EFEAE2]">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-2 text-xs tracking-wider uppercase font-sans border rounded-none transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#111111] text-[#FAF8F5] border-[#111111]'
                    : 'bg-white text-[#554F47] border-[#D5CDC2] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                {cat === 'All' ? 'All Disciplines' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Artists Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredArtists.map((artist) => {
          const count = artworks.filter(
            (art) => art.artistSlug === artist.slug || art.artist.toLowerCase().includes(artist.name.toLowerCase())
          ).length;

          return (
            <article
              key={artist.id}
              onClick={() => {
                onSelectArtist(artist.slug);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer bg-[#FAF8F5] border border-[#E8E2D8] p-5 sm:p-6 flex flex-col justify-between hover:border-[#111111] transition-all"
            >
              <div className="space-y-4">
                {/* Artist Studio Portrait */}
                <div className="overflow-hidden bg-[#F2EDE6] border border-[#E8E2D8] aspect-[3/4] relative">
                  <img
                    src={artist.portrait}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase tracking-wider font-sans text-[#111111] border border-[#E8E2D8]">
                    {artist.discipline}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="font-serif text-2xl font-light text-[#111111] group-hover:underline underline-offset-4 decoration-1">
                      {artist.name}
                    </h2>
                    <span className="text-[11px] font-sans text-[#7A756D]">
                      {count} {count === 1 ? 'work' : 'works'}
                    </span>
                  </div>

                  <p className="text-xs text-[#554F47] font-sans">
                    {artist.role}
                  </p>

                  <p className="text-[11px] text-[#8C8478] font-sans flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{artist.location}</span>
                  </p>

                  <p className="text-xs text-[#554F47] font-sans line-clamp-3 leading-relaxed font-light pt-2">
                    {artist.bio}
                  </p>
                </div>
              </div>

              {/* Action link */}
              <div className="mt-6 pt-3 border-t border-[#EFEAE2] flex items-center justify-between text-xs font-sans text-[#111111]">
                <span className="text-[11px] uppercase tracking-wider font-medium inline-flex items-center gap-1 group-hover:text-[#554F47]">
                  <span>Explore Portfolio & Works</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
