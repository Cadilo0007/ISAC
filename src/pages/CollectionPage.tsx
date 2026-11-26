import React, { useState, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Artwork, ArtworkCategory } from '../types.ts';
import { StatusIndicator } from '../components/StatusIndicator.tsx';

interface CollectionPageProps {
  artworks: Artwork[];
  onSelectArtwork: (id: string) => void;
  onOpenInquiry: () => void;
}

type FilterOption = 'All' | ArtworkCategory | 'Available' | 'Sold';

export const CollectionPage: React.FC<CollectionPageProps> = ({
  artworks,
  onSelectArtwork,
  onOpenInquiry,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year-desc'>('featured');

  const filterTabs: { label: string; value: FilterOption }[] = [
    { label: 'All Artworks', value: 'All' },
    { label: 'Paintings', value: 'Paintings' },
    { label: 'Photography', value: 'Photography' },
    { label: 'Sculptures', value: 'Sculptures' },
    { label: 'Prints', value: 'Prints' },
    { label: 'Available', value: 'Available' },
    { label: 'Sold', value: 'Sold' },
  ];

  const filteredArtworks = useMemo(() => {
    let list = [...artworks];

    if (activeFilter === 'Paintings' || activeFilter === 'Photography' || activeFilter === 'Sculptures' || activeFilter === 'Prints') {
      list = list.filter((a) => a.category === activeFilter);
    } else if (activeFilter === 'Available') {
      list = list.filter((a) => a.status === 'available');
    } else if (activeFilter === 'Sold') {
      list = list.filter((a) => a.status === 'sold');
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'year-desc') {
      list.sort((a, b) => b.year - a.year);
    }

    return list;
  }, [artworks, activeFilter, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="border-b border-[#E8E2D8] pb-10 mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-[#7A756D] font-sans">
          The Curated Archive
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#111111] tracking-tight mt-2">
          The Art Collection
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#554F47] font-sans font-light max-w-2xl leading-relaxed">
          Original contemporary paintings, fine art photography, hand-coiled sculptures, and singular monotypes. Each work is accompanied by full provenance and artist documentation.
        </p>

        {/* Filters and Controls */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-[#EFEAE2]">
          {/* Category & Status Filter Tabs (clean unboxed segmented style, strictly square) */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-3.5 py-2 text-xs tracking-wider uppercase font-sans border rounded-none transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-[#FAF8F5] border-[#111111]'
                      : 'bg-white text-[#554F47] border-[#D5CDC2] hover:border-[#111111] hover:text-[#111111]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 text-xs font-sans text-[#7A756D]">
            <span className="uppercase tracking-wider text-[11px]">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#D5CDC2] px-3 py-1.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111] rounded-none cursor-pointer"
            >
              <option value="featured">Curatorial Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Most Recent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Artworks */}
      {filteredArtworks.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-[#D5CDC2] p-8">
          <p className="font-serif text-2xl text-[#111111] font-light">No artworks match this criterion.</p>
          <p className="text-xs text-[#7A756D] font-sans mt-2">
            Try adjusting your filter or reach out to our curators for works currently in studio preview.
          </p>
          <button
            onClick={() => setActiveFilter('All')}
            className="mt-6 px-6 py-2.5 bg-[#111111] text-[#FAF8F5] text-xs uppercase tracking-widest font-sans rounded-none"
          >
            Show All Works
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredArtworks.map((artwork) => (
            <article
              key={artwork.id}
              onClick={() => onSelectArtwork(artwork.id)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Artwork Framing Card */}
                <div className="relative overflow-hidden bg-[#F2EDE6] border border-[#E8E2D8] aspect-[4/3] flex items-center justify-center p-3">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Status Overlay Badge */}
                  <div className="absolute top-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 border border-[#E8E2D8]">
                    <StatusIndicator status={artwork.status} />
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] group-hover:underline underline-offset-4 decoration-1">
                      {artwork.title}
                    </h3>
                    <span className="font-sans text-xs font-semibold text-[#111111] whitespace-nowrap">
                      ${artwork.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-[#554F47] font-sans">
                    {artwork.artist} · {artwork.year}
                  </p>

                  <p className="text-xs text-[#7A756D] font-sans line-clamp-1">
                    {artwork.medium}
                  </p>

                  <p className="text-[11px] text-[#8C8478] font-sans">
                    {artwork.dimensions}
                  </p>
                </div>
              </div>

              {/* Action link */}
              <div className="mt-4 pt-3 border-t border-[#EFEAE2] flex items-center justify-between text-xs font-sans text-[#7A756D]">
                <StatusIndicator status={artwork.status} />
                <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#111111] group-hover:text-[#554F47] transition-colors">
                  <span>View Details</span>
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Advisory Callout at Bottom */}
      <div className="mt-24 p-8 sm:p-10 bg-[#F4EFEA] border border-[#E5DFD5] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h4 className="font-serif text-2xl font-light text-[#111111]">
            Looking for a specific commission or dimensions?
          </h4>
          <p className="text-xs sm:text-sm text-[#554F47] font-sans leading-relaxed">
            Our curators collaborate with private clients, architects, and interior designers to commission custom bespoke pieces and source specific archival artists.
          </p>
        </div>
        <button
          onClick={onOpenInquiry}
          className="px-6 py-3 bg-[#111111] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-sans border border-[#111111] hover:bg-transparent hover:text-[#111111] transition-all cursor-pointer rounded-none whitespace-nowrap shrink-0"
        >
          Consult Our Curators
        </button>
      </div>
    </div>
  );
};
