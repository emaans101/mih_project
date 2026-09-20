import { useState } from 'react';
import { Menu, X, QrCode, Trophy, BookOpen, Play, Sparkles, Home as HomeIcon } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'how-to-play' | 'leaderboard' | 'play';
  onNavigate: (page: 'home' | 'how-to-play' | 'leaderboard' | 'play') => void;
  onOpenQR: () => void;
}

export function Navbar({ currentPage, onNavigate, onOpenQR }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'how-to-play', label: 'How to Play', icon: BookOpen },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  ] as const;

  const handleNav = (page: 'home' | 'how-to-play' | 'leaderboard' | 'play') => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-[#ECE7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & University Brand */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-purple-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#2D264B] font-display">
                  MIH
                </span>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F3E8FF] text-[#7C3AED]">
                  DUBAI
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#6E6594] font-medium leading-none">
                Innovation Imposter
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#EDE9FE] text-[#6D28D9] font-semibold'
                      : 'text-[#4B416E] hover:text-[#2D264B] hover:bg-[#F8F7FC]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={onOpenQR}
              className="p-2.5 rounded-xl border border-[#E2DCF8] text-[#6E6594] hover:text-[#2D264B] hover:bg-[#FAF9FE] transition-colors"
              title="Event QR Code"
              aria-label="Open Event QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleNav('play')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 ${
                currentPage === 'play'
                  ? 'bg-[#7C3AED] text-white'
                  : 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white hover:shadow-md'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Play Now</span>
            </button>
          </div>

          {/* Mobile Quick Action & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenQR}
              className="p-2 rounded-xl border border-[#E2DCF8] text-[#6E6594] hover:bg-[#FAF9FE]"
              aria-label="Scan QR"
            >
              <QrCode className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleNav('play')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#8B5CF6] text-white flex items-center gap-1"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#4B416E] hover:bg-[#FAF9FE]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#ECE7FA] bg-white px-4 pt-3 pb-5 space-y-1.5 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navItems.map(item => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  isActive
                    ? 'bg-[#EDE9FE] text-[#6D28D9] font-semibold'
                    : 'text-[#4B416E] hover:bg-[#F8F7FC]'
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-[#7C3AED]" />}
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#ECE7FA]">
            <button
              onClick={() => handleNav('play')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#8B5CF6] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Play Now (Solo)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
