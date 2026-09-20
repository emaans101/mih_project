import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Shield,
  Target,
  Send,
  Trophy,
  RotateCcw,
  Sparkles,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Award,
  Zap,
  Home
} from 'lucide-react';
import { Difficulty, GameMode, GameRoundState, WordCategory } from '../types';
import { BOTS } from '../data/bots';
import { getRandomWord } from '../data/wordBank';
import {
  evaluatePlayerClue,
  getBotClue,
  simulateDetectiveBotVotes,
  simulateImposterBotVotes
} from '../services/botEngine';
import { savePlayerName, startServerRound, submitScore } from '../services/api';
import { BotAvatar } from '../components/BotAvatar';

interface GamePageProps {
  playerName: string;
  onUpdatePlayerName: (name: string) => void;
  onNavigate: (page: 'home' | 'how-to-play' | 'leaderboard' | 'play') => void;
}

type Step = 'setup' | 'briefing' | 'clues' | 'voting' | 'results';

export function GamePage({ playerName, onUpdatePlayerName, onNavigate }: GamePageProps) {
  // Setup selections
  const [nameInput, setNameInput] = useState(playerName || '');
  const [mode, setMode] = useState<GameMode>('detective');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  // Game flow step
  const [currentStep, setCurrentStep] = useState<Step>('setup');

  // Active round state
  const [roundState, setRoundState] = useState<GameRoundState | null>(null);

  // Clue phase state
  const [playerClueInput, setPlayerClueInput] = useState('');
  const [hasPlayerSubmittedClue, setHasPlayerSubmittedClue] = useState(false);
  const [isBotRevealing, setIsBotRevealing] = useState(false);
  const [activeBotIndex, setActiveBotIndex] = useState(0);

  // Voting phase state
  const [selectedSuspectId, setSelectedSuspectId] = useState<string | null>(null);
  const [isSubmittingVote, setIsSubmittingVote] = useState(false);

  // Submission / Score state
  const [scoreEarned, setScoreEarned] = useState<number>(0);
  const [scoreMessage, setScoreMessage] = useState<string>('');

  // Sync player name changes to storage
  const handleNameChange = (newName: string) => {
    setNameInput(newName);
    onUpdatePlayerName(newName);
    savePlayerName(newName);
  };

  // Launch a new round
  const handleStartRound = async () => {
    const finalPlayerName = nameInput.trim() || 'Player';
    handleNameChange(finalPlayerName);

    // Pick random category and secret word
    const wordDef = getRandomWord();
    const category: WordCategory = wordDef.category;
    const secretWord = wordDef.word;

    // Determine imposter:
    // If detective, choose one bot randomly
    // If imposter, the player is the imposter
    const activeBots = [...BOTS];
    const imposterId = mode === 'detective'
      ? activeBots[Math.floor(Math.random() * activeBots.length)].id
      : 'player';

    // Try server round start
    const serverRound = await startServerRound({
      mode,
      difficulty,
      playerName: finalPlayerName
    });

    const roundId = serverRound?.roundId || 'local_' + Date.now();

    const newRound: GameRoundState = {
      roundId,
      mode,
      difficulty,
      category,
      secretWord,
      imposterId,
      bots: activeBots,
      clues: [],
      votes: [],
      isCompleted: false
    };

    setRoundState(newRound);
    setPlayerClueInput('');
    setHasPlayerSubmittedClue(false);
    setSelectedSuspectId(null);
    setCurrentStep('briefing');
  };

  // Move from Briefing to Clues phase
  const handleProceedToClues = () => {
    if (!roundState) return;

    // Generate initial bot clues
    const wordDef = getRandomWord(roundState.category); // Match category
    // In detective mode, find exact word matching roundState.secretWord if possible
    // We already have roundState.secretWord

    // Generate all bot clues
    const generatedClues = roundState.bots.map(bot => {
      const isImposter = bot.id === roundState.imposterId;
      const clueText = getBotClue(bot, { word: roundState.secretWord, category: roundState.category, clues: (wordDef.clues as any) }, isImposter, roundState.category);
      return {
        playerId: bot.id,
        playerName: bot.name,
        isPlayer: false,
        avatarColor: bot.avatarColor,
        clue: clueText,
        timestamp: Date.now()
      };
    });

    setRoundState(prev => prev ? { ...prev, clues: generatedClues } : null);
    setCurrentStep('clues');
  };

  // Player submits their clue
  const handlePlayerSubmitClue = () => {
    if (!playerClueInput.trim() || !roundState) return;

    const newClueItem = {
      playerId: 'player',
      playerName: nameInput || 'You',
      isPlayer: true,
      avatarColor: '#EDE9FE',
      clue: playerClueInput.trim(),
      timestamp: Date.now()
    };

    setRoundState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        clues: [...prev.clues, newClueItem]
      };
    });

    setHasPlayerSubmittedClue(true);
  };

  // Proceed to Voting phase
  const handleProceedToVoting = () => {
    setCurrentStep('voting');
  };

  // Resolve Round & Submit Votes
  const handleFinalizeVotes = async (votedTargetId: string) => {
    if (!roundState) return;
    setIsSubmittingVote(true);

    let playerWon = false;
    let correctGuess = false;
    let imposterSurvived = false;
    let votes: any[] = [];
    let suspicionFeedback = '';

    if (roundState.mode === 'detective') {
      // Player casts vote for votedTargetId
      correctGuess = votedTargetId === roundState.imposterId;
      playerWon = correctGuess;

      // Simulate bot votes
      const botVotes = simulateDetectiveBotVotes(
        roundState.bots,
        roundState.imposterId,
        roundState.difficulty,
        nameInput || 'You'
      );

      // Include player's vote
      const suspectName = roundState.bots.find(b => b.id === votedTargetId)?.name || 'Suspect';
      votes = [
        {
          voterId: 'player',
          voterName: nameInput || 'You',
          isPlayer: true,
          targetId: votedTargetId,
          targetName: suspectName,
          reason: 'Voted based on clue inconsistency.'
        },
        ...botVotes
      ];
    } else {
      // Imposter mode: Evaluate player clue & bots vote!
      const playerClue = playerClueInput || 'A relevant innovation development.';
      const evaluation = evaluatePlayerClue(
        playerClue,
        roundState.category,
        roundState.secretWord,
        roundState.difficulty
      );

      suspicionFeedback = evaluation.feedback;
      const simulation = simulateImposterBotVotes(
        roundState.bots,
        evaluation.suspicionScore,
        nameInput || 'You'
      );

      votes = simulation.votes;
      imposterSurvived = !simulation.playerCaught;
      playerWon = imposterSurvived;
    }

    // Calculate score
    const completionPoints = 10;
    const objectivePoints = playerWon ? 20 : 0;
    const difficultyMultiplier = roundState.difficulty === 'hard' ? 15 : roundState.difficulty === 'medium' ? 5 : 0;
    const totalScore = completionPoints + objectivePoints + difficultyMultiplier;

    const breakdown = {
      completionPoints,
      objectivePoints,
      difficultyBonus: difficultyMultiplier,
      total: totalScore
    };

    setScoreEarned(totalScore);
    setScoreMessage(
      playerWon
        ? roundState.mode === 'detective'
          ? 'Brilliant deduction! You spotted the Imposter.'
          : 'Flawless bluff! You convinced the bots and survived.'
        : roundState.mode === 'detective'
          ? 'The Imposter slipped past! Better luck next round.'
          : 'The bots caught onto your clue! Practice makes perfect.'
    );

    // Confetti on win
    if (playerWon) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }

    // Submit score securely to server
    await submitScore({
      roundId: roundState.roundId,
      playerName: nameInput || 'Player',
      mode: roundState.mode,
      difficulty: roundState.difficulty,
      playerWon,
      correctGuess,
      imposterSurvived,
      score: totalScore
    });

    setRoundState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        votes,
        isCompleted: true,
        playerWon,
        playerVotedId: votedTargetId,
        scoreEarned: totalScore,
        scoreBreakdown: breakdown
      };
    });

    setIsSubmittingVote(false);
    setCurrentStep('results');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* STEP 1: SETUP (NAME, MODE, DIFFICULTY) */}
      {currentStep === 'setup' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE7FA] shadow-xs space-y-8 animate-in fade-in duration-200">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Instant Solo Play</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2D264B]">
              Configure Your Round
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6594]">
              Enter your student nickname, select a mode, and face off against MIH AI companions.
            </p>
          </div>

          {/* Player Name Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#4B416E] uppercase tracking-wider">
              1. Your Display Name / Nickname
            </label>
            <input
              type="text"
              maxLength={24}
              placeholder="e.g., Emaan, Hamza, TechExplorer"
              value={nameInput}
              onChange={e => handleNameChange(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F8F7FC] border border-[#E2DCF8] focus:bg-white focus:outline-hidden focus:border-[#7C3AED] text-[#2D264B] text-sm font-medium transition-colors"
            />
            <p className="text-[11px] text-[#6E6594]">
              Used for your public leaderboard ranking. No account creation required.
            </p>
          </div>

          {/* Mode Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-[#4B416E] uppercase tracking-wider">
              2. Choose Game Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setMode('detective')}
                className={`p-5 rounded-2xl border text-left transition-all relative ${
                  mode === 'detective'
                    ? 'bg-[#F5F3FF] border-[#7C3AED] shadow-sm'
                    : 'bg-[#FAF9FE] border-[#ECE7FA] hover:border-[#DDD6FE]'
                }`}
              >
                {mode === 'detective' && (
                  <CheckCircle2 className="w-5 h-5 text-[#7C3AED] absolute top-4 right-4" />
                )}
                <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-[#2D264B] font-display">
                  Solo Detective
                </h4>
                <p className="text-xs text-[#6E6594] mt-1 leading-relaxed">
                  You know the secret word. Find the AI Imposter bluffing among your companions.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setMode('imposter')}
                className={`p-5 rounded-2xl border text-left transition-all relative ${
                  mode === 'imposter'
                    ? 'bg-[#FFF1F2] border-[#DB2777] shadow-sm'
                    : 'bg-[#FAF9FE] border-[#ECE7FA] hover:border-[#DDD6FE]'
                }`}
              >
                {mode === 'imposter' && (
                  <CheckCircle2 className="w-5 h-5 text-[#DB2777] absolute top-4 right-4" />
                )}
                <div className="w-10 h-10 rounded-xl bg-[#FCE7F3] text-[#DB2777] flex items-center justify-center mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-[#2D264B] font-display">
                  Solo Imposter
                </h4>
                <p className="text-xs text-[#6E6594] mt-1 leading-relaxed">
                  You don&rsquo;t know the secret word. Give a convincing clue and avoid detection!
                </p>
              </button>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-[#4B416E] uppercase tracking-wider">
              3. Select Difficulty
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map(diff => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`py-3 px-3 rounded-xl border text-center transition-all capitalize text-xs sm:text-sm font-semibold ${
                    difficulty === diff
                      ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-xs'
                      : 'bg-[#F8F7FC] text-[#5B5282] border-[#E2DCF8] hover:bg-[#EDE9FE]'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#6E6594] text-center">
              {difficulty === 'easy' && 'Bots are forgiving; clues are more transparent.'}
              {difficulty === 'medium' && 'Balanced deduction with authentic bot clue styles (+5 bonus pts).'}
              {difficulty === 'hard' && 'Bots are sharp and penalize vague clues (+15 bonus pts).'}
            </p>
          </div>

          {/* Start Round CTA */}
          <button
            onClick={handleStartRound}
            className="w-full py-4 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Start Game Round</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* STEP 2: SECRET BRIEFING */}
      {currentStep === 'briefing' && roundState && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE7FA] shadow-xs space-y-6 text-center animate-in fade-in duration-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>CONFIDENTIAL BRIEFING</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2D264B]">
              Your Assigned Role
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6594]">
              Review your mission before meeting your AI companions.
            </p>
          </div>

          {/* Role Card */}
          {roundState.mode === 'detective' ? (
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#F5F3FF] to-[#FAF8FF] border-2 border-[#DDD6FE] space-y-4 max-w-md mx-auto shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] text-[#7C3AED] mx-auto flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
                  ROLE: REGULAR PLAYER (DETECTIVE)
                </span>
                <div className="text-xs text-[#6E6594] mt-1">Category: <span className="font-semibold text-[#2D264B]">{roundState.category}</span></div>
                <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#7C3AED] mt-3">
                  &ldquo;{roundState.secretWord}&rdquo;
                </div>
              </div>
              <p className="text-xs text-[#5B5282] leading-relaxed pt-2">
                Remember this word! 3 of the bots have received this word as well. One computer player has been secretly assigned as the Imposter and only knows the category.
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#FFF1F2] to-[#FFF8F9] border-2 border-[#FECDD3] space-y-4 max-w-md mx-auto shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#FCE7F3] text-[#DB2777] mx-auto flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#DB2777] uppercase tracking-wider">
                  ROLE: THE IMPOSTER
                </span>
                <div className="text-xs text-[#6E6594] mt-1">Theme: <span className="font-semibold text-[#2D264B]">{roundState.category}</span></div>
                <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#DB2777] mt-3">
                  SECRET WORD UNKNOWN
                </div>
              </div>
              <p className="text-xs text-[#5B5282] leading-relaxed pt-2">
                You do NOT know the secret word! The bots do. Read their clues carefully, and when prompted, submit a clever clue that sounds connected to the category so they don&rsquo;t vote you out!
              </p>
            </div>
          )}

          {/* AI Roster Preview */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-[#6E6594] mb-3">Opponents in this round:</p>
            <div className="flex items-center justify-center gap-3">
              {roundState.bots.map(bot => (
                <div key={bot.id} className="flex flex-col items-center gap-1">
                  <BotAvatar id={bot.id} size="sm" />
                  <span className="text-[10px] font-bold text-[#4B416E]">{bot.name}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleProceedToClues}
            className="w-full max-w-md mx-auto py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Proceed to Clue Phase</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 3: CLUES PHASE */}
      {currentStep === 'clues' && roundState && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Status Header */}
          <div className="bg-white rounded-3xl p-5 border border-[#ECE7FA] shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-[#6E6594]">
                Category: <span className="text-[#2D264B] font-bold">{roundState.category}</span>
              </div>
              <div className="text-sm font-bold text-[#2D264B] font-display">
                {roundState.mode === 'detective' ? (
                  <span>Secret Word: <span className="text-[#7C3AED]">&ldquo;{roundState.secretWord}&rdquo;</span></span>
                ) : (
                  <span className="text-[#DB2777]">You are the Imposter (Word Hidden)</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] font-semibold">
                {roundState.difficulty} mode
              </span>
            </div>
          </div>

          {/* Clues Feed */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#4B416E] uppercase tracking-wider px-1">
              Round Discussion Feed
            </h3>

            <div className="space-y-3">
              {roundState.clues.map((clue, idx) => (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    clue.isPlayer
                      ? 'bg-[#F3E8FF] border-[#DDD6FE] ml-4 sm:ml-10'
                      : 'bg-white border-[#ECE7FA] mr-4 sm:mr-10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <BotAvatar id={clue.playerId} size="sm" />
                    <div>
                      <span className="text-xs font-bold text-[#2D264B] font-display">
                        {clue.playerName}
                      </span>
                      {clue.isPlayer && (
                        <span className="ml-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#7C3AED] text-white">
                          YOU
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#2D264B] leading-relaxed font-medium pl-10">
                    &ldquo;{clue.clue}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Player Clue Input Section */}
          {!hasPlayerSubmittedClue ? (
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#ECE7FA] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#4B416E] uppercase tracking-wider">
                  {roundState.mode === 'detective' ? 'Contribute Your Detective Clue' : 'Give Your Imposter Clue'}
                </label>
                <span className="text-[11px] text-[#6E6594]">
                  {roundState.mode === 'detective' ? 'Help peers verify you' : 'Sound confident & relevant!'}
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={100}
                  placeholder={
                    roundState.mode === 'detective'
                      ? 'Type a subtle clue about the secret word...'
                      : 'Type a convincing statement about this innovation topic...'
                  }
                  value={playerClueInput}
                  onChange={e => setPlayerClueInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handlePlayerSubmitClue();
                  }}
                  className="flex-1 px-4 py-3 rounded-2xl bg-[#F8F7FC] border border-[#E2DCF8] focus:bg-white focus:outline-hidden focus:border-[#7C3AED] text-sm text-[#2D264B]"
                />
                <button
                  onClick={handlePlayerSubmitClue}
                  disabled={!playerClueInput.trim()}
                  className="px-5 py-3 rounded-2xl bg-[#7C3AED] disabled:opacity-50 text-white font-semibold text-sm transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send Clue</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#FAF9FE] rounded-2xl p-4 border border-[#E2DCF8] text-center space-y-3">
              <div className="text-xs font-semibold text-emerald-700 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>All players and AI bots have delivered their clues!</span>
              </div>
              <button
                onClick={handleProceedToVoting}
                className="px-6 py-3 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 active:scale-95"
              >
                <span>Proceed to Voting & Accusation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: VOTING PHASE */}
      {currentStep === 'voting' && roundState && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE7FA] shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-xs font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>DELIBERATION & VOTING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2D264B]">
              {roundState.mode === 'detective' ? 'Who is the Imposter?' : 'Bots Are Deliberating'}
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6594] max-w-md mx-auto">
              {roundState.mode === 'detective'
                ? 'Select the bot whose clue seemed overly broad, evasive, or unaligned with the secret word.'
                : 'The AI companions are analyzing your clue against the secret word to decide if you are an imposter.'}
            </p>
          </div>

          {/* Quick Clue Reference */}
          <div className="p-4 rounded-2xl bg-[#FAF9FE] border border-[#ECE7FA] space-y-2 text-xs">
            <span className="font-bold text-[#4B416E]">Clue Summary:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#5B5282]">
              {roundState.clues.map((c, i) => (
                <div key={i} className="truncate">
                  <span className="font-semibold text-[#2D264B]">{c.playerName}:</span> &ldquo;{c.clue}&rdquo;
                </div>
              ))}
            </div>
          </div>

          {/* Detective Mode: Select Suspect */}
          {roundState.mode === 'detective' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roundState.bots.map(bot => (
                  <button
                    key={bot.id}
                    type="button"
                    onClick={() => setSelectedSuspectId(bot.id)}
                    className={`p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all ${
                      selectedSuspectId === bot.id
                        ? 'bg-[#F3E8FF] border-[#7C3AED] shadow-sm ring-2 ring-[#8B5CF6]/30'
                        : 'bg-white border-[#ECE7FA] hover:border-[#DDD6FE]'
                    }`}
                  >
                    <BotAvatar id={bot.id} size="md" />
                    <div className="flex-1">
                      <div className="font-bold text-sm text-[#2D264B] font-display">
                        {bot.name}
                      </div>
                      <div className="text-xs text-[#6E6594]">{bot.personality}</div>
                    </div>
                    {selectedSuspectId === bot.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#7C3AED]" />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() => selectedSuspectId && handleFinalizeVotes(selectedSuspectId)}
                disabled={!selectedSuspectId || isSubmittingVote}
                className="w-full py-3.5 rounded-2xl bg-[#7C3AED] disabled:opacity-50 hover:bg-[#6D28D9] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmittingVote ? 'Tallying Votes...' : 'Confirm Accusation'}
              </button>
            </div>
          ) : (
            // Imposter Mode: Simulation CTA
            <div className="text-center space-y-4 py-4">
              <div className="flex items-center justify-center gap-4">
                {roundState.bots.map(b => (
                  <div key={b.id} className="animate-pulse flex flex-col items-center gap-1">
                    <BotAvatar id={b.id} size="md" />
                    <span className="text-xs font-bold text-[#4B416E]">{b.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#6E6594]">
                Byte is checking vocabulary syntax, Nova is reviewing conceptual metaphor, and Lumi is voting on instinct...
              </p>
              <button
                onClick={() => handleFinalizeVotes('player')}
                disabled={isSubmittingVote}
                className="px-8 py-3.5 rounded-2xl bg-[#DB2777] hover:bg-[#BE185D] text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
              >
                {isSubmittingVote ? 'Evaluating...' : 'Simulate Bot Voting'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 5: RESULTS & SCORE BREAKDOWN */}
      {currentStep === 'results' && roundState && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE7FA] shadow-xs space-y-8 animate-in fade-in duration-200">
          {/* Outcome Hero */}
          <div className="text-center space-y-3">
            <div className={`w-16 h-16 rounded-3xl mx-auto flex items-center justify-center ${
              roundState.playerWon ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
            }`}>
              {roundState.playerWon ? <Trophy className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            </div>

            <div className="space-y-1">
              <span className={`text-xs font-bold uppercase tracking-wider ${
                roundState.playerWon ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {roundState.playerWon ? 'VICTORY' : 'ROUND FINISHED'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2D264B]">
                {scoreMessage}
              </h2>
            </div>
          </div>

          {/* Secret Word & Imposter Revealed */}
          <div className="p-5 rounded-2xl bg-[#FAF9FE] border border-[#E2DCF8] grid grid-cols-1 sm:grid-cols-2 gap-4 text-center sm:text-left">
            <div>
              <span className="text-xs font-semibold text-[#6E6594]">Secret Word</span>
              <div className="text-xl font-bold text-[#7C3AED] font-display">
                {roundState.secretWord}
              </div>
              <div className="text-xs text-[#5B5282]">Category: {roundState.category}</div>
            </div>

            <div>
              <span className="text-xs font-semibold text-[#6E6594]">The Real Imposter Was</span>
              <div className="text-xl font-bold text-[#2D264B] font-display flex items-center justify-center sm:justify-start gap-2 mt-0.5">
                {roundState.imposterId === 'player' ? (
                  <span className="text-[#DB2777]">You! (Solo Imposter Mode)</span>
                ) : (
                  <>
                    <BotAvatar id={roundState.imposterId} size="sm" />
                    <span>{roundState.bots.find(b => b.id === roundState.imposterId)?.name}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Vote Distribution */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#4B416E] uppercase tracking-wider">
              Voting Record & Bot Reasoning
            </h4>
            <div className="space-y-2">
              {roundState.votes.map((vote, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-[#F8F7FC] border border-[#ECE7FA] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#2D264B]">{vote.voterName}</span>
                    <span className="text-[#6E6594]">voted for</span>
                    <span className="font-bold text-[#7C3AED] px-2 py-0.5 rounded-md bg-white border border-[#DDD6FE]">
                      {vote.targetName}
                    </span>
                  </div>
                  {vote.reason && (
                    <span className="text-[#6E6594] italic text-[11px]">
                      &ldquo;{vote.reason}&rdquo;
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Score Calculation Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#EDE9FE] to-[#FAF9FE] border border-[#DDD6FE] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#5B5282]">Points Earned This Round</span>
              <div className="text-xs text-[#6E6594]">
                Completion: +10 • Objective: +{roundState.playerWon ? 20 : 0} • Bonus: +{roundState.scoreBreakdown?.difficultyBonus || 0}
              </div>
            </div>
            <div className="text-3xl font-extrabold font-display text-[#7C3AED]">
              +{scoreEarned} <span className="text-xs font-normal">pts</span>
            </div>
          </div>

          {/* Next Round Action Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleStartRound}
              className="py-3.5 px-4 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>PLAY AGAIN</span>
            </button>

            <button
              onClick={() => setCurrentStep('setup')}
              className="py-3.5 px-4 rounded-xl bg-white hover:bg-[#F3E8FF] border border-[#DDD6FE] text-[#5B5282] font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#7C3AED]" />
              <span>CHANGE MODE / DIFFICULTY</span>
            </button>

            <button
              onClick={() => onNavigate('leaderboard')}
              className="py-3.5 px-4 rounded-xl bg-white hover:bg-[#F3E8FF] border border-[#DDD6FE] text-[#5B5282] font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>VIEW PUBLIC LEADERBOARD</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="py-3.5 px-4 rounded-xl bg-white hover:bg-[#F3E8FF] border border-[#DDD6FE] text-[#5B5282] font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4 text-[#7C3AED]" />
              <span>RETURN HOME</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
