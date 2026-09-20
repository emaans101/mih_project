import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

interface StoredLeaderboardEntry {
  id: string;
  displayName: string;
  totalPoints: number;
  gamesCompleted: number;
  imposterWins: number;
  correctGuesses: number;
  updatedAt: string;
}

interface ActiveRound {
  roundId: string;
  playerName: string;
  mode: 'detective' | 'imposter';
  difficulty: 'easy' | 'medium' | 'hard';
  secretWord: string;
  imposterId: string;
  category: string;
  createdAt: number;
  completed: boolean;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADERBOARD_FILE = path.join(DATA_DIR, 'leaderboard.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data for MIH event
const DEFAULT_LEADERBOARD: StoredLeaderboardEntry[] = [
  {
    id: 'seed-1',
    displayName: 'Emaan',
    totalPoints: 250,
    gamesCompleted: 10,
    imposterWins: 4,
    correctGuesses: 7,
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'seed-2',
    displayName: 'Sara',
    totalPoints: 210,
    gamesCompleted: 8,
    imposterWins: 3,
    correctGuesses: 6,
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'seed-3',
    displayName: 'Ahmed',
    totalPoints: 185,
    gamesCompleted: 7,
    imposterWins: 2,
    correctGuesses: 5,
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    id: 'seed-4',
    displayName: 'Ali',
    totalPoints: 160,
    gamesCompleted: 6,
    imposterWins: 2,
    correctGuesses: 4,
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'seed-5',
    displayName: 'Zain',
    totalPoints: 140,
    gamesCompleted: 5,
    imposterWins: 1,
    correctGuesses: 4,
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

function loadLeaderboard(): StoredLeaderboardEntry[] {
  try {
    if (fs.existsSync(LEADERBOARD_FILE)) {
      const data = fs.readFileSync(LEADERBOARD_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading leaderboard file:', err);
  }
  return [...DEFAULT_LEADERBOARD];
}

function saveLeaderboard(entries: StoredLeaderboardEntry[]) {
  try {
    fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(entries, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing leaderboard file:', err);
  }
}

// In-memory active round registry to prevent duplicate/fake score submissions
const activeRounds = new Map<string, ActiveRound>();

// Cleanup stale rounds older than 1 hour
setInterval(() => {
  const oneHourAgo = Date.now() - 3600000;
  for (const [id, r] of activeRounds.entries()) {
    if (r.createdAt < oneHourAgo) {
      activeRounds.delete(id);
    }
  }
}, 600000);

const SAMPLE_CATEGORIES = [
  'Technology',
  'Innovation',
  'University Life',
  'Future Technology',
  'MIH Activities'
];

const BOTS = [
  {
    id: 'nova',
    name: 'NOVA',
    avatarColor: '#D8B4FE',
    accent: '#7C3AED',
    personality: 'Creative and imaginative thinker',
    clueStyle: 'Abstract & metaphorical clues',
    difficultyRating: 'Medium',
    tagline: 'Connects dots that others do not see.'
  },
  {
    id: 'byte',
    name: 'BYTE',
    avatarColor: '#BAE6FD',
    accent: '#0284C7',
    personality: 'Technical and systems-minded',
    clueStyle: 'Specific & algorithmic clues',
    difficultyRating: 'Hard',
    tagline: 'Looks for syntax errors in your explanation.'
  },
  {
    id: 'lumi',
    name: 'LUMI',
    avatarColor: '#FDE68A',
    accent: '#D97706',
    personality: 'Friendly, fast, and spontaneous',
    clueStyle: 'Short & punchy clues',
    difficultyRating: 'Easy',
    tagline: 'Trusts gut feelings and vibrant vibes.'
  },
  {
    id: 'pixel',
    name: 'PIXEL',
    avatarColor: '#BBF7D0',
    accent: '#16A34A',
    personality: 'Observant and detail-focused',
    clueStyle: 'Descriptive & analytical clues',
    difficultyRating: 'Medium',
    tagline: 'Examines each pixel of your story.'
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Get current shared leaderboard
  app.get('/api/leaderboard', (req, res) => {
    const list = loadLeaderboard();
    list.sort((a, b) => b.totalPoints - a.totalPoints);
    res.json(list);
  });

  // Generate round server-side for validated solo play
  app.post('/api/round/start', (req, res) => {
    const { mode, difficulty, playerName } = req.body;
    const cleanPlayerName = typeof playerName === 'string' && playerName.trim() ? playerName.trim().slice(0, 30) : 'Player';
    const cleanMode = mode === 'imposter' ? 'imposter' : 'detective';
    const cleanDifficulty = ['easy', 'hard'].includes(difficulty) ? difficulty : 'medium';

    const roundId = 'rnd_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    const category = SAMPLE_CATEGORIES[Math.floor(Math.random() * SAMPLE_CATEGORIES.length)];

    // If detective, choose one bot to be imposter
    // If imposter, the player is the imposter
    const imposterId = cleanMode === 'detective'
      ? BOTS[Math.floor(Math.random() * BOTS.length)].id
      : 'player';

    // Turn order includes bots and player in a natural sequence
    const turnOrder = ['nova', 'player', 'byte', 'lumi', 'pixel'];
    // Shuffle slightly
    turnOrder.sort(() => Math.random() - 0.5);

    activeRounds.set(roundId, {
      roundId,
      playerName: cleanPlayerName,
      mode: cleanMode,
      difficulty: cleanDifficulty,
      secretWord: '', // set by client/server word bank
      imposterId,
      category,
      createdAt: Date.now(),
      completed: false
    });

    res.json({
      roundId,
      mode: cleanMode,
      difficulty: cleanDifficulty,
      category,
      role: cleanMode,
      bots: BOTS,
      turnOrder
    });
  });

  // Submit round score with anti-abuse validation
  app.post('/api/leaderboard/submit', (req, res) => {
    const { roundId, playerName, mode, difficulty, playerWon, correctGuess, imposterSurvived, score } = req.body;

    const cleanPlayerName = typeof playerName === 'string' && playerName.trim()
      ? playerName.trim().slice(0, 30)
      : 'Player';

    // Verify round if registered
    if (roundId && activeRounds.has(roundId)) {
      const active = activeRounds.get(roundId)!;
      if (active.completed) {
        return res.status(400).json({ error: 'This round score was already recorded.' });
      }
      active.completed = true;
    }

    // Validate score bounds:
    // Base completion is 10, win is 20, difficulty multipliers max out at 50 per round
    const validScore = typeof score === 'number' && score > 0 && score <= 60 ? Math.round(score) : 10;

    const list = loadLeaderboard();
    const existingIdx = list.findIndex(e => e.displayName.toLowerCase() === cleanPlayerName.toLowerCase());

    if (existingIdx >= 0) {
      list[existingIdx].totalPoints += validScore;
      list[existingIdx].gamesCompleted += 1;
      if (correctGuess) list[existingIdx].correctGuesses += 1;
      if (imposterSurvived) list[existingIdx].imposterWins += 1;
      list[existingIdx].updatedAt = new Date().toISOString();
    } else {
      list.push({
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        displayName: cleanPlayerName,
        totalPoints: validScore,
        gamesCompleted: 1,
        imposterWins: imposterSurvived ? 1 : 0,
        correctGuesses: correctGuess ? 1 : 0,
        updatedAt: new Date().toISOString()
      });
    }

    list.sort((a, b) => b.totalPoints - a.totalPoints);
    saveLeaderboard(list);

    res.json({
      success: true,
      earnedScore: validScore,
      leaderboard: list
    });
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MIH Innovation Imposter Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
