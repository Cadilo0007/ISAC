import React, { useState } from 'react';
import { X, Mail, Phone, Copy, Check, ExternalLink, MessageSquare } from 'lucide-react';
import { Artwork } from '../types.ts';

interface InquiryModalProps {
  artwork?: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  artwork,
  isOpen,
  onClose,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const STUDIO_EMAIL = 'artcircle.studio@gmail.com';
  const STUDIO_PHONE = '+44 20 7946 0992';
  const STUDIO_PHONE_DIGITS = '+442079460992';

  if (!isOpen) return null;

  const subject = artwork
    ? `Inquiry: ${artwork.title} by ${artwork.artist}`
    : 'Inquiry regarding Art Circle Collection';

  const body = artwork
    ? `Hello Art Circle Studio,\n\nI am interested in inquiring about "${artwork.title}" by ${artwork.artist} ($${artwork.price.toLocaleString()} USD).\n\nPlease let me know further details regarding availability, viewing, or acquisition.\n\nThank you,\n`
    : 'Hello Art Circle Studio,\n\nI would like to inquire about your collection and studio appointments.\n\nThank you,\n';

  // Mailto link
  const mailtoUrl = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Web Gmail direct compose link
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${STUDIO_EMAIL}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // WhatsApp quick link
  const whatsappUrl = `https://wa.me/${STUDIO_PHONE_DIGITS.replace('+', '')}?text=${encodeURIComponent(
    `Hello Art Circle Studio, I would like to inquire about ${artwork ? `"${artwork.title}" by ${artwork.artist}` : 'your curated collection'}.`
  )}`;

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(STUDIO_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleCopyPhone = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(STUDIO_PHONE);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] border border-[#D5CDC2] w-full max-w-lg rounded-none shadow-2xl relative text-[#1A1A1A] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#666057] hover:text-[#111111] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-8 sm:p-10 space-y-6">
          {/* Header */}
          <div className="border-b border-[#E8E2D8] pb-5">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#7A756D] font-sans">
              Direct Contact & Acquisitions
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#111111] tracking-tight mt-1">
              Contact Art Circle
            </h3>
            <p className="text-xs text-[#554F47] font-sans mt-1.5 leading-relaxed font-light">
              Connect directly with our curatorial team via Gmail or phone for inquiries, acquisition requests, or studio viewings.
            </p>

            {artwork && (
              <div className="mt-4 flex items-center gap-4 bg-[#F2EDE6] p-3 border border-[#E2DBD0]">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-14 h-14 object-cover shrink-0 border border-[#D5CDC2]"
                />
                <div className="min-w-0 flex-1 text-xs font-sans">
                  <p className="font-serif text-sm font-medium text-[#111111] truncate">{artwork.title}</p>
                  <p className="text-[#666057] truncate">{artwork.artist} ({artwork.year})</p>
                  <p className="text-[#111111] font-semibold mt-0.5">
                    ${artwork.price.toLocaleString()} USD · <span className="uppercase tracking-wider text-[10px] text-[#7A756D]">{artwork.status}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Methods */}
          <div className="space-y-4">
            {/* 1. Gmail / Email Card */}
            <div className="bg-white border border-[#D5CDC2] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#FAF8F5] border border-[#E2DBD0] flex items-center justify-center text-[#111111]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A756D] font-sans block">
                      Direct Gmail / Email
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-medium text-[#111111]">
                      {STUDIO_EMAIL}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 text-[11px] font-sans text-[#554F47] hover:text-[#111111] border border-[#D5CDC2] hover:border-[#111111] transition-colors inline-flex items-center gap-1 cursor-pointer"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check size={12} className="text-emerald-700" /> : <Copy size={12} />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
                <a
                  href={gmailWebUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#111111] text-[#FAF8F5] text-xs uppercase tracking-wider text-center border border-[#111111] hover:bg-transparent hover:text-[#111111] transition-all cursor-pointer rounded-none inline-flex items-center justify-center gap-1.5"
                >
                  <span>Open in Gmail</span>
                  <ExternalLink size={12} />
                </a>

                <a
                  href={mailtoUrl}
                  className="w-full py-2.5 bg-white text-[#111111] text-xs uppercase tracking-wider text-center border border-[#D5CDC2] hover:border-[#111111] transition-all cursor-pointer rounded-none inline-flex items-center justify-center gap-1.5"
                >
                  <span>Default Mail App</span>
                </a>
              </div>
            </div>

            {/* 2. Direct Telephone / Call Card */}
            <div className="bg-white border border-[#D5CDC2] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#FAF8F5] border border-[#E2DBD0] flex items-center justify-center text-[#111111]">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A756D] font-sans block">
                      Direct Atelier Telephone
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-medium text-[#111111]">
                      {STUDIO_PHONE}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="px-2.5 py-1 text-[11px] font-sans text-[#554F47] hover:text-[#111111] border border-[#D5CDC2] hover:border-[#111111] transition-colors inline-flex items-center gap-1 cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check size={12} className="text-emerald-700" /> : <Copy size={12} />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
                <a
                  href={`tel:${STUDIO_PHONE_DIGITS}`}
                  className="w-full py-2.5 bg-[#111111] text-[#FAF8F5] text-xs uppercase tracking-wider text-center border border-[#111111] hover:bg-transparent hover:text-[#111111] transition-all cursor-pointer rounded-none inline-flex items-center justify-center gap-1.5"
                >
                  <Phone size={12} />
                  <span>Call Atelier</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-white text-[#111111] text-xs uppercase tracking-wider text-center border border-[#D5CDC2] hover:border-[#111111] transition-all cursor-pointer rounded-none inline-flex items-center justify-center gap-1.5"
                >
                  <MessageSquare size={12} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-2 text-center text-[11px] text-[#7A756D] font-sans">
            Mayfair Studio: 42 Pavilion Mews, London · Tue–Sat 11:00–18:00
          </div>
        </div>
      </div>
    </div>
  );
};
