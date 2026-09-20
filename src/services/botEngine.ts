import { BotProfile, Difficulty, VoteRecord, WordCategory } from '../types';
import { CATEGORY_BLUFFS, WordDefinition } from '../data/wordBank';

export function getBotClue(
  bot: BotProfile,
  wordDef: WordDefinition,
  isImposter: boolean,
  category: WordCategory
): string {
  const botKey = bot.id.toLowerCase() as 'nova' | 'byte' | 'lumi' | 'pixel';

  if (isImposter) {
    // Imposter bot bluff
    const bluffs = CATEGORY_BLUFFS[category]?.[botKey] || [
      "Crucial for our project success!",
      "Connected to the main topic."
    ];
    return bluffs[Math.floor(Math.random() * bluffs.length)];
  }

  // Regular bot clue
  const regularClues = wordDef.clues[botKey] || ["A core innovation concept."];
  return regularClues[Math.floor(Math.random() * regularClues.length)];
}

/**
 * Evaluates the player's clue in Solo Imposter mode.
 * Returns a suspicion score between 0 (very believable) and 100 (highly suspicious).
 */
export function evaluatePlayerClue(
  clue: string,
  category: WordCategory,
  secretWord: string,
  difficulty: Difficulty
): { suspicionScore: number; feedback: string } {
  const clean = clue.trim().toLowerCase();
  let score = 30; // base neutrality

  // 1. Length penalties
  if (clean.length < 5) {
    score += 45;
  } else if (clean.length < 12) {
    score += 20;
  } else if (clean.length > 20) {
    score -= 10;
  }

  // 2. Generic filler words check
  const genericWords = ['thing', 'stuff', 'good', 'nice', 'cool', 'it is', 'you know', 'something', 'fun', 'useful'];
  let genericMatches = 0;
  genericWords.forEach(w => {
    if (clean.includes(w)) genericMatches++;
  });
  score += genericMatches * 15;

  // 3. Category relevance
  const categoryTerms: Record<WordCategory, string[]> = {
    Technology: ['digital', 'computer', 'code', 'data', 'algorithm', 'system', 'network', 'cyber', 'tech', 'online', 'model', 'smart'],
    Innovation: ['idea', 'creative', 'build', 'startup', 'solution', 'change', 'new', 'market', 'vision', 'future', 'make', 'test'],
    'University Life': ['student', 'campus', 'team', 'class', 'learn', 'dubai', 'study', 'work', 'presentation', 'room', 'project'],
    'Future Technology': ['smart', 'future', 'robot', 'virtual', 'device', 'clean', 'auto', 'city', 'sensor', 'next', 'energy'],
    'MIH Activities': ['hub', 'challenge', 'mih', 'team', 'pitch', 'ideas', 'event', 'mentor', 'brainstorm', 'connect', 'show']
  };

  const relevantWords = categoryTerms[category] || [];
  let relevanceCount = 0;
  relevantWords.forEach(term => {
    if (clean.includes(term)) relevanceCount++;
  });

  if (relevanceCount >= 2) {
    score -= 25;
  } else if (relevanceCount === 1) {
    score -= 10;
  } else {
    score += 15;
  }

  // 4. Did the player accidentally say the exact word?
  if (clean.includes(secretWord.toLowerCase())) {
    // If imposter guessed the exact secret word, that's remarkably clever (or lucky)
    score = 5;
  }

  // 5. Difficulty scaling
  if (difficulty === 'easy') {
    score = Math.max(10, score - 20);
  } else if (difficulty === 'hard') {
    score = Math.min(95, score + 15);
  }

  // Clamp 0 to 100
  const finalScore = Math.max(5, Math.min(95, score));

  let feedback = "Your clue blended into the conversation well.";
  if (finalScore > 65) {
    feedback = "The bots sensed your clue was slightly vague or hesitated on specific terms.";
  } else if (finalScore < 30) {
    feedback = "The bots felt your clue was natural and confident!";
  }

  return { suspicionScore: finalScore, feedback };
}

/**
 * Simulates bot votes for Detective Mode.
 * Bots evaluate each other's clues. The imposter bot has higher chance of being voted by analytical bots.
 */
export function simulateDetectiveBotVotes(
  bots: BotProfile[],
  imposterId: string,
  difficulty: Difficulty,
  playerName: string
): VoteRecord[] {
  const votes: VoteRecord[] = [];

  bots.forEach(bot => {
    // Candidates are all other bots + player
    const candidates = bots.filter(b => b.id !== bot.id).map(b => ({ id: b.id, name: b.name }));
    candidates.push({ id: 'player', name: playerName });

    // Determining vote target
    let targetId: string;
    let targetName: string;
    let reason = '';

    const accuracyChance = difficulty === 'hard' ? 0.70 : difficulty === 'medium' ? 0.50 : 0.35;
    const targetsImposter = Math.random() < accuracyChance;

    if (bot.id === imposterId) {
      // Imposter bot deflects onto a random bot or player
      const innocentCandidates = candidates.filter(c => c.id !== imposterId);
      const chosen = innocentCandidates[Math.floor(Math.random() * innocentCandidates.length)];
      targetId = chosen.id;
      targetName = chosen.name;
      reason = `Deflecting: felt ${chosen.name}'s clue was contradictory.`;
    } else if (targetsImposter && imposterId !== 'player') {
      const imposterBot = bots.find(b => b.id === imposterId);
      targetId = imposterId;
      targetName = imposterBot?.name || 'Suspect';
      reason = `${bot.name} detected evasive phrasing in ${targetName}'s clue.`;
    } else {
      // Pick another suspect
      const other = candidates[Math.floor(Math.random() * candidates.length)];
      targetId = other.id;
      targetName = other.name;
      reason = `${bot.name} was unconvinced by ${targetName}'s clue presentation.`;
    }

    votes.push({
      voterId: bot.id,
      voterName: bot.name,
      isPlayer: false,
      targetId,
      targetName,
      reason
    });
  });

  return votes;
}

/**
 * Simulates bot votes for Imposter Mode (where the player is the imposter).
 * The player's suspicionScore dictates how many bots vote for the player!
 */
export function simulateImposterBotVotes(
  bots: BotProfile[],
  suspicionScore: number,
  playerName: string
): { votes: VoteRecord[]; playerCaught: boolean } {
  const votes: VoteRecord[] = [];
  let votesAgainstPlayer = 0;

  bots.forEach(bot => {
    // Probability of this specific bot voting for player based on bot personality & suspicion
    let voteProbability = suspicionScore / 100;

    if (bot.id === 'byte') {
      // Byte is stricter
      voteProbability = Math.min(0.95, voteProbability + 0.15);
    } else if (bot.id === 'lumi') {
      // Lumi is more forgiving / distracted
      voteProbability = Math.max(0.15, voteProbability - 0.20);
    } else if (bot.id === 'pixel') {
      voteProbability = Math.min(0.90, voteProbability + 0.05);
    }

    const votesPlayer = Math.random() < voteProbability;

    if (votesPlayer) {
      votesAgainstPlayer++;
      let reason = '';
      if (bot.id === 'byte') {
        reason = `Noticed lack of technical precision in ${playerName}'s clue.`;
      } else if (bot.id === 'pixel') {
        reason = `Analyzed phrasing pattern; felt ${playerName} gave a generic description.`;
      } else if (bot.id === 'nova') {
        reason = `Felt an unusual gap in ${playerName}'s conceptual imagery.`;
      } else {
        reason = `Had a suspicious gut feeling about ${playerName}!`;
      }

      votes.push({
        voterId: bot.id,
        voterName: bot.name,
        isPlayer: false,
        targetId: 'player',
        targetName: playerName,
        reason
      });
    } else {
      // Votes for another bot instead!
      const otherBots = bots.filter(b => b.id !== bot.id);
      const target = otherBots[Math.floor(Math.random() * otherBots.length)];
      votes.push({
        voterId: bot.id,
        voterName: bot.name,
        isPlayer: false,
        targetId: target.id,
        targetName: target.name,
        reason: `${bot.name} suspected ${target.name}'s clue was too cryptic.`
      });
    }
  });

  // Player is caught if majority of bots (2 or more out of 3 or 4) voted for player
  const playerCaught = votesAgainstPlayer >= Math.ceil(bots.length / 2);

  return { votes, playerCaught };
}
