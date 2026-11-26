import React, { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenInquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'collection', label: 'Collection' },
    { key: 'artists', label: 'Artists' },
    { key: 'about', label: 'About' },
    { key: 'journal', label: 'Journal' },
    { key: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (key: string) => {
    onNavigate(key);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E8E3DB] transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo Image + Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 text-left cursor-pointer group py-1"
        >
          <img
            src="/src/assets/images/art_circle_logo_1792568444008.jpg"
            alt="Art Circle Logo"
            className="w-11 h-11 object-contain border border-[#E5DFD5] bg-white p-0.5 shrink-0 group-hover:border-[#111111] transition-colors"
          />
          <div className="flex flex-col justify-center">
            <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] font-medium text-[#111111] whitespace-nowrap shrink-0 block uppercase leading-none">
              Art Circle
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#7A756D] uppercase block mt-1 font-sans leading-none">
              Studio & Collection
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Navigation Links (single-line, generous spacing, hover underline) */}
        <nav className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase font-sans font-normal text-[#4A453E]">
          {navItems.map((item) => {
            const isActive = currentTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 relative text-xs tracking-[0.18em] cursor-pointer ${
                  isActive ? 'text-[#111111] font-medium' : 'hover:text-[#111111]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#111111]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action: Direct Contact / Inquire */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenInquiry}
            className="px-5 py-2.5 bg-[#111111] text-[#FAF8F5] border border-[#111111] text-xs tracking-[0.18em] uppercase font-sans hover:bg-transparent hover:text-[#111111] transition-all cursor-pointer rounded-none whitespace-nowrap shrink-0 inline-flex items-center gap-2"
          >
            <Mail size={13} />
            <span>Contact Studio</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111111] hover:text-stone-600 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D8] bg-[#FAF8F5] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`text-left text-sm tracking-[0.18em] uppercase py-2 border-b border-[#EFEAE2] font-sans ${
                  currentTab === item.key ? 'text-[#111111] font-semibold' : 'text-[#5C564E]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3 bg-[#111111] text-[#FAF8F5] text-xs tracking-[0.18em] uppercase font-sans rounded-none inline-flex items-center justify-center gap-2"
            >
              <Mail size={14} />
              <span>Contact via Gmail / Phone</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
