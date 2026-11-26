import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, User, Share2, BookOpen } from 'lucide-react';
import { JournalPost } from '../types.ts';

interface JournalPageProps {
  posts: JournalPost[];
  selectedPostId?: string | null;
  onSelectPost: (id: string | null) => void;
  onNavigate: (tab: string) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({
  posts,
  selectedPostId,
  onSelectPost,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);

  const selectedPost = posts.find((p) => p.id === selectedPostId || p.slug === selectedPostId);

  const categories = ['All', 'Studio Visits', 'On Collecting', 'Critical Essays'];

  const filteredPosts = activeCategory === 'All'
    ? posts.filter((p) => p.published)
    : posts.filter((p) => p.published && p.category.toLowerCase() === activeCategory.toLowerCase());

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // FULL ARTICLE VIEW
  if (selectedPost) {
    const otherPosts = posts
      .filter((p) => p.id !== selectedPost.id && p.published)
      .slice(0, 2);

    return (
      <article className="max-w-4xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
        {/* Back Link */}
        <div className="mb-10">
          <button
            onClick={() => onSelectPost(null)}
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans text-[#7A756D] hover:text-[#111111] transition-colors cursor-pointer py-1"
          >
            <ArrowLeft size={14} />
            <span>Back to The Journal</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="space-y-6 border-b border-[#E8E2D8] pb-10">
          <div className="flex items-center gap-3 text-xs tracking-wider uppercase font-sans text-[#7A756D]">
            <span>{selectedPost.category}</span>
            <span>·</span>
            <span>{selectedPost.date}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} />
              <span>{selectedPost.readTime}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] leading-[1.18] tracking-tight">
            {selectedPost.title}
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#554F47] font-light leading-relaxed">
            {selectedPost.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 text-xs font-sans text-[#666057]">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#111111]">Words by {selectedPost.author}</span>
              <span>·</span>
              <span>Art Circle Curatorial Desk</span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-[#7A756D] hover:text-[#111111] transition-colors cursor-pointer"
            >
              <Share2 size={13} />
              <span>{copied ? 'Link Copied' : 'Share Dispatch'}</span>
            </button>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="my-10 border border-[#E8E2D8] bg-[#F2EDE6]">
          <img
            src={selectedPost.coverImage}
            alt={selectedPost.title}
            className="w-full aspect-[16/9] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="p-3 bg-[#F7F4EE] border-t border-[#E8E2D8] text-[11px] text-[#7A756D] font-sans italic text-center">
            Photography documenting archival work at Art Circle Studio, Mayfair.
          </div>
        </div>

        {/* Main Body Prose with editorial cadence */}
        <div className="max-w-2xl mx-auto space-y-6 text-[#2E2B27] font-sans text-base sm:text-lg leading-[1.8] font-light">
          {selectedPost.content.split('\n\n').map((paragraph, idx) => {
            if (idx === 0) {
              return (
                <p
                  key={idx}
                  className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#111111]"
                >
                  {paragraph}
                </p>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* Pull quote divider */}
        <div className="my-14 py-8 border-y border-[#E8E2D8] text-center max-w-2xl mx-auto">
          <p className="font-serif text-2xl sm:text-3xl text-[#111111] italic font-light leading-snug">
            “Art does not seek to explain the universe; it simply creates a space in which we are willing to sit with its mysteries.”
          </p>
        </div>

        {/* Post Footer & Next Articles */}
        <footer className="mt-16 pt-12 border-t border-[#E8E2D8]">
          <h3 className="font-serif text-2xl font-light text-[#111111] mb-8">
            Further Curatorial Dispatches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherPosts.map((other) => (
              <div
                key={other.id}
                onClick={() => {
                  onSelectPost(other.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer space-y-3 p-5 bg-[#F7F4EE] border border-[#E5DFD5] hover:border-[#111111] transition-colors"
              >
                <div className="text-[11px] text-[#7A756D] font-sans uppercase tracking-wider">
                  {other.category} · {other.date}
                </div>
                <h4 className="font-serif text-xl font-normal text-[#111111] group-hover:underline underline-offset-4 decoration-1">
                  {other.title}
                </h4>
                <p className="text-xs text-[#554F47] font-sans line-clamp-2 leading-relaxed">
                  {other.excerpt}
                </p>
                <div className="pt-2 text-[11px] text-[#111111] uppercase tracking-wider font-medium inline-flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </footer>
      </article>
    );
  }

  // JOURNAL INDEX / BLOG LIST VIEW
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="border-b border-[#E8E2D8] pb-10 mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
          Studio Writings & Reflections
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#111111] tracking-tight mt-2">
          The Journal
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#554F47] font-sans font-light max-w-2xl leading-relaxed">
          Essays on contemporary collecting, studio visits, the stories behind featured artworks, and reflections on living with intentional art.
        </p>

        {/* Categories */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pt-6 border-t border-[#EFEAE2]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 text-xs tracking-wider uppercase font-sans border rounded-none transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#111111] text-[#FAF8F5] border-[#111111]'
                    : 'bg-white text-[#554F47] border-[#D5CDC2] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Lead Post */}
      {filteredPosts[0] && (
        <div
          onClick={() => onSelectPost(filteredPosts[0].id)}
          className="group cursor-pointer mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] border border-[#E8E2D8] p-6 sm:p-8"
        >
          <div className="lg:col-span-7 overflow-hidden bg-[#F2EDE6] border border-[#E8E2D8]">
            <img
              src={filteredPosts[0].coverImage}
              alt={filteredPosts[0].title}
              className="w-full aspect-[16/10] object-cover group-hover:scale-[1.015] transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#7A756D] font-sans uppercase tracking-wider">
              <span>Featured Story</span>
              <span>·</span>
              <span>{filteredPosts[0].category}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#111111] group-hover:underline underline-offset-4 decoration-1 leading-snug">
              {filteredPosts[0].title}
            </h2>
            <p className="text-xs sm:text-sm text-[#554F47] font-sans leading-relaxed line-clamp-3 font-light">
              {filteredPosts[0].excerpt}
            </p>
            <div className="pt-2 flex items-center justify-between text-xs font-sans text-[#7A756D]">
              <span>By {filteredPosts[0].author}</span>
              <span className="font-medium text-[#111111] uppercase tracking-wider inline-flex items-center gap-1 group-hover:text-[#554F47]">
                <span>Read Full Essay</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Remaining Journal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredPosts.slice(1).map((post) => (
          <article
            key={post.id}
            onClick={() => onSelectPost(post.id)}
            className="group cursor-pointer flex flex-col justify-between border-b border-[#EFEAE2] pb-8"
          >
            <div className="space-y-4">
              <div className="overflow-hidden bg-[#F2EDE6] border border-[#E8E2D8]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full aspect-[16/10] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-[#7A756D] font-sans">
                <span>{post.category}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
              <h3 className="font-serif text-xl font-normal text-[#111111] group-hover:underline underline-offset-4 decoration-1 leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-[#554F47] font-sans line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs font-sans text-[#7A756D]">
              <span>{post.readTime}</span>
              <span className="text-[#111111] uppercase tracking-wider font-medium inline-flex items-center gap-1 group-hover:text-[#554F47]">
                <span>Read</span>
                <ArrowRight size={12} />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
