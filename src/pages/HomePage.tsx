import { Play, BookOpen, Trophy, QrCode, Sparkles, Shield, Cpu, Target, ArrowRight } from 'lucide-react';
import { HeroIllustration } from '../components/HeroIllustration';
import { BOTS } from '../data/bots';
import { BotAvatar } from '../components/BotAvatar';

interface HomePageProps {
  onNavigate: (page: 'home' | 'how-to-play' | 'leaderboard' | 'play') => void;
  onOpenQR: () => void;
}

export function HomePage({ onNavigate, onOpenQR }: HomePageProps) {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE9FE] border border-[#DDD6FE] text-[#6D28D9] text-xs font-semibold tracking-wide shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span>MIDDLESEX INNOVATIVE HUB • DUBAI</span>
              </div>

              {/* Title & Brand */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-bold tracking-widest text-[#7C3AED] uppercase">
                  MIH Social Deduction
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#2D264B] leading-[1.1]">
                  INNOVATION <span className="text-[#7C3AED]">IMPOSTER</span>
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-[#5B5282] pt-1">
                  &ldquo;Think fast. Give clues. Find the Imposter.&rdquo;
                </p>
              </div>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#5B5282] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Play solo, challenge your instincts, and discover who is hiding the secret.
                Jump right in against adaptive AI characters built around Middlesex Dubai&rsquo;s tech and startup themes.
              </p>

              {/* Call-to-action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('play')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <Play className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
                  <span>PLAY NOW</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('how-to-play')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F3E8FF] border border-[#DDD6FE] text-[#5B5282] font-semibold text-base transition-colors flex items-center justify-center gap-2 shadow-2xs"
                >
                  <BookOpen className="w-4 h-4 text-[#7C3AED]" />
                  <span>HOW TO PLAY</span>
                </button>

                <button
                  onClick={() => onNavigate('leaderboard')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F3E8FF] border border-[#DDD6FE] text-[#5B5282] font-semibold text-base transition-colors flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>LEADERBOARD</span>
                </button>
              </div>

              {/* QR Event Pill */}
              <div className="pt-2 flex items-center justify-center lg:justify-start">
                <button
                  onClick={onOpenQR}
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#6E6594] hover:text-[#7C3AED] transition-colors py-1 px-2.5 rounded-lg hover:bg-[#EDE9FE]/50"
                >
                  <QrCode className="w-4 h-4 text-[#7C3AED]" />
                  <span>Attending an MIH Event? Click to display the live Phone QR code</span>
                </button>
              </div>
            </div>

            {/* Right Graphic / Original Hero Illustration */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <HeroIllustration className="w-full max-w-md lg:max-w-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Solo Gameplay Modes Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#2D264B]">
            Two Distinct Solo Play Modes
          </h2>
          <p className="text-sm sm:text-base text-[#6E6594]">
            No waiting for other students or empty lobbies. Start instantly whenever inspiration strikes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mode 1: Solo Detective */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#ECE7FA] shadow-sm hover:border-[#DDD6FE] transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                Mode 01
              </span>
              <h3 className="text-xl font-bold font-display text-[#2D264B] mt-0.5">
                Solo Detective
              </h3>
            </div>
            <p className="text-sm text-[#5B5282] leading-relaxed">
              You receive the official secret innovation word. Study the clues generated by your AI companions. One of them is an Imposter bluffing their way through the conversation. Can you catch them?
            </p>
            <ul className="text-xs space-y-2 text-[#6E6594] pt-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                <span>Receive the secret word & evaluate bot clues</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                <span>Contribute your own clue to the discussion</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                <span>Earn 20 pts for catching the Imposter + 10 completion pts</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('play')}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-[#F8F7FC] hover:bg-[#EDE9FE] text-[#6D28D9] font-semibold text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Play Detective Mode</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mode 2: Solo Imposter */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#ECE7FA] shadow-sm hover:border-[#DDD6FE] transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FCE7F3] text-[#DB2777] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#DB2777]">
                Mode 02
              </span>
              <h3 className="text-xl font-bold font-display text-[#2D264B] mt-0.5">
                Solo Imposter
              </h3>
            </div>
            <p className="text-sm text-[#5B5282] leading-relaxed">
              You are assigned as the Imposter! You only know the category, not the secret word. Craft a believable clue to avoid suspicion while the computer-controlled players evaluate your testimony.
            </p>
            <ul className="text-xs space-y-2 text-[#6E6594] pt-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DB2777]" />
                <span>Analyze peer clues without blowing your cover</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DB2777]" />
                <span>Submit your typed clue into the simulated vote</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DB2777]" />
                <span>Survive the accusation to claim victory</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('play')}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-[#FDF2F8] hover:bg-[#FCE7F3] text-[#BE185D] font-semibold text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Play Imposter Mode</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Meet the AI Companions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Innovation Roster</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#2D264B]">
            Meet Your Computer-Controlled Opponents
          </h2>
          <p className="text-sm text-[#6E6594]">
            Each bot possesses an original personality and distinct clue-crafting style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BOTS.map(bot => (
            <div
              key={bot.id}
              className="p-5 rounded-2xl bg-white border border-[#ECE7FA] shadow-xs flex flex-col items-center text-center space-y-3 hover:shadow-md transition-shadow"
            >
              <BotAvatar id={bot.id} size="lg" showBadge />
              <div>
                <h4 className="font-bold text-base text-[#2D264B] font-display">{bot.name}</h4>
                <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F8F7FC] text-[#7C3AED] mt-1 border border-[#E2DCF8]">
                  {bot.difficultyRating} Difficulty
                </span>
              </div>
              <p className="text-xs text-[#5B5282] font-medium leading-relaxed">
                {bot.personality}
              </p>
              <div className="w-full pt-2 border-t border-[#F1EFF9] text-[11px] text-[#6E6594]">
                <span className="font-semibold text-[#4B416E]">Style:</span> {bot.clueStyle}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MIH Themes Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#EDE9FE] via-[#F3E8FF] to-[#FAF9FE] border border-[#DDD6FE] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#2D264B]">
              Rooted in Middlesex University Dubai
            </h3>
            <p className="text-sm text-[#5B5282] leading-relaxed">
              Explore 5 authentic word categories covering cutting-edge technology, entrepreneurship, university hackathons, future robotics, and MIH Innovation Hub activities.
            </p>
          </div>
          <button
            onClick={() => onNavigate('play')}
            className="shrink-0 px-6 py-3 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm shadow-xs transition-all flex items-center gap-2"
          >
            <span>Start a Round</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
