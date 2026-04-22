import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pause, Play, RotateCcw } from 'lucide-react';
import { BreathingExercise } from '../types/BreathingExercise';
import { SessionSettings, themeById } from '../themes';
import OrbAnimation from './animations/OrbAnimation';
import BoxAnimation from './animations/BoxAnimation';
import HillAnimation from './animations/HillAnimation';
import './ExerciseScreen.css';

interface ExerciseScreenProps {
  exercise: BreathingExercise;
  settings: SessionSettings;
  onExit: () => void;
}

type Phase = 'inhale' | 'hold' | 'exhale' | 'holdEmpty';

const PHASE_LABEL: Record<Phase, string> = {
  inhale: 'Inhale',
  hold: 'Hold',
  exhale: 'Exhale',
  holdEmpty: 'Rest',
};

function categoryAccent(category: string): string {
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

const ExerciseScreen: React.FC<ExerciseScreenProps> = ({ exercise, settings, onExit }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>('inhale');
  const [phaseTime, setPhaseTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalTime, setTotalTime] = useState(0);

  const theme = useMemo(() => themeById(settings.themeId), [settings.themeId]);
  const accent = theme.id === 'auto' ? categoryAccent(exercise.category) : theme.accent;
  const bg1 = theme.id === 'auto' ? '' : theme.bg1;
  const bg2 = theme.id === 'auto' ? '' : theme.bg2;

  const getPhaseDuration = useCallback(
    (phase: Phase): number => {
      switch (phase) {
        case 'inhale':
          return exercise.pattern.inhale;
        case 'hold':
          return exercise.pattern.hold || 0;
        case 'exhale':
          return exercise.pattern.exhale;
        case 'holdEmpty':
          return exercise.pattern.holdEmpty || 0;
      }
    },
    [exercise.pattern]
  );

  const phases = useMemo<Phase[]>(() => {
    const seq: Phase[] = ['inhale'];
    if (exercise.pattern.hold) seq.push('hold');
    seq.push('exhale');
    if (exercise.pattern.holdEmpty) seq.push('holdEmpty');
    return seq;
  }, [exercise.pattern]);

  const advancePhase = useCallback(() => {
    const idx = phases.indexOf(currentPhase);
    const next = phases[(idx + 1) % phases.length];
    setCurrentPhase(next);
    setPhaseTime(0);
    if (next === 'inhale' && settings.rounds) {
      setCurrentRound((r) => r + 1);
    }
  }, [currentPhase, phases, settings.rounds]);

  const shouldStop = useCallback(() => {
    if (settings.rounds && currentRound > settings.rounds) return true;
    if (settings.durationMin && totalTime >= settings.durationMin * 60) return true;
    return false;
  }, [currentRound, settings.rounds, settings.durationMin, totalTime]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setPhaseTime((prev) => prev + 1);
      setTotalTime((prev) => prev + 1);
      const dur = getPhaseDuration(currentPhase);
      if (phaseTime >= dur - 1) {
        if (shouldStop()) {
          setIsActive(false);
          return;
        }
        advancePhase();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, phaseTime, currentPhase, advancePhase, shouldStop, getPhaseDuration]);

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setPhaseTime(0);
    setCurrentRound(1);
    setTotalTime(0);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, '0')}`;
  };

  const phaseDuration = getPhaseDuration(currentPhase);
  const countdown = Math.max(0, phaseDuration - phaseTime);
  const phaseProgress = phaseDuration > 0 ? (phaseTime / phaseDuration) * 100 : 0;

  const Animation =
    settings.animation === 'box'
      ? BoxAnimation
      : settings.animation === 'hill'
      ? HillAnimation
      : OrbAnimation;

  return (
    <div
      className={`exercise-screen cat-${exercise.category}`}
      style={{
        ['--exercise-accent' as any]: accent,
        ['--session-bg1' as any]: bg1,
        ['--session-bg2' as any]: bg2,
      }}
    >
      <div className="exercise-bg" aria-hidden />

      <header className="exercise-header">
        <button className="chrome-btn" onClick={onExit} aria-label="End session">
          <X size={20} />
        </button>
        <div className="exercise-meta-top">
          <span className="exercise-name-top">{exercise.name}</span>
          <span className="time-elapsed">
            {formatTime(totalTime)}
            {settings.durationMin ? ` / ${settings.durationMin}:00` : ''}
          </span>
        </div>
        <button className="chrome-btn" onClick={handleReset} aria-label="Restart">
          <RotateCcw size={18} />
        </button>
      </header>

      <div className="stage">
        <Animation phase={currentPhase} progress={phaseProgress} isActive={isActive} />

        <div className="phase-stack">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              className="phase-label"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {PHASE_LABEL[currentPhase]}
            </motion.div>
          </AnimatePresence>
          <div className="phase-count">{isActive ? countdown : phaseDuration}</div>
          {settings.rounds ? (
            <div className="phase-round">
              Round {Math.min(currentRound, settings.rounds)} of {settings.rounds}
            </div>
          ) : settings.durationMin ? (
            <div className="phase-round">{settings.durationMin} min session</div>
          ) : null}
        </div>
      </div>

      <footer className="exercise-controls">
        <button
          className={`primary-btn ${isActive ? 'is-active' : ''}`}
          onClick={isActive ? handlePause : handleStart}
          aria-label={isActive ? 'Pause' : 'Start'}
        >
          {isActive ? <Pause size={22} /> : <Play size={22} fill="currentColor" />}
        </button>
        <p className="exercise-hint">
          {isActive ? 'Follow the guide. Breathe through your nose.' : 'Tap play to begin.'}
        </p>
      </footer>
    </div>
  );
};

export default ExerciseScreen;
