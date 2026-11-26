import React from 'react';
import { ArrowRight, Sparkles, HeartHandshake, Compass, Layers } from 'lucide-react';
import { FounderInfo } from '../types.ts';

interface AboutPageProps {
  founder: FounderInfo;
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  founder,
  onNavigate,
}) => {
  return (
    <div className="space-y-24 pb-16">
      {/* 1. Header Hero Statement */}
      <section className="pt-10 sm:pt-16 max-w-7xl mx-auto px-6 sm:px-8 border-b border-[#E8E2D8] pb-16">
        <p className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans mb-3">
          Origins & Curatorial Practice
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#111111] max-w-4xl tracking-tight leading-[1.12]">
          We curate artworks that carry silence, patience, and living presence.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-[#554F47] font-sans font-light max-w-2xl leading-relaxed">
          Founded in London, Art Circle is an independent atelier devoted to celebrating genuine material craftsmanship and fostering enduring relationships between collectors and creators.
        </p>
      </section>

      {/* 2. Editorial Split: Founder Portrait & Letter */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait & Archival Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F2EDE6] border border-[#E8E2D8] p-3">
              <img
                src={founder.portrait}
                alt={founder.name}
                className="w-full aspect-[3/4] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-[#F7F4EE] border border-[#E5DFD5] space-y-1 text-xs font-sans">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#111111]">{founder.name}</span>
                <span className="text-[#8C8478]">London Atelier</span>
              </div>
              <p className="text-[#666057]">{founder.role}</p>
              <p className="text-[#8C8478] text-[11px] pt-1">
                Founded Art Circle in {founder.foundedYear} · {founder.location}
              </p>
            </div>
          </div>

          {/* Founder's Story & Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans block mb-2">
                A Letter from the Founder
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#111111] leading-tight">
                How Art Circle Began
              </h2>
            </div>

            {/* Editorial prose with drop cap */}
            <div className="space-y-6 text-[#4A453E] font-sans text-sm sm:text-base leading-relaxed font-light">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#111111]">
                {founder.originStory}
              </p>

              <blockquote className="my-8 py-6 px-8 bg-[#F4EFEA] border-l-2 border-[#111111] font-serif text-xl sm:text-2xl text-[#111111] font-light italic leading-snug">
                “{founder.philosophyStatement}”
              </blockquote>

              <p>
                In an era dominated by hyper-speed digital consumption, where images are scrolled past in milliseconds, we created Art Circle as an antidote to hurry. We wanted a physical and digital sanctuary where people could linger with an artwork, learn about the minerals in the paint, examine the weave of the linen, and feel the artist’s breath in the work.
              </p>

              <p>
                Every piece in our collection is held in high regard. We do not mass-produce reproductions or follow seasonal trend cycles. When an artwork enters the studio, it stays with us until it finds its rightful custodian.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#E8E2D8]">
              <div className="font-serif text-lg text-[#111111] italic">
                — {founder.name}, Principal Curator
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Studio Pillars & Curatorial Principles */}
      <section className="bg-[#F4EFEA] border-y border-[#E5DFD5] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
              Our Commitments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#111111] tracking-tight mt-1">
              Curatorial Philosophy & Ethics
            </h2>
            <p className="mt-3 text-sm text-[#554F47] font-sans font-light">
              Four fundamental values that guide every artist representation and collector conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#FAF8F5] p-8 border border-[#E5DFD5] space-y-4">
              <span className="text-xs font-serif text-[#7A756D]">01.</span>
              <h3 className="font-serif text-xl font-normal text-[#111111]">
                Slow Materiality
              </h3>
              <p className="text-xs text-[#554F47] font-sans leading-relaxed">
                We champion works made with hand-ground pigments, archival unprimed linens, volcanic clays, and sumi inks that age gracefully across generations.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-8 border border-[#E5DFD5] space-y-4">
              <span className="text-xs font-serif text-[#7A756D]">02.</span>
              <h3 className="font-serif text-xl font-normal text-[#111111]">
                Equitable Partnership
              </h3>
              <p className="text-xs text-[#554F47] font-sans leading-relaxed">
                Artists receive fair, transparent remuneration and long-term representation without the predatory exclusive contracts common to legacy mega-galleries.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-8 border border-[#E5DFD5] space-y-4">
              <span className="text-xs font-serif text-[#7A756D]">03.</span>
              <h3 className="font-serif text-xl font-normal text-[#111111]">
                Architectural Harmony
              </h3>
              <p className="text-xs text-[#554F47] font-sans leading-relaxed">
                We work hand-in-hand with collectors, architects, and designers to ensure each piece activates its surrounding spatial proportions without visual clutter.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-8 border border-[#E5DFD5] space-y-4">
              <span className="text-xs font-serif text-[#7A756D]">04.</span>
              <h3 className="font-serif text-xl font-normal text-[#111111]">
                Living Provenance
              </h3>
              <p className="text-xs text-[#554F47] font-sans leading-relaxed">
                Every acquisition includes complete documentation, artist notes, bespoke installation counsel, and verified certificates of authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Atelier Visit & Collaboration Invitation */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="border border-[#E8E2D8] bg-[#FAF8F5] p-10 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
              Visiting The Atelier
            </span>
            <h3 className="font-serif text-3xl font-light text-[#111111]">
              Experience the works in quiet, natural light.
            </h3>
            <p className="text-sm text-[#554F47] font-sans leading-relaxed max-w-xl font-light">
              We welcome private collectors, curators, architects, and curious visitors to our Mayfair studio for private viewings and coffee with our curatorial team.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 bg-[#111111] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-sans border border-[#111111] hover:bg-transparent hover:text-[#111111] transition-all cursor-pointer rounded-none text-center"
            >
              Book Studio Appointment
            </button>
            <button
              onClick={() => onNavigate('collection')}
              className="px-8 py-3.5 bg-transparent text-[#111111] text-xs uppercase tracking-[0.2em] font-sans border border-[#D5CDC2] hover:border-[#111111] transition-all cursor-pointer rounded-none text-center"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
