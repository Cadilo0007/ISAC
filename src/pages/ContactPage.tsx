import React, { useState } from 'react';
import { Mail, MapPin, Clock, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { api } from '../api.ts';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('artwork_purchase');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setFeedback('Please provide your name, email, and message.');
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const res = await api.submitInquiry({
        name,
        email,
        phone,
        type: category,
        subject: subject || `Inquiry from ${name}`,
        message,
      });

      setStatus('success');
      setFeedback(res.message || 'Your inquiry has been received. Our curatorial desk will respond shortly.');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setStatus('error');
      setFeedback(err.message || 'Unable to submit your inquiry at this moment. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="border-b border-[#E8E2D8] pb-10 mb-14">
        <p className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
          Studio Dialogues
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#111111] tracking-tight mt-2">
          Let’s Start a Conversation.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#554F47] font-sans font-light max-w-2xl leading-relaxed">
          Whether you are exploring an acquisition for your private collection, inquiring about architectural commissions, submitting an artist portfolio, or seeking a quiet studio visit, we welcome your correspondence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E8E2D8] p-8 sm:p-10">
          <h2 className="font-serif text-2xl font-light text-[#111111] mb-2">
            Send an Inquiry
          </h2>
          <p className="text-xs text-[#7A756D] font-sans mb-8">
            Every inquiry is read personally by our curatorial team. You will hear from us within 24 hours.
          </p>

          {status === 'success' ? (
            <div className="p-8 bg-[#F2EDE6] border border-[#D5CDC2] text-center space-y-4">
              <div className="w-10 h-10 mx-auto bg-[#111111] text-[#FAF8F5] flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-serif text-2xl text-[#111111]">Inquiry Received</h3>
              <p className="text-xs text-[#554F47] font-sans leading-relaxed max-w-md mx-auto">
                {feedback}
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-4 px-6 py-2.5 bg-[#111111] text-[#FAF8F5] text-xs uppercase tracking-widest font-sans rounded-none"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
              {status === 'error' && (
                <div className="p-3 bg-[#FBF0EE] border border-[#E9C3BC] text-[#C93B2B] text-xs">
                  {feedback}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-[#554F47] mb-1.5 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Elena or Arthur Vance"
                    className="w-full bg-[#FAF8F5] border border-[#D5CDC2] px-3.5 py-3 text-xs text-[#111111] focus:outline-none focus:border-[#111111] rounded-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-[#554F47] mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="collector@domain.com"
                    className="w-full bg-[#FAF8F5] border border-[#D5CDC2] px-3.5 py-3 text-xs text-[#111111] focus:outline-none focus:border-[#111111] rounded-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-[#554F47] mb-1.5 font-medium">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 20 7946 0992"
                    className="w-full bg-[#FAF8F5] border border-[#D5CDC2] px-3.5 py-3 text-xs text-[#111111] focus:outline-none focus:border-[#111111] rounded-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-[#554F47] mb-1.5 font-medium">
                    Inquiry Nature
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D5CDC2] px-3.5 py-3 text-xs text-[#111111] focus:outline-none focus:border-[#111111] rounded-none transition-colors cursor-pointer"
                  >
                    <option value="artwork_purchase">Artwork Acquisition</option>
                    <option value="reservation">Artwork Reservation</option>
                    <option value="artist_submission">Artist Representation Submission</option>
                    <option value="collaboration">Architectural / Curatorial Collaboration</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] tracking-wider uppercase text-[#554F47] mb-1.5 font-medium">
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Inquiry regarding piece dimensions or bespoke framing"
                  className="w-full bg-[#FAF8F5] border border-[#D5CDC2] px-3.5 py-3 text-xs text-[#111111] focus:outline-none focus:border-[#111111] rounded-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-wider uppercase text-[#554F47] mb-1.5 font-medium">
                  Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about the space you are curating, your timeline, or any questions about the collection..."
                  className="w-full bg-[#FAF8F5] border border-[#D5CDC2] p-3 text-xs text-[#111111] focus:outline-none focus:border-[#111111] rounded-none transition-colors leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] text-[#FAF8F5] border border-[#111111] text-xs uppercase tracking-[0.2em] font-sans hover:bg-transparent hover:text-[#111111] transition-all cursor-pointer rounded-none disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Studio Info & Location (5 cols) */}
        <div className="lg:col-span-5 space-y-10">
          {/* Atelier Details Card */}
          <div className="bg-[#F7F4EE] border border-[#E5DFD5] p-8 space-y-6 text-xs font-sans">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#111111] mb-2">
                Art Circle Atelier & Gallery
              </p>
              <div className="flex items-start gap-3 text-[#554F47] leading-relaxed">
                <MapPin size={16} className="text-[#111111] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#111111]">Mayfair Atelier</p>
                  <p>42 Pavilion Mews</p>
                  <p>Mayfair, London W1K 4QT, United Kingdom</p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E5DFD5] pt-4">
              <div className="flex items-start gap-3 text-[#554F47] leading-relaxed">
                <Clock size={16} className="text-[#111111] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#111111]">Gallery Hours</p>
                  <p>Tuesday – Saturday: 11:00 – 18:00</p>
                  <p className="text-[#7A756D]">Sunday & Monday: By private appointment</p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E5DFD5] pt-4">
              <div className="flex items-start gap-3 text-[#554F47] leading-relaxed">
                <Mail size={16} className="text-[#111111] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#111111]">Direct Gmail / Email</p>
                  <p>
                    <a
                      href="mailto:artcircle.studio@gmail.com"
                      className="text-[#111111] underline underline-offset-4"
                    >
                      artcircle.studio@gmail.com
                    </a>
                  </p>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=artcircle.studio@gmail.com&su=Art%20Circle%20Inquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1 text-[11px] text-[#7A756D] hover:text-[#111111] underline"
                  >
                    Open in Gmail Web ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E5DFD5] pt-4">
              <div className="flex items-start gap-3 text-[#554F47] leading-relaxed">
                <Phone size={16} className="text-[#111111] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#111111]">Direct Atelier Telephone</p>
                  <p>
                    <a
                      href="tel:+442079460992"
                      className="text-[#111111] underline underline-offset-4"
                    >
                      +44 20 7946 0992
                    </a>
                  </p>
                  <p className="text-[11px] text-[#7A756D]">Direct line to curator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Artist submissions note */}
          <div className="p-6 bg-[#FAF8F5] border border-[#E8E2D8] space-y-2 text-xs font-sans text-[#554F47]">
            <h4 className="font-serif text-lg text-[#111111] font-medium">
              Note on Artist Submissions
            </h4>
            <p className="leading-relaxed font-light">
              We review artist portfolios on a quarterly curatorial cycle. Please select "Artist Representation Submission" in the inquiry dropdown and provide a link to your catalogue raisonné or website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
