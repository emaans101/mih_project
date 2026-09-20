import { Shield, Target, Award, ArrowRight, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { BOTS } from '../data/bots';
import { BotAvatar } from '../components/BotAvatar';

interface HowToPlayPageProps {
  onStartPlay: () => void;
}

export function HowToPlayPage({ onStartPlay }: HowToPlayPageProps) {
  const steps = [
    {
      num: '01',
      title: 'Choose a Game Mode',
      desc: 'Pick Solo Detective to hunt down a computer imposter, or Solo Imposter to test your bluffing skills against the bots.'
    },
    {
      num: '02',
      title: 'Receive Your Secret Role',
      desc: 'Detectives receive the secret word (e.g., "Artificial Intelligence"). Imposters only receive the category and must blend in!'
    },
    {
      num: '03',
      title: 'Read Clues from AI Players',
      desc: 'Observe the clues provided by computer-controlled players like NOVA, BYTE, LUMI, and PIXEL. Look for evasive or overly generic phrasing.'
    },
    {
      num: '04',
      title: 'Give Your Own Clue',
      desc: 'Submit your own creative clue. If you are the Imposter, craft a statement that sounds knowledgeable without knowing the exact secret word.'
    },
    {
      num: '05',
      title: 'Cast Your Vote / Deliberate',
      desc: 'In Detective Mode, point your finger at the bot you believe is bluffing. In Imposter Mode, the AI companions deliberate and vote on you.'
    },
    {
      num: '06',
      title: 'View Results & Earn Points',
      desc: 'Discover the secret word, view the vote breakdown, earn points (+20 for winning, +10 for completion), and climb the public leaderboard!'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Game Guide & Rules</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#2D264B]">
          How to Play MIH Innovation Imposter
        </h1>
        <p className="text-sm sm:text-base text-[#5B5282]">
          A quick guide to mastering social deduction alone on your smartphone or desktop.
        </p>
      </div>

      {/* 6 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {steps.map(step => (
          <div
            key={step.num}
            className="p-6 rounded-3xl bg-white border border-[#ECE7FA] shadow-xs hover:border-[#DDD6FE] transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-extrabold font-display text-[#8B5CF6]">
                {step.num}
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#A78BFA]" />
            </div>
            <h3 className="font-bold text-base text-[#2D264B] font-display">
              {step.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6594] leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Mode Breakdown Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Detective Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#ECE7FA] shadow-xs space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-xs font-bold">
            <Shield className="w-4 h-4" />
            <span>SOLO DETECTIVE MODE</span>
          </div>
          <h3 className="text-xl font-bold font-display text-[#2D264B]">
            You are a Regular Player
          </h3>
          <p className="text-sm text-[#5B5282] leading-relaxed">
            You know the secret word. Three AI bots also know it, but one computer player is secretly assigned as the Imposter and received only the category.
          </p>
          <div className="p-4 rounded-2xl bg-[#F8F7FC] border border-[#E2DCF8] space-y-2 text-xs text-[#5B5282]">
            <div className="font-semibold text-[#2D264B]">Tips for Success:</div>
            <p>• Imposter bots give broad, evasive, or generalized clues.</p>
            <p>• Compare each clue against the secret word carefully.</p>
            <p>• Look at Byte and Pixel&rsquo;s analytical clues to cross-reference facts.</p>
          </div>
        </div>

        {/* Imposter Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#ECE7FA] shadow-xs space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE7F3] text-[#DB2777] text-xs font-bold">
            <Target className="w-4 h-4" />
            <span>SOLO IMPOSTER MODE</span>
          </div>
          <h3 className="text-xl font-bold font-display text-[#2D264B]">
            You are the Imposter
          </h3>
          <p className="text-sm text-[#5B5282] leading-relaxed">
            You do not receive the secret word! You only see the innovation category. The bots already know the word. When it is your turn, type a convincing clue to blend into the group.
          </p>
          <div className="p-4 rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] space-y-2 text-xs text-[#5B5282]">
            <div className="font-semibold text-[#2D264B]">Tips for Success:</div>
            <p>• Don&rsquo;t be overly brief or rely on &ldquo;it is a good thing&rdquo; filler.</p>
            <p>• Listen to previous bots before submitting your clue.</p>
            <p>• Use thematic words from the category (e.g., prototype, algorithm, Dubai campus).</p>
          </div>
        </div>
      </div>

      {/* Bot Profiles Guide */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#ECE7FA] shadow-xs space-y-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Personalities Guide</span>
          </div>
          <h3 className="text-xl font-bold font-display text-[#2D264B]">
            Understanding Your AI Companions
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BOTS.map(b => (
            <div key={b.id} className="p-4 rounded-2xl bg-[#FAF9FE] border border-[#ECE7FA] flex items-start gap-4">
              <BotAvatar id={b.id} size="md" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#2D264B] font-display">{b.name}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-[#DDD6FE] text-[#7C3AED]">
                    {b.difficultyRating}
                  </span>
                </div>
                <p className="text-xs text-[#5B5282]">{b.personality}</p>
                <p className="text-[11px] text-[#6E6594] italic">&ldquo;{b.tagline}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoring System */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FAF9FE] to-[#F3E8FF] border border-[#DDD6FE] space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#7C3AED]" />
          <h3 className="text-lg font-bold font-display text-[#2D264B]">
            Scoring & Leaderboard System
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-[#ECE7FA] space-y-1">
            <div className="font-bold text-sm text-[#7C3AED]">Round Completion</div>
            <div className="text-lg font-extrabold text-[#2D264B]">+10 Points</div>
            <p className="text-[#6E6594]">Awarded for every completed round regardless of outcome.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#ECE7FA] space-y-1">
            <div className="font-bold text-sm text-[#7C3AED]">Objective Win</div>
            <div className="text-lg font-extrabold text-[#2D264B]">+20 Points</div>
            <p className="text-[#6E6594]">Awarded for correctly identifying the Imposter or surviving as Imposter.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#ECE7FA] space-y-1">
            <div className="font-bold text-sm text-[#7C3AED]">Difficulty Multiplier</div>
            <div className="text-lg font-extrabold text-[#2D264B]">Up to +15 Bonus</div>
            <p className="text-[#6E6594]">Medium difficulty grants bonus pts; Hard difficulty grants highest reward.</p>
          </div>
        </div>
      </div>

      {/* Play CTA */}
      <div className="text-center pt-4">
        <button
          onClick={onStartPlay}
          className="px-8 py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-base shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 active:scale-95"
        >
          <span>Start Playing Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
