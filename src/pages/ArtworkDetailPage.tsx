import React, { useState } from 'react';
import { ArrowLeft, Eye, Maximize2, Mail, Phone, ExternalLink, ShieldCheck, Truck } from 'lucide-react';
import { Artwork } from '../types.ts';
import { StatusIndicator } from '../components/StatusIndicator.tsx';
import { RoomViewModal } from '../components/RoomViewModal.tsx';
import { InquiryModal } from '../components/InquiryModal.tsx';

interface ArtworkDetailPageProps {
  artwork: Artwork;
  allArtworks: Artwork[];
  onBack: () => void;
  onSelectArtwork: (id: string) => void;
  onSelectArtist?: (slug: string) => void;
}

export const ArtworkDetailPage: React.FC<ArtworkDetailPageProps> = ({
  artwork,
  allArtworks,
  onBack,
  onSelectArtwork,
  onSelectArtist,
}) => {
  const [isRoomViewOpen, setIsRoomViewOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const relatedArtworks = allArtworks
    .filter((a) => a.id !== artwork.id && (a.category === artwork.category || a.artist === artwork.artist))
    .slice(0, 3);

  const isAvailable = artwork.status === 'available';
  const isReserved = artwork.status === 'reserved';
  const isSold = artwork.status === 'sold';

  const STUDIO_EMAIL = 'artcircle.studio@gmail.com';
  const STUDIO_PHONE = '+44 20 7946 0992';
  const STUDIO_PHONE_DIGITS = '+442079460992';

  const subject = `Inquiry: ${artwork.title} by ${artwork.artist}`;
  const body = `Hello Art Circle Studio,\n\nI am inquiring about "${artwork.title}" by ${artwork.artist} ($${artwork.price.toLocaleString()} USD).\n\nPlease let me know further acquisition or viewing details.\n\nThank you,\n`;
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${STUDIO_EMAIL}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailtoUrl = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* Back button */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans text-[#7A756D] hover:text-[#111111] transition-colors cursor-pointer py-1"
        >
          <ArrowLeft size={14} />
          <span>Back to Collection</span>
        </button>
      </div>

      {/* Main Artwork Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Large Artwork Photography (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative bg-[#F2EDE6] border border-[#E8E2D8] p-4 sm:p-8 flex items-center justify-center">
            <img
              src={artwork.image}
              alt={artwork.title}
              onClick={() => setIsZoomed(!isZoomed)}
              className={`w-full max-h-[640px] object-contain shadow-lg cursor-zoom-in transition-transform duration-300 ${
                isZoomed ? 'scale-110' : ''
              }`}
              referrerPolicy="no-referrer"
            />

            {/* Quick Actions overlay */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setIsRoomViewOpen(true)}
                className="px-3 py-2 bg-[#FAF8F5]/95 hover:bg-white text-[#111111] border border-[#D5CDC2] text-xs font-sans tracking-wider uppercase inline-flex items-center gap-1.5 shadow-sm transition-colors rounded-none cursor-pointer"
              >
                <Eye size={14} />
                <span>View in Room</span>
              </button>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 bg-[#FAF8F5]/95 hover:bg-white text-[#111111] border border-[#D5CDC2] text-xs shadow-sm transition-colors rounded-none cursor-pointer"
                title="Toggle zoom"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>

          {/* Framing & Lighting Notes */}
          <div className="p-4 bg-[#F7F4EE] border border-[#E5DFD5] text-[11px] font-sans text-[#7A756D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span>Natural gallery illumination · Custom framing counsel available</span>
            <span>Studio Catalog: #{artwork.id.toUpperCase()}</span>
          </div>
        </div>

        {/* Right: Artwork Metadata & Inquiries (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Header & Status */}
          <div className="border-b border-[#E8E2D8] pb-6 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
                {artwork.category}
              </span>
              <StatusIndicator status={artwork.status} className="text-sm" />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] tracking-tight leading-tight">
              {artwork.title}
            </h1>

            {onSelectArtist && artwork.artistSlug ? (
              <button
                onClick={() => onSelectArtist(artwork.artistSlug!)}
                className="font-sans text-base text-[#443E37] hover:text-[#111111] hover:underline underline-offset-4 cursor-pointer text-left block"
              >
                {artwork.artist} <span className="text-xs text-[#7A756D] ml-1">· View Portfolio ↗</span>
              </button>
            ) : (
              <p className="font-sans text-base text-[#443E37]">
                {artwork.artist}
              </p>
            )}

            <div className="pt-2">
              <span className="font-sans text-2xl font-medium text-[#111111]">
                ${artwork.price.toLocaleString()}{' '}
                <span className="text-xs font-normal text-[#7A756D]">USD</span>
              </span>
            </div>
          </div>

          {/* Direct Gmail & Phone Contact Area */}
          <div className="space-y-4">
            {isAvailable && (
              <div className="space-y-3">
                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="w-full py-4 bg-[#111111] text-[#FAF8F5] border border-[#111111] text-xs uppercase tracking-[0.22em] font-sans hover:bg-transparent hover:text-[#111111] transition-all cursor-pointer rounded-none font-medium inline-flex items-center justify-center gap-2"
                >
                  <Mail size={15} />
                  <span>Inquire via Gmail / Phone</span>
                </button>

                {/* Direct quick action bar */}
                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  <a
                    href={gmailWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 border border-[#D5CDC2] text-[#111111] text-center hover:border-[#111111] transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Direct Gmail</span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href={`tel:${STUDIO_PHONE_DIGITS}`}
                    className="py-2.5 px-3 border border-[#D5CDC2] text-[#111111] text-center hover:border-[#111111] transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <Phone size={12} />
                    <span>Call Studio</span>
                  </a>
                </div>

                <div className="p-3 bg-[#F7F4EE] border border-[#E5DFD5] text-[11px] font-sans text-[#666057] space-y-0.5">
                  <p><span className="text-[#111111] font-medium">Email:</span> {STUDIO_EMAIL}</p>
                  <p><span className="text-[#111111] font-medium">Telephone:</span> {STUDIO_PHONE}</p>
                </div>
              </div>
            )}

            {isReserved && (
              <div className="p-5 bg-[#F8F4EE] border border-[#DDD5C7] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C93B2B]" />
                  <span className="font-serif text-lg text-[#111111] font-medium">
                    Artwork Currently Reserved
                  </span>
                </div>
                <p className="text-xs text-[#5C564E] font-sans leading-relaxed">
                  A collector has placed a hold on this piece. Contact our curators directly to be notified if the piece returns to available status.
                </p>
                <div className="pt-1 flex flex-col sm:flex-row gap-2">
                  <a
                    href={gmailWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-[#111111] text-[#FAF8F5] text-xs uppercase tracking-wider text-center rounded-none inline-flex items-center justify-center gap-1.5"
                  >
                    <Mail size={12} />
                    <span>Inquire via Gmail</span>
                  </a>
                  <a
                    href={`tel:${STUDIO_PHONE_DIGITS}`}
                    className="flex-1 py-2.5 border border-[#111111] text-[#111111] text-xs uppercase tracking-wider text-center rounded-none inline-flex items-center justify-center gap-1.5"
                  >
                    <Phone size={12} />
                    <span>Call Studio</span>
                  </a>
                </div>
              </div>
            )}

            {isSold && (
              <div className="p-6 bg-[#F4EFEA] border border-[#E5DFD5] space-y-4 text-center">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C93B2B]" />
                  <span className="text-xs uppercase tracking-[0.2em] text-[#7A756D] font-sans">
                    Archived Artwork
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-light text-[#111111]">
                  This artwork has found its home.
                </h3>
                <p className="text-xs text-[#5C564E] font-sans leading-relaxed max-w-sm mx-auto">
                  While this specific piece is sold and no longer available, it remains in our permanent studio archive. You may contact Elena Vance regarding similar works by {artwork.artist}.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <a
                    href={gmailWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#111111] text-[#FAF8F5] text-xs uppercase tracking-wider font-sans rounded-none inline-flex items-center justify-center gap-1.5"
                  >
                    <Mail size={13} />
                    <span>Email Studio</span>
                  </a>
                  <a
                    href={`tel:${STUDIO_PHONE_DIGITS}`}
                    className="px-5 py-2.5 border border-[#111111] text-[#111111] text-xs uppercase tracking-wider font-sans rounded-none inline-flex items-center justify-center gap-1.5"
                  >
                    <Phone size={13} />
                    <span>Call {STUDIO_PHONE}</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Specifications List */}
          <div className="border-t border-[#E8E2D8] pt-6 space-y-3 text-xs font-sans">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#111111]">
              Artwork Specifications
            </h4>
            <dl className="space-y-2.5 text-[#554F47]">
              <div className="flex justify-between py-1 border-b border-[#F0ECE4]">
                <dt className="text-[#8C8478]">Year</dt>
                <dd className="font-medium text-[#111111]">{artwork.year}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0ECE4]">
                <dt className="text-[#8C8478]">Medium</dt>
                <dd className="font-medium text-[#111111] text-right max-w-[260px]">{artwork.medium}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0ECE4]">
                <dt className="text-[#8C8478]">Dimensions</dt>
                <dd className="font-medium text-[#111111]">{artwork.dimensions}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0ECE4]">
                <dt className="text-[#8C8478]">Edition / Authenticity</dt>
                <dd className="font-medium text-[#111111]">{artwork.edition || 'Unique original work'}</dd>
              </div>
            </dl>
          </div>

          {/* Curatorial Description */}
          <div className="border-t border-[#E8E2D8] pt-6 space-y-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#111111] font-sans">
              About The Piece
            </h4>
            <p className="text-sm font-sans text-[#4A453E] leading-relaxed font-light">
              {artwork.description}
            </p>
          </div>

          {/* Artist Biography */}
          <div className="border-t border-[#E8E2D8] pt-6 space-y-3 bg-[#F7F4EE] p-5 border border-[#E5DFD5]">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#111111] font-sans">
              About The Artist · {artwork.artist}
            </h4>
            <p className="text-xs font-sans text-[#554F47] leading-relaxed font-light">
              {artwork.artistBio}
            </p>
            {onSelectArtist && artwork.artistSlug && (
              <div className="pt-2">
                <button
                  onClick={() => onSelectArtist(artwork.artistSlug!)}
                  className="text-xs uppercase tracking-wider text-[#111111] font-medium underline underline-offset-4 hover:text-[#554F47] transition-colors cursor-pointer"
                >
                  Explore {artwork.artist}’s Full Portfolio & Story ↗
                </button>
              </div>
            )}
          </div>

          {/* Trust points */}
          <div className="pt-2 grid grid-cols-2 gap-4 text-[11px] text-[#7A756D] font-sans">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#111111] shrink-0" />
              <span>Signed Certificate of Authenticity</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-[#111111] shrink-0" />
              <span>Bespoke Art Crate & Global Transit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Artworks Section */}
      {relatedArtworks.length > 0 && (
        <section className="mt-28 pt-16 border-t border-[#E8E2D8]">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
                Curatorial Parallels
              </p>
              <h3 className="font-serif text-3xl font-light text-[#111111] tracking-tight mt-1">
                Related Artworks
              </h3>
            </div>
            <button
              onClick={onBack}
              className="text-xs uppercase tracking-widest text-[#111111] font-sans hover:text-[#554F47] transition-colors"
            >
              View Full Collection
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArtworks.map((rel) => (
              <article
                key={rel.id}
                onClick={() => {
                  onSelectArtwork(rel.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer space-y-3"
              >
                <div className="overflow-hidden bg-[#F2EDE6] border border-[#E8E2D8] aspect-[4/3] p-3 flex items-center justify-center relative">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-[#FAF8F5]/90 px-2 py-0.5 border border-[#E8E2D8]">
                    <StatusIndicator status={rel.status} />
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-[#111111] group-hover:underline underline-offset-4 decoration-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#554F47] font-sans">
                    {rel.artist} · ${rel.price.toLocaleString()}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Modals */}
      <RoomViewModal
        artwork={artwork}
        isOpen={isRoomViewOpen}
        onClose={() => setIsRoomViewOpen(false)}
      />

      <InquiryModal
        artwork={artwork}
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
};
