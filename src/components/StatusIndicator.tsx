import React from 'react';
import { ArtworkStatus } from '../types.ts';

interface StatusIndicatorProps {
  status: ArtworkStatus;
  className?: string;
  showText?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  className = '',
  showText = true,
}) => {
  if (status === 'available') {
    return (
      <span className={`inline-flex items-center text-xs tracking-wider uppercase text-stone-500 font-sans ${className}`}>
        {showText && <span>Available</span>}
      </span>
    );
  }

  if (status === 'reserved') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-stone-700 font-sans ${className}`}>
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#C93B2B] inline-block shrink-0 shadow-[0_0_2px_rgba(201,59,43,0.4)]"
          aria-hidden="true"
        />
        {showText && <span>Reserved</span>}
      </span>
    );
  }

  // Sold
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-stone-500 font-sans ${className}`}>
      <span
        className="w-1.5 h-1.5 rounded-full bg-[#C93B2B] inline-block shrink-0 shadow-[0_0_2px_rgba(201,59,43,0.4)]"
        aria-hidden="true"
      />
      {showText && <span>Sold</span>}
    </span>
  );
};
