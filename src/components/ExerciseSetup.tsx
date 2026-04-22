import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { BreathingExercise } from '../types/BreathingExercise';
import {
  ANIMATIONS,
  AnimationStyle,
  SessionSettings,
  THEMES,
  themeById,
} from '../themes';
import './ExerciseSetup.css';

interface ExerciseSetupProps {
  exercise: BreathingExercise;
  onBack: () => void;
  onStart: (settings: SessionSettings) => void;
}

const DURATION_OPTIONS = [1, 3, 5, 10, 15, 20];
const ROUND_OPTIONS = [4, 8, 12, 20, 30];

function accentFor(category: string): string {
  switch (category) {
    case 'calm':
      return '#7fb8ff';
    case 'energy':
      return '#ffb86b';
    case 'focus':
      return '#c8a7ff';
    case 'sleep':
      return '#6e7bff';
    default:
      return '#a3b8ff';
  }
}

function patternText(ex: BreathingExercise): string {
  const { inhale, hold, exhale, holdEmpty } = ex.pattern;
  const parts = [inhale, hold, exhale, holdEmpty].filter((v) => typeof v === 'number') as number[];
  return parts.join(' · ') + ' s';
}

const ExerciseSetup: React.FC<ExerciseSetupProps> = ({ exercise, onBack, onStart }) => {
  const [durationMin, setDurationMin] = useState<number | undefined>(
    exercise.duration ?? (exercise.rounds ? undefined : 5)
  );
  const [rounds, setRounds] = useState<number | undefined>(exercise.rounds);
  const [animation, setAnimation] = useState<AnimationStyle>('orb');
  const [themeId, setThemeId] = useState<string>('auto');

  const autoAccent = useMemo(() => accentFor(exercise.category), [exercise.category]);
  const theme = themeById(themeId);
  const accent = theme.id === 'auto' ? autoAccent : theme.accent;

  const canStart = durationMin !== undefined || rounds !== undefined;

  const handleStart = () => {
    if (!canStart) return;
    onStart({ durationMin, rounds, animation, themeId });
  };

  return (
    <div
      className="setup-screen"
      style={{
        ['--setup-accent' as any]: accent,
        ['--setup-bg1' as any]: theme.id === 'auto' ? '' : theme.bg1,
        ['--setup-bg2' as any]: theme.id === 'auto' ? '' : theme.bg2,
      }}
    >
      <div className="setup-bg" aria-hidden />

      <header className="setup-header">
        <button className="chrome-btn" onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <div className="setup-title-wrap">
          <span className="setup-eyebrow">Prepare</span>
          <span className="setup-title">{exercise.name}</span>
        </div>
        <div className="setup-spacer" />
      </header>

      <motion.section
        className="setup-body"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="setup-summary">
          <div className="setup-orb" aria-hidden />
          <div className="setup-summary-body">
            <p className="setup-description">{exercise.description}</p>
            <div className="setup-stats">
              <span>{patternText(exercise)}</span>
              <span className="sep" />
              <span className="cat">{exercise.category}</span>
            </div>
          </div>
        </div>

        <Group label="Duration" hint="How long to breathe">
          <ChipRow>
            {DURATION_OPTIONS.map((d) => (
              <Chip
                key={d}
                active={durationMin === d}
                onClick={() =>
                  setDurationMin((cur) => (cur === d ? undefined : d))
                }
              >
                {d} min
              </Chip>
            ))}
          </ChipRow>
        </Group>

        <Group label="Rounds" hint="End after a set number of breath cycles">
          <ChipRow>
            {ROUND_OPTIONS.map((r) => (
              <Chip
                key={r}
                active={rounds === r}
                onClick={() => setRounds((cur) => (cur === r ? undefined : r))}
              >
                {r}×
              </Chip>
            ))}
          </ChipRow>
        </Group>

        <Group label="Visual Guide" hint="Pick the shape that calms you">
          <ChipRow>
            {ANIMATIONS.map((a) => (
              <Chip
                key={a.id}
                active={animation === a.id}
                onClick={() => setAnimation(a.id)}
              >
                {a.name}
              </Chip>
            ))}
          </ChipRow>
        </Group>

        <Group label="Theme" hint="Tint for the session">
          <div className="theme-row">
            {THEMES.map((t) => {
              const swatchAccent = t.id === 'auto' ? autoAccent : t.accent;
              return (
                <button
                  key={t.id}
                  className={`theme-chip ${themeId === t.id ? 'active' : ''}`}
                  onClick={() => setThemeId(t.id)}
                >
                  <span
                    className="theme-swatch"
                    style={{
                      ['--sw' as any]: swatchAccent,
                    }}
                  />
                  <span className="theme-name">{t.name}</span>
                </button>
              );
            })}
          </div>
        </Group>
      </motion.section>

      <footer className="setup-footer">
        <button
          className="setup-start"
          onClick={handleStart}
          disabled={!canStart}
        >
          <Play size={20} fill="currentColor" />
          <span>Start session</span>
        </button>
        <p className="setup-hint">
          {durationMin && rounds
            ? `Ends at ${durationMin} min or ${rounds} rounds, whichever comes first.`
            : durationMin
            ? `Ends after ${durationMin} minute${durationMin === 1 ? '' : 's'}.`
            : rounds
            ? `Ends after ${rounds} rounds.`
            : 'Pick a duration or rounds to begin.'}
        </p>
      </footer>
    </div>
  );
};

const Group: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({
  label,
  hint,
  children,
}) => (
  <div className="setup-group">
    <div className="setup-group-header">
      <span className="setup-group-label">{label}</span>
      {hint && <span className="setup-group-hint">{hint}</span>}
    </div>
    {children}
  </div>
);

const ChipRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="chip-row">{children}</div>
);

const Chip: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button className={`chip ${active ? 'active' : ''}`} onClick={onClick}>
    {children}
  </button>
);

export default ExerciseSetup;
