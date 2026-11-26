import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { api } from '../api.ts';

interface FooterProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiry }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setFeedback('Please provide a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      const res = await api.subscribeNewsletter(email);
      setStatus('success');
      setFeedback(res.message || 'You have been subscribed to Letters from Art Circle.');
      setEmail('');
    } catch {
      setStatus('error');
      setFeedback('Unable to subscribe. Please try again.');
    }
  };

  return (
    <footer className="bg-[#F4EFEA] border-t border-[#E5DFD5] text-[#222222] transition-colors mt-24">
      {/* Newsletter Strip: Letters from Art Circle */}
      <div className="border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <h3 className="font-serif text-2xl lg:text-3xl font-light text-[#111111] tracking-tight">
              Letters from Art Circle
            </h3>
            <p className="mt-2 text-sm text-[#666057] font-sans leading-relaxed max-w-md font-light">
              Occasional dispatches on quiet studio life, artist dialogues, private collection previews, and aesthetic reflections.
            </p>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-[#FAF8F5] border border-[#D5CDC2] px-4 py-3.5 text-xs tracking-wider font-sans text-[#111111] placeholder-[#9E978C] focus:outline-none focus:border-[#111111] rounded-none transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-3.5 bg-[#111111] text-[#FAF8F5] text-xs tracking-[0.2em] uppercase font-sans border border-[#111111] hover:bg-transparent hover:text-[#111111] transition-all cursor-pointer rounded-none whitespace-nowrap shrink-0 disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : 'Subscribe'}
              </button>
            </form>
            {feedback && (
              <p
                className={`mt-2.5 text-xs font-sans ${
                  status === 'success' ? 'text-[#2D6A4F]' : 'text-[#C93B2B]'
                }`}
              >
                {feedback}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-xs font-sans">
        {/* Column 1: Identity */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/images/art_circle_logo_1792568444008.jpg"
              alt="Art Circle Logo"
              className="w-10 h-10 object-contain border border-[#E5DFD5] bg-white p-0.5 shrink-0"
            />
            <p className="font-serif text-xl tracking-[0.2em] font-medium text-[#111111] uppercase leading-none">
              Art Circle
            </p>
          </div>
          <p className="text-[#666057] leading-relaxed font-light">
            An independent contemporary art studio and curated collection dedicated to quiet craftsmanship, material authenticity, and enduring storytelling.
          </p>
          <p className="text-[11px] text-[#8C8478] tracking-wider uppercase">
            Est. 2019 · London Atelier
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="space-y-3">
          <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#111111]">
            Curated Space
          </p>
          <ul className="space-y-2.5 text-[#554F47]">
            <li>
              <button
                onClick={() => onNavigate('collection')}
                className="hover:text-[#111111] transition-colors cursor-pointer text-left"
              >
                The Art Collection
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('artists')}
                className="hover:text-[#111111] transition-colors cursor-pointer text-left"
              >
                Resident Artists
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#111111] transition-colors cursor-pointer text-left"
              >
                Philosophy & Founder
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('journal')}
                className="hover:text-[#111111] transition-colors cursor-pointer text-left"
              >
                The Journal
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-[#111111] transition-colors cursor-pointer text-left"
              >
                Contact & Studio Visits
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Direct Inquiries via Gmail & Phone */}
        <div className="space-y-3">
          <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#111111]">
            Direct Contact
          </p>
          <div className="space-y-2 text-[#554F47]">
            <p className="flex items-center gap-2">
              <Mail size={13} className="text-[#111111] shrink-0" />
              <a
                href="mailto:artcircle.studio@gmail.com"
                className="underline underline-offset-4 hover:text-[#111111]"
              >
                artcircle.studio@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={13} className="text-[#111111] shrink-0" />
              <a
                href="tel:+442079460992"
                className="underline underline-offset-4 hover:text-[#111111]"
              >
                +44 20 7946 0992
              </a>
            </p>
            <p className="text-[11px] text-[#7A756D] pt-1">
              Direct line to Elena Vance & gallery team
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={onOpenInquiry}
              className="px-4 py-2 bg-[#111111] text-[#FAF8F5] text-[11px] uppercase tracking-wider font-sans rounded-none hover:bg-stone-800 transition-colors"
            >
              Open Contact Options
            </button>
          </div>
        </div>

        {/* Column 4: Studio Location */}
        <div className="space-y-3">
          <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#111111]">
            Studio Atelier
          </p>
          <div className="space-y-1 text-[#666057] leading-relaxed font-light">
            <p className="flex items-start gap-1.5">
              <MapPin size={13} className="text-[#111111] shrink-0 mt-0.5" />
              <span>42 Pavilion Mews, Mayfair, London W1K 4QT</span>
            </p>
            <p className="pt-1 text-[#8C8478]">Tuesday – Saturday · 11:00 – 18:00</p>
            <p className="text-[#8C8478]">By private appointment</p>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Colophon */}
      <div className="border-t border-[#E5DFD5] py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-wider text-[#8A8276] font-sans">
          <p>© {new Date().getFullYear()} Art Circle Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Quiet Contemporary Art</span>
            <span>·</span>
            <span>Worldwide Transit</span>
            <span>·</span>
            <span>Signed Certificates</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
