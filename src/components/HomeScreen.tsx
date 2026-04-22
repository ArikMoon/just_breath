import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudSun, Moon, Star } from 'lucide-react';
import { BreathingExercise } from '../types/BreathingExercise';
import { breathingExercises } from '../data/exercises';
import './HomeScreen.css';

interface HomeScreenProps {
  onStartExercise: (exercise: BreathingExercise) => void;
}

type Tab = 'all' | 'calm' | 'energy' | 'focus' | 'sleep';

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'calm', label: 'Calm' },
  { id: 'energy', label: 'Energy' },
  { id: 'focus', label: 'Focus' },
  { id: 'sleep', label: 'Sleep' },
];

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

function timeOfDay(date = new Date()): TimeOfDay {
  const h = date.getHours();
  if (h < 5) return 'night';
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  if (h < 21) return 'evening';
  return 'night';
}

function greeting(t: TimeOfDay): string {
  switch (t) {
    case 'morning':
      return 'Good morning';
    case 'afternoon':
      return 'Good afternoon';
    case 'evening':
      return 'Good evening';
    case 'night':
      return 'Good night';
  }
}

function recommendedFor(t: TimeOfDay): string {
  switch (t) {
    case 'morning':
      return 'wim_hof';
    case 'afternoon':
      return 'box_breathing';
    case 'evening':
      return 'coherent_breathing';
    case 'night':
      return 'four_seven_eight';
  }
}

function accentFor(category: string): string {
  switch (category) {
    case 'calm':
      return 'var(--calm)';
    case 'energy':
      return 'var(--energy)';
    case 'focus':
      return 'var(--focus)';
    case 'sleep':
      return 'var(--sleep)';
    default:
      return 'var(--text-dim)';
  }
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartExercise }) => {
  const [tab, setTab] = useState<Tab>('all');
  const tod = useMemo(() => timeOfDay(), []);

  const recommended = useMemo(() => {
    const id = recommendedFor(tod);
    return breathingExercises.find((e) => e.id === id) || breathingExercises[0];
  }, [tod]);

  const visible = useMemo(() => {
    if (tab === 'all') return breathingExercises;
    return breathingExercises.filter((e) => e.category === tab);
  }, [tab]);

  const TodIcon =
    tod === 'morning' ? Sun : tod === 'afternoon' ? CloudSun : tod === 'evening' ? Moon : Star;

  return (
    <div className={`home-screen tod-${tod}`}>
      <div className="home-backdrop" aria-hidden />

      <motion.header
        className="home-header"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="home-greet">
          <TodIcon size={18} strokeWidth={1.6} />
          <span>{greeting(tod)}</span>
        </div>
        <h1 className="home-title">Take one deep breath.</h1>
      </motion.header>

      <motion.button
        className="recommended-card"
        onClick={() => onStartExercise(recommended)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.99 }}
        style={{ ['--accent' as any]: accentFor(recommended.category) }}
      >
        <div className="recommended-orb" aria-hidden />
        <div className="recommended-body">
          <span className="recommended-eyebrow">Recommended for you</span>
          <span className="recommended-name">{recommended.name}</span>
          <span className="recommended-caption">{recommended.description}</span>
          <span className="recommended-meta">
            {recommended.duration ? `${recommended.duration} min` : `${recommended.rounds ?? 8} rounds`}
            <span className="dot" />
            {recommended.category}
          </span>
        </div>
      </motion.button>

      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <motion.ul
        className="exercise-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {visible.map((exercise, i) => (
          <motion.li
            key={exercise.id}
            className="exercise-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.4) }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStartExercise(exercise)}
            style={{ ['--accent' as any]: accentFor(exercise.category) }}
          >
            <span className="exercise-accent" aria-hidden />
            <div className="exercise-main">
              <span className="exercise-name">{exercise.name}</span>
              <span className="exercise-sub">{exercise.description}</span>
            </div>
            <span className="exercise-meta">
              {exercise.duration
                ? `${exercise.duration}m`
                : exercise.rounds
                ? `${exercise.rounds}×`
                : ''}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <div className="home-footer">
        <span>{breathingExercises.length} exercises · works offline</span>
      </div>
    </div>
  );
};

export default HomeScreen;
