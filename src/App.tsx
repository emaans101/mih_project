import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { QRCodeModal } from './components/QRCodeModal';
import { HomePage } from './pages/HomePage';
import { HowToPlayPage } from './pages/HowToPlayPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { GamePage } from './pages/GamePage';
import { getSavedPlayerName } from './services/api';
import { Sparkles, QrCode } from 'lucide-react';

type Page = 'home' | 'how-to-play' | 'leaderboard' | 'play';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isQROpen, setIsQROpen] = useState(false);
  const [playerName, setPlayerName] = useState<string>('');

  useEffect(() => {
    // Load persisted player nickname if available
    const saved = getSavedPlayerName();
    if (saved) {
      setPlayerName(saved);
    }

    // Check URL query param for direct QR code launch: ?mode=play or /play
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'play' || window.location.pathname.includes('/play')) {
        setCurrentPage('play');
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#2D264B]">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenQR={() => setIsQROpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={setCurrentPage}
            onOpenQR={() => setIsQROpen(true)}
          />
        )}

        {currentPage === 'how-to-play' && (
          <HowToPlayPage
            onStartPlay={() => setCurrentPage('play')}
          />
        )}

        {currentPage === 'leaderboard' && (
          <LeaderboardPage
            onStartPlay={() => setCurrentPage('play')}
            currentPlayerName={playerName}
          />
        )}

        {currentPage === 'play' && (
          <GamePage
            playerName={playerName}
            onUpdatePlayerName={setPlayerName}
            onNavigate={setCurrentPage}
          />
        )}
      </main>

      {/* QR Code Modal for Event Attendees */}
      <QRCodeModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-[#ECE7FA] bg-white/70 py-8 px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-extrabold text-sm text-[#2D264B] font-display">MIH</span>
              <span className="text-xs text-[#6E6594]">•</span>
              <span className="text-xs font-semibold text-[#7C3AED]">Middlesex Innovative Hub</span>
              <span className="text-xs text-[#6E6594]">•</span>
              <span className="text-xs text-[#6E6594]">Dubai Campus</span>
            </div>
            <p className="text-[11px] text-[#6E6594]">
              Solo-friendly social deduction game. No lobbies, accounts, or waiting required.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#5B5282]">
            <button
              onClick={() => setCurrentPage('how-to-play')}
              className="hover:text-[#7C3AED] transition-colors"
            >
              How to Play
            </button>
            <button
              onClick={() => setCurrentPage('leaderboard')}
              className="hover:text-[#7C3AED] transition-colors"
            >
              Leaderboard
            </button>
            <button
              onClick={() => setIsQROpen(true)}
              className="hover:text-[#7C3AED] transition-colors flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Event QR</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
