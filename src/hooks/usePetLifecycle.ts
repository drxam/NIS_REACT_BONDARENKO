import { useEffect, useRef } from 'react';
import type { Pet, PetAction } from '../components/PetCard/types';

interface UsePetLifecycleProps {
  pet: Pet;
  dispatch: React.Dispatch<PetAction>;
}

export const usePetLifecycle = ({ pet, dispatch }: UsePetLifecycleProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const ENERGY_DECREASE_INTERVAL = 5000; // 5 секунд

  useEffect(() => {
    if (pet.energy <= 0) {
      return;
    }

    // Настроение влияет на скорость уменьшения энергии
    let decreaseAmount = 5; // нейтральное
    if (pet.mood === 'happy') {
      decreaseAmount = 3; // счастливые теряют меньше
    } else if (pet.mood === 'sad') {
      decreaseAmount = 7; // грустные теряют больше
    }

    intervalRef.current = setInterval(() => {
      dispatch({ type: 'DECREASE_ENERGY', payload: decreaseAmount });
    }, ENERGY_DECREASE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pet.energy, pet.mood, dispatch]);

  useEffect(() => {
    // Настроение автоматически меняется в зависимости от энергии
    let newMood: 'happy' | 'neutral' | 'sad' = pet.mood;

    if (pet.energy <= 25) {
      // При энергии <= 25% настроение становится грустным
      newMood = 'sad';
    } else if (pet.energy <= 50) {
      // При энергии <= 50% настроение становится нейтральным
      newMood = 'neutral';
    } else {
      // При энергии > 50% настроение становится счастливым
      newMood = 'happy';
    }

    if (newMood !== pet.mood) {
      dispatch({ type: 'SET_MOOD', payload: newMood });
    }
  }, [pet.energy, pet.mood, dispatch]);
};

