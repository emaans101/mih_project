export type GameMode = 'detective' | 'imposter';
export type Difficulty = 'easy' | 'medium' | 'hard';

export type WordCategory =
  | 'Technology'
  | 'Innovation'
  | 'University Life'
  | 'Future Technology'
  | 'MIH Activities';

export interface BotProfile {
  id: string;
  name: string;
  avatarColor: string;
  personality: string;
  clueStyle: string;
  difficultyRating: string;
  tagline: string;
  accent: string;
}

export interface ClueItem {
  playerId: string; // 'player' or bot id
  playerName: string;
  isPlayer: boolean;
  avatarColor: string;
  clue: string;
  timestamp: number;
  suspicionScore?: number;
}

export interface VoteRecord {
  voterId: string;
  voterName: string;
  isPlayer: boolean;
  targetId: string;
  targetName: string;
  reason?: string;
}

export interface GameRoundState {
  roundId: string;
  mode: GameMode;
  difficulty: Difficulty;
  category: WordCategory;
  secretWord: string; // Only shown to player if mode === 'detective'
  imposterId: string; // Bot ID or 'player'
  bots: BotProfile[];
  clues: ClueItem[];
  votes: VoteRecord[];
  isCompleted: boolean;
  playerWon?: boolean;
  playerVotedId?: string;
  scoreEarned?: number;
  scoreBreakdown?: {
    completionPoints: number;
    objectivePoints: number;
    difficultyBonus: number;
    total: number;
  };
}

export interface LeaderboardEntry {
  id: string;
  displayName: string;
  totalPoints: number;
  gamesCompleted: number;
  imposterWins: number;
  correctGuesses: number;
  updatedAt: string;
}

export interface RoundStartPayload {
  mode: GameMode;
  difficulty: Difficulty;
  playerName: string;
}

export interface RoundStartResponse {
  roundId: string;
  mode: GameMode;
  difficulty: Difficulty;
  category: WordCategory;
  secretWord?: string; // present only if detective
  role: 'detective' | 'imposter';
  bots: BotProfile[];
  turnOrder: string[]; // ['bot1', 'player', 'bot2', ...]
}

export interface SubmitScorePayload {
  roundId: string;
  playerName: string;
  mode: GameMode;
  difficulty: Difficulty;
  playerWon: boolean;
  correctGuess: boolean;
  imposterSurvived: boolean;
  score: number;
}
