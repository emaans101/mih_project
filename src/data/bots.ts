import { BotProfile } from '../types';

export const BOTS: BotProfile[] = [
  {
    id: 'nova',
    name: 'NOVA',
    avatarColor: '#D8B4FE', // Pastel lilac / purple
    accent: '#7C3AED',
    personality: 'Creative and imaginative thinker',
    clueStyle: 'Abstract & metaphorical clues',
    difficultyRating: 'Medium',
    tagline: 'Connects dots that others do not see.'
  },
  {
    id: 'byte',
    name: 'BYTE',
    avatarColor: '#BAE6FD', // Pastel sky blue
    accent: '#0284C7',
    personality: 'Technical and systems-minded',
    clueStyle: 'Specific & algorithmic clues',
    difficultyRating: 'Hard',
    tagline: 'Looks for syntax errors in your explanation.'
  },
  {
    id: 'lumi',
    name: 'LUMI',
    avatarColor: '#FDE68A', // Pastel warm amber
    accent: '#D97706',
    personality: 'Friendly, fast, and spontaneous',
    clueStyle: 'Short & punchy clues',
    difficultyRating: 'Easy',
    tagline: 'Trusts gut feelings and vibrant vibes.'
  },
  {
    id: 'pixel',
    name: 'PIXEL',
    avatarColor: '#BBF7D0', // Pastel mint green
    accent: '#16A34A',
    personality: 'Observant and detail-focused',
    clueStyle: 'Descriptive & analytical clues',
    difficultyRating: 'Medium',
    tagline: 'Examines each pixel of your story.'
  }
];

export function getBotById(id: string): BotProfile | undefined {
  return BOTS.find(b => b.id === id);
}
