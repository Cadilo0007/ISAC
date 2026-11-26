import React, { useState } from 'react';
import { X, ZoomIn, Eye } from 'lucide-react';
import { Artwork } from '../types.ts';

interface RoomViewModalProps {
  artwork: Artwork;
  isOpen: boolean;
  onClose: () => void;
}

export const RoomViewModal: React.FC<RoomViewModalProps> = ({ artwork, isOpen, onClose }) => {
  const [wallColor, setWallColor] = useState<'chalk' | 'limestone' | 'charcoal'>('chalk');

  if (!isOpen) return null;

  const wallStyles = {
    chalk: 'bg-[#F9F7F3] border-[#E8E2D8]',
    limestone: 'bg-[#ECE7DF] border-[#DDD5C7]',
    charcoal: 'bg-[#21201E] border-[#363430] text-[#E5DFD5]',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#FAF8F5] border border-[#D5CDC2] w-full max-w-5xl rounded-none shadow-2xl relative overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-[#E8E3DB] flex items-center justify-between gap-4 bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <Eye size={18} className="text-[#111111]" />
            <div>
              <h4 className="font-serif text-lg font-medium text-[#111111] leading-none">
                Virtual Gallery View · {artwork.title}
              </h4>
              <p className="text-[11px] text-[#7A756D] font-sans mt-0.5">
                Proportional gallery installation view · Dimensions: {artwork.dimensions}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Wall color selector */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-sans">
              <span className="text-[11px] uppercase tracking-wider text-[#7A756D] mr-1">Wall:</span>
              <button
                onClick={() => setWallColor('chalk')}
                className={`px-2.5 py-1 text-[11px] tracking-wider uppercase border rounded-none transition-colors ${
                  wallColor === 'chalk' ? 'border-[#111111] bg-[#111111] text-white' : 'border-[#D5CDC2] bg-white text-[#554F47]'
                }`}
              >
                Chalk Plaster
              </button>
              <button
                onClick={() => setWallColor('limestone')}
                className={`px-2.5 py-1 text-[11px] tracking-wider uppercase border rounded-none transition-colors ${
                  wallColor === 'limestone' ? 'border-[#111111] bg-[#111111] text-white' : 'border-[#D5CDC2] bg-[#ECE7DF] text-[#554F47]'
                }`}
              >
                Limestone
              </button>
              <button
                onClick={() => setWallColor('charcoal')}
                className={`px-2.5 py-1 text-[11px] tracking-wider uppercase border rounded-none transition-colors ${
                  wallColor === 'charcoal' ? 'border-[#111111] bg-[#111111] text-white' : 'border-[#D5CDC2] bg-[#222222] text-[#E5DFD5]'
                }`}
              >
                Charcoal
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#666057] hover:text-[#111111] transition-colors cursor-pointer"
              aria-label="Close room view"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Room Stage Area */}
        <div className={`relative flex-1 min-h-[460px] flex flex-col justify-between items-center p-8 transition-colors duration-300 ${wallStyles[wallColor]}`}>
          {/* Gallery spotlight ceiling simulation */}
          <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />

          {/* Wall Hanging Artwork */}
          <div className="flex-1 flex items-center justify-center py-6 w-full">
            <div className="relative group max-w-md sm:max-w-lg lg:max-w-xl transition-transform duration-300">
              <div className="shadow-2xl ring-1 ring-black/10 bg-white p-2">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="max-h-[340px] sm:max-h-[380px] w-auto object-contain mx-auto shadow-md"
                />
              </div>
              <div className="absolute -bottom-8 right-0 text-[10px] tracking-widest font-sans uppercase opacity-70">
                {artwork.dimensions}
              </div>
            </div>
          </div>

          {/* Gallery Floor Simulation with Minimal Architectural Bench */}
          <div className="w-full relative pt-4 border-t border-black/10 flex flex-col items-center">
            {/* Minimalist Gallery Bench */}
            <div className="w-48 sm:w-64 h-7 bg-[#2A2724] border border-[#1A1816] shadow-lg relative flex items-center justify-center">
              <div className="absolute -bottom-4 left-4 w-2 h-4 bg-[#1E1C1A]" />
              <div className="absolute -bottom-4 right-4 w-2 h-4 bg-[#1E1C1A]" />
            </div>
            {/* Floor Plane */}
            <div className="w-full h-8 bg-gradient-to-b from-black/10 to-transparent mt-4 flex items-center justify-center">
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase opacity-50">
                Art Circle Studio · Gallery Space
              </span>
            </div>
          </div>
        </div>

        {/* Footer info strip */}
        <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#E8E3DB] flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#5C564E]">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#111111]">{artwork.artist}</span>
            <span>·</span>
            <span>{artwork.title} ({artwork.year})</span>
          </div>
          <div className="mt-1 sm:mt-0 text-[11px] text-[#7A756D]">
            Curated framing specifications available upon acquisition
          </div>
        </div>
      </div>
    </div>
  );
};
