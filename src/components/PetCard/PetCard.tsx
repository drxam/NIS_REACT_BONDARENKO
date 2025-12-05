import React, { useReducer, useCallback, useRef, useEffect, memo } from 'react';
import type { Pet, PetState, PetAction } from './types';
import { usePetLifecycle } from '../../hooks/usePetLifecycle';
import { useEventLog } from '../../hooks/useEventLog';
import { ActionButton } from '../PetActions/ActionButton.styled';
import styles from './PetCard.module.scss';

const initialState = (pet: Pet): PetState => ({ ...pet });

const petReducer = (state: PetState, action: PetAction): PetState => {
  switch (action.type) {
    case 'FEED':
      return {
        ...state,
        energy: Math.min(100, state.energy + action.payload),
      };
    case 'LEVEL_UP':
      // Повышение уровня требует минимум 50 энергии и снимает 40 энергии
      if (state.energy >= 50) {
        return {
          ...state,
          level: state.level + 1,
          energy: Math.max(0, state.energy - 40),
        };
      }
      return state;
    case 'CHEER':
      // Поддержка улучшает настроение на один уровень
      let improvedMood: 'happy' | 'neutral' | 'sad' = state.mood;
      if (state.mood === 'sad') {
        improvedMood = 'neutral';
      } else if (state.mood === 'neutral') {
        improvedMood = 'happy';
      }
      // Счастливые остаются счастливыми, но получают небольшой бонус
      return {
        ...state,
        mood: improvedMood,
        energy: Math.min(100, state.energy + (state.mood === 'happy' ? 3 : 5)),
      };
    case 'RESET':
      return initialState(action.payload);
    case 'DECREASE_ENERGY':
      return {
        ...state,
        energy: Math.max(0, state.energy - action.payload),
      };
    case 'SET_MOOD':
      return {
        ...state,
        mood: action.payload,
      };
    default:
      return state;
  }
};

interface PetCardProps {
  pet: Pet;
}

const PetCardComponent: React.FC<PetCardProps> = ({ pet }) => {
  const [state, dispatch] = useReducer(petReducer, pet, initialState);
  const { addEvent } = useEventLog();
  const avatarRef = useRef<HTMLDivElement>(null);

  usePetLifecycle({ pet: state, dispatch });

  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.style.transform = 'scale(1)';
      setTimeout(() => {
        if (avatarRef.current) {
          avatarRef.current.style.transform = 'scale(1.1)';
        }
      }, 100);
    }
  }, [state.mood]);

  const handleFeed = useCallback(() => {
    dispatch({ type: 'FEED', payload: 20 });
    addEvent(`${state.name} покормлен! Энергия +20`);
  }, [state.name, addEvent]);

  const handleLevelUp = useCallback(() => {
    if (state.energy >= 50) {
      dispatch({ type: 'LEVEL_UP' });
      addEvent(`${state.name} повысил уровень! Теперь уровень ${state.level + 1}. Энергия -40`);
    } else {
      addEvent(`${state.name} слишком устал для повышения уровня! Нужно минимум 50% энергии.`);
    }
  }, [state.name, state.level, state.energy, addEvent, dispatch]);

  const handleCheer = useCallback(() => {
    const oldMood = state.mood;
    dispatch({ type: 'CHEER' });
    let moodText = '';
    let energyBonus = 0;
    if (oldMood === 'sad') {
      moodText = 'улучшено до нейтрального';
      energyBonus = 5;
    } else if (oldMood === 'neutral') {
      moodText = 'улучшено до счастливого';
      energyBonus = 5;
    } else {
      moodText = 'остаётся счастливым';
      energyBonus = 3;
    }
    addEvent(`${state.name} получил поддержку! Настроение ${moodText}. Энергия +${energyBonus}. Теперь энергия уменьшается медленнее!`);
  }, [state.name, state.mood, addEvent, dispatch]);

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET', payload: pet });
    addEvent(`${state.name} сброшен до исходного состояния`);
  }, [pet, state.name, addEvent]);

  const getMoodShadow = () => {
    switch (state.mood) {
      case 'happy':
        return '0 8px 24px rgba(76, 175, 80, 0.4)';
      case 'neutral':
        return '0 8px 24px rgba(255, 193, 7, 0.4)';
      case 'sad':
        return '0 8px 24px rgba(244, 67, 54, 0.4)';
      default:
        return '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
  };

  const isDisabled = state.energy <= 0;
  const canLevelUp = state.energy >= 50;

  return (
    <div
      className={`${styles.petCard} ${isDisabled ? styles.disabled : ''}`}
      style={{ boxShadow: getMoodShadow() }}
    >
      <div className={styles.header}>
        <div>
          <h3 className={styles.name}>{state.name}</h3>
          <p className={styles.species}>{state.species}</p>
        </div>
        <div className={styles.level}>Ур. {state.level}</div>
      </div>

      <div ref={avatarRef} className={styles.avatar} style={{ transition: 'transform 0.3s ease' }}>
        {state.avatar}
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span>Энергия:</span>
          <span>{state.energy}%</span>
        </div>
        <div className={styles.statItem}>
          <span>Настроение:</span>
          <span>
            {state.mood === 'happy' ? '😊 Счастлив' : state.mood === 'neutral' ? '😐 Нейтрально' : '😢 Грустен'}
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <ActionButton variant="primary" onClick={handleFeed} disabled={isDisabled}>
          Покормить
        </ActionButton>
        <ActionButton variant="secondary" onClick={handleLevelUp} disabled={isDisabled || !canLevelUp}>
          Повысить уровень {!canLevelUp && '(нужно 50% энергии)'}
        </ActionButton>
        <ActionButton variant="secondary" onClick={handleCheer} disabled={isDisabled}>
          Поддержать
        </ActionButton>
        <ActionButton 
          variant="danger" 
          onClick={handleReset}
          style={isDisabled ? { opacity: 1 } : undefined}
        >
          Сбросить
        </ActionButton>
      </div>
    </div>
  );
};

export const PetCard = memo(PetCardComponent);

