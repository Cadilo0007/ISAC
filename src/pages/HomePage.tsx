import React from 'react';
import { ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';
import { Artwork, JournalPost, FounderInfo, Artist } from '../types.ts';
import { StatusIndicator } from '../components/StatusIndicator.tsx';

interface HomePageProps {
  artworks: Artwork[];
  artists: Artist[];
  journalPosts: JournalPost[];
  founder: FounderInfo;
  onSelectArtwork: (artworkId: string) => void;
  onSelectArticle: (articleId: string) => void;
  onSelectArtist: (slug: string) => void;
  onNavigate: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  artworks,
  artists,
  journalPosts,
  founder,
  onSelectArtwork,
  onSelectArticle,
  onSelectArtist,
  onNavigate,
}) => {
  const featuredArtworks = artworks.slice(0, 4);
  const recentArticles = journalPosts.slice(0, 3);

  return (
    <div className="space-y-28 lg:space-y-36 pb-12">
      {/* 1. HERO SECTION */}
      <section className="pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Hero Header Statement */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans mb-4">
              Curated Studio & Gallery
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#111111] leading-[1.12] tracking-tight">
              A Space for Art, Stories, and Meaning.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#554F47] font-sans font-light leading-relaxed max-w-2xl">
              An independent art studio curating works that inspire connection, curiosity, and conversation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button
                onClick={() => onNavigate('collection')}
                className="px-8 py-3.5 bg-[#111111] text-[#FAF8F5] border border-[#111111] text-xs tracking-[0.2em] uppercase font-sans hover:bg-transparent hover:text-[#111111] transition-all cursor-pointer rounded-none"
              >
                Explore the Collection
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#111111] font-sans py-2 border-b border-[#111111] hover:text-[#554F47] transition-colors cursor-pointer"
              >
                <span>About The Studio</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Hero Feature Visual */}
          <div className="relative border border-[#E8E2D8] bg-[#F2EDE6] overflow-hidden">
            <img
              src="/src/assets/images/hero_artwork_gallery_1792565466291.jpg"
              alt="Art Circle exhibition space with monumental minimalist contemporary canvas"
              className="w-full aspect-[16/9] object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Curatorial Caption */}
            <div className="p-4 sm:p-6 bg-[#FAF8F5] border-t border-[#E8E2D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans text-[#666057]">
              <div>
                <span className="font-medium text-[#111111]">Art Circle Atelier & Main Gallery</span>
                <span className="mx-2">·</span>
                <span>Current Curatorial Installation: Monochromes & Spatial Integrity</span>
              </div>
              <div className="text-[11px] text-[#7A756D] uppercase tracking-wider">
                London · Mayfair
              </div>
            </div>
          </div>

          {/* Small Introduction Section */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-[#E8E2D8] pb-16">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans block">
                The Curatorial Vision
              </span>
              <p className="font-serif text-2xl text-[#111111] mt-2 font-light">
                Quiet presence in a world of visual noise.
              </p>
            </div>
            <div className="md:col-span-8 text-[#554F47] font-sans text-sm sm:text-base leading-relaxed space-y-4 font-light">
              <p>
                Art Circle was founded on a singular conviction: that contemporary art is most resonant when experienced intimately. Rather than operating as an impersonal transactional showroom, our studio represents an independent collective of emerging and established artists who work with patience, tactile materiality, and intellectual depth.
              </p>
              <p>
                Each artwork presented in our collection is accompanied by its full narrative—the medium, the architectural context, the artist’s hand, and the questions it invites into the space it inhabits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTION (Asymmetrical Editorial Grid) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-[#E8E2D8] pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
              Selected Works
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#111111] tracking-tight mt-1">
              Featured Collection
            </h2>
          </div>
          <button
            onClick={() => onNavigate('collection')}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#111111] font-sans hover:text-[#554F47] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Works ({artworks.length})</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Asymmetrical Grid: 1 large left + 3 staggered right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {featuredArtworks[0] && (
            <div
              key={featuredArtworks[0].id}
              onClick={() => onSelectArtwork(featuredArtworks[0].id)}
              className="lg:col-span-7 group cursor-pointer space-y-4"
            >
              <div className="relative overflow-hidden bg-[#F2EDE6] border border-[#E8E2D8]">
                <img
                  src={featuredArtworks[0].image}
                  alt={featuredArtworks[0].title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-[1.015] transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-[#FAF8F5]/90 backdrop-blur-xs px-3 py-1.5 border border-[#E8E2D8]">
                  <StatusIndicator status={featuredArtworks[0].status} />
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 pt-1">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#111111] group-hover:underline underline-offset-4 decoration-1">
                    {featuredArtworks[0].title}
                  </h3>
                  <p className="text-sm text-[#554F47] font-sans mt-0.5">
                    {featuredArtworks[0].artist} · {featuredArtworks[0].year}
                  </p>
                  <p className="text-xs text-[#7A756D] font-sans mt-1">
                    {featuredArtworks[0].medium}
                  </p>
                  <p className="text-xs text-[#8C8478] font-sans">
                    {featuredArtworks[0].dimensions}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-sans text-sm font-semibold text-[#111111] block">
                    ${featuredArtworks[0].price.toLocaleString()} USD
                  </span>
                  <span className="text-[11px] text-[#7A756D] tracking-wider uppercase inline-flex items-center gap-1 group-hover:text-[#111111] transition-colors mt-2">
                    <span>Examine</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Staggered Right Column (3 works) */}
          <div className="lg:col-span-5 space-y-12">
            {featuredArtworks.slice(1, 4).map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArtwork(art.id)}
                className="group cursor-pointer grid grid-cols-1 sm:grid-cols-12 gap-5 items-center border-b border-[#EFEAE2] pb-8 last:border-b-0"
              >
                <div className="sm:col-span-5 relative overflow-hidden bg-[#F2EDE6] border border-[#E8E2D8]">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="sm:col-span-7 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <StatusIndicator status={art.status} />
                    <span className="font-sans text-xs font-semibold text-[#111111]">
                      ${art.price.toLocaleString()}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#111111] group-hover:underline underline-offset-4 decoration-1 leading-snug">
                    {art.title}
                  </h4>
                  <p className="text-xs text-[#554F47] font-sans">
                    {art.artist} ({art.year})
                  </p>
                  <p className="text-[11px] text-[#7A756D] font-sans line-clamp-1">
                    {art.medium}
                  </p>
                  <p className="text-[11px] text-[#8C8478] font-sans">
                    {art.dimensions}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT PREVIEW & PHILOSOPHY */}
      <section className="bg-[#F4EFEA] border-y border-[#E5DFD5] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] leading-tight">
                Art as an enduring dialogue, not temporary decor.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-[#554F47] font-sans text-sm sm:text-base leading-relaxed font-light">
              <p>
                We believe that the art we welcome into our homes and architectural environments shapes our thoughts, calms our senses, and grounds our daily experience. Art Circle works directly with visionary artists whose pieces demand unhurried viewing and celebrate raw, honest craftsmanship.
              </p>
              <p>
                Whether you are acquiring your first original artwork or adding to an extensive collection, our curatorial team ensures every acquisition is rooted in personal connection, provenance, and deep appreciation for the creative narrative.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#111111] font-sans font-medium border-b border-[#111111] pb-1 hover:text-[#554F47] transition-colors cursor-pointer"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUNDER PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait side */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative border border-[#E8E2D8] bg-[#F2EDE6]">
              <img
                src={founder.portrait}
                alt={founder.name}
                className="w-full aspect-[3/4] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-[#FAF8F5] border-t border-[#E8E2D8] text-xs font-sans">
                <p className="font-medium text-[#111111]">{founder.name}</p>
                <p className="text-[#7A756D]">{founder.role} · Art Circle Studio</p>
              </div>
            </div>
          </div>

          {/* Story side */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
              Meet The Founder
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#111111] tracking-tight leading-tight">
              “When an artwork is created with intention, it carries a silent pulse that stays with you across a lifetime.”
            </h2>
            <div className="space-y-4 text-[#554F47] font-sans text-sm sm:text-base leading-relaxed font-light">
              <p>
                {founder.originStory.slice(0, 320)}...
              </p>
              <p>
                Under Elena’s direction, Art Circle remains committed to supporting artists with fair compensation, sustainable practices, and thoughtful introductions to collectors worldwide.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 border border-[#111111] text-[#111111] text-xs tracking-[0.2em] uppercase font-sans hover:bg-[#111111] hover:text-[#FAF8F5] transition-all cursor-pointer rounded-none"
              >
                Read Elena’s Full Letter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RESIDENT ARTISTS & COLLECTIVE */}
      <section className="bg-[#F4EFEA] border-y border-[#E5DFD5] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-[#D5CDC2] pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
                The Resident Team
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#111111] tracking-tight mt-1">
                The Artists Collective
              </h2>
            </div>
            <button
              onClick={() => onNavigate('artists')}
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#111111] font-sans hover:text-[#554F47] transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>View All Portfolios ({artists.length})</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {artists.slice(0, 4).map((artist) => (
              <div
                key={artist.id}
                onClick={() => {
                  onSelectArtist(artist.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-[#FAF8F5] border border-[#E5DFD5] p-4 flex flex-col justify-between hover:border-[#111111] transition-all"
              >
                <div className="space-y-3">
                  <div className="overflow-hidden bg-[#F2EDE6] border border-[#E5DFD5] aspect-[3/4]">
                    <img
                      src={artist.portrait}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-sans text-[#7A756D] block">
                      {artist.discipline}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-[#111111] group-hover:underline underline-offset-4 decoration-1 mt-0.5">
                      {artist.name}
                    </h3>
                    <p className="text-xs text-[#554F47] font-sans mt-1 line-clamp-2 font-light">
                      {artist.role}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-[#EFEAE2] flex items-center justify-between text-xs font-sans text-[#111111]">
                  <span className="text-[11px] uppercase tracking-wider font-medium inline-flex items-center gap-1 group-hover:text-[#554F47]">
                    <span>Portfolio & Arts</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. JOURNAL PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 border-t border-[#E8E2D8] pt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
              From The Atelier
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#111111] tracking-tight mt-1">
              The Journal
            </h2>
          </div>
          <button
            onClick={() => onNavigate('journal')}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#111111] font-sans hover:text-[#554F47] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>All Articles</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {recentArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article.id)}
              className="group cursor-pointer space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="overflow-hidden bg-[#F2EDE6] border border-[#E8E2D8]">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full aspect-[16/10] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-[#7A756D] font-sans">
                  <span>{article.category}</span>
                  <span>·</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] group-hover:underline underline-offset-4 decoration-1 leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-[#554F47] font-sans line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase font-sans text-[#111111] font-medium group-hover:text-[#554F47] transition-colors">
                  <span>Read Story</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
