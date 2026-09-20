import { LeaderboardEntry, RoundStartPayload, RoundStartResponse, SubmitScorePayload } from '../types';

const LOCAL_STORAGE_LEADERBOARD_KEY = 'mih_innovation_imposter_leaderboard';
const LOCAL_STORAGE_PLAYER_NAME = 'mih_player_display_name';

const INITIAL_SEED_LEADERBOARD: LeaderboardEntry[] = [
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

export function getSavedPlayerName(): string {
  try {
    return localStorage.getItem(LOCAL_STORAGE_PLAYER_NAME) || '';
  } catch {
    return '';
  }
}

export function savePlayerName(name: string): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_PLAYER_NAME, name.trim());
  } catch {
    // Ignore storage quota
  }
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const res = await fetch('/api/leaderboard');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Cache to local storage
        try {
          localStorage.setItem(LOCAL_STORAGE_LEADERBOARD_KEY, JSON.stringify(data));
        } catch {}
        return data;
      }
    }
  } catch (err) {
    console.warn('Using local fallback for leaderboard:', err);
  }

  // Fallback to local storage or initial seeds
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_LEADERBOARD_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}

  return INITIAL_SEED_LEADERBOARD;
}

export async function startServerRound(payload: RoundStartPayload): Promise<RoundStartResponse | null> {
  try {
    const res = await fetch('/api/round/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Using client-side round generation fallback:', err);
  }
  return null;
}

export async function submitScore(payload: SubmitScorePayload): Promise<{ success: boolean; leaderboard: LeaderboardEntry[] }> {
  try {
    const res = await fetch('/api/leaderboard/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.leaderboard) {
        try {
          localStorage.setItem(LOCAL_STORAGE_LEADERBOARD_KEY, JSON.stringify(data.leaderboard));
        } catch {}
        return { success: true, leaderboard: data.leaderboard };
      }
    }
  } catch (err) {
    console.warn('Network submission failed, syncing locally:', err);
  }

  // Local sync fallback
  const current = await fetchLeaderboard();
  const existingIdx = current.findIndex(e => e.displayName.toLowerCase() === payload.playerName.toLowerCase());
  
  if (existingIdx >= 0) {
    current[existingIdx].totalPoints += payload.score;
    current[existingIdx].gamesCompleted += 1;
    if (payload.correctGuess) current[existingIdx].correctGuesses += 1;
    if (payload.imposterSurvived) current[existingIdx].imposterWins += 1;
    current[existingIdx].updatedAt = new Date().toISOString();
  } else {
    current.push({
      id: 'local-' + Date.now(),
      displayName: payload.playerName,
      totalPoints: payload.score,
      gamesCompleted: 1,
      imposterWins: payload.imposterSurvived ? 1 : 0,
      correctGuesses: payload.correctGuess ? 1 : 0,
      updatedAt: new Date().toISOString()
    });
  }

  current.sort((a, b) => b.totalPoints - a.totalPoints);
  try {
    localStorage.setItem(LOCAL_STORAGE_LEADERBOARD_KEY, JSON.stringify(current));
  } catch {}

  return { success: true, leaderboard: current };
}
