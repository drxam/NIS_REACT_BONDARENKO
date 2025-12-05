export type Pet = {
  id: number;
  name: string;
  species: string;
  mood: 'happy' | 'neutral' | 'sad';
  energy: number;
  level: number;
  avatar: string;
};

export type PetState = Pet;

export type PetAction =
  | { type: 'FEED'; payload: number }
  | { type: 'LEVEL_UP' }
  | { type: 'CHEER' }
  | { type: 'RESET'; payload: Pet }
  | { type: 'DECREASE_ENERGY'; payload: number }
  | { type: 'SET_MOOD'; payload: 'happy' | 'neutral' | 'sad' };

