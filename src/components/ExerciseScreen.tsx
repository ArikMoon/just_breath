import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pause, Play, RotateCcw } from 'lucide-react';
import { BreathingExercise } from '../types/BreathingExercise';
import BreathingAnimation from './BreathingAnimation';
import './ExerciseScreen.css';

interface ExerciseScreenProps {
  exercise: BreathingExercise;
  onExit: () => void;
}

type Phase = 'inhale' | 'hold' | 'exhale' | 'holdEmpty';

const ExerciseScreen: React.FC<ExerciseScreenProps> = ({ exercise, onExit }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>('inhale');
  const [phaseTime, setPhaseTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalTime, setTotalTime] = useState(0);

  const getPhaseInstructions = (phase: Phase): string => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'holdEmpty':
        return 'Hold Empty';
      default:
        return '';
    }
  };

  const getPhaseDuration = useCallback((phase: Phase): number => {
    switch (phase) {
      case 'inhale':
        return exercise.pattern.inhale;
      case 'hold':
        return exercise.pattern.hold || 0;
      case 'exhale':
        return exercise.pattern.exhale;
      case 'holdEmpty':
        return exercise.pattern.holdEmpty || 0;
      default:
        return 0;
    }
  }, [exercise.pattern]);

  const getNextPhase = useCallback((current: Phase): Phase => {
    const phases: Phase[] = ['inhale'];
    if (exercise.pattern.hold) phases.push('hold');
    phases.push('exhale');
    if (exercise.pattern.holdEmpty) phases.push('holdEmpty');
    
    const currentIndex = phases.indexOf(current);
    return phases[(currentIndex + 1) % phases.length];
  }, [exercise.pattern]);

  const advancePhase = useCallback(() => {
    const nextPhase = getNextPhase(currentPhase);
    setCurrentPhase(nextPhase);
    setPhaseTime(0);
    
    // If we completed a full cycle and we're back to inhale
    if (nextPhase === 'inhale' && exercise.rounds) {
      setCurrentRound(prev => prev + 1);
    }
  }, [currentPhase, exercise.rounds, getNextPhase]);

  const shouldStop = useCallback(() => {
    if (exercise.rounds) {
      return currentRound > exercise.rounds;
    }
    if (exercise.duration) {
      return totalTime >= exercise.duration * 60;
    }
    return false;
  }, [currentRound, exercise.rounds, totalTime, exercise.duration]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setPhaseTime(prev => prev + 1);
      setTotalTime(prev => prev + 1);
      
      const phaseDuration = getPhaseDuration(currentPhase);
      if (phaseTime >= phaseDuration - 1) {
        if (shouldStop()) {
          setIsActive(false);
          return;
        }
        advancePhase();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phaseTime, currentPhase, advancePhase, shouldStop, getPhaseDuration]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setPhaseTime(0);
    setCurrentRound(1);
    setTotalTime(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const phaseDuration = getPhaseDuration(currentPhase);
  const phaseProgress = phaseDuration > 0 ? (phaseTime / phaseDuration) * 100 : 0;

  return (
    <div 
      className="exercise-screen"
      style={{
        background: `linear-gradient(135deg, ${exercise.gradient[0]}, ${exercise.gradient[1]})`
      }}
    >
      <div className="exercise-header">
        <button className="exit-button" onClick={onExit}>
          <X size={24} />
        </button>
        <h2 className="exercise-title">{exercise.name}</h2>
        <div className="time-display">{formatTime(totalTime)}</div>
      </div>

      <div className="exercise-content">
        <BreathingAnimation 
          phase={currentPhase}
          progress={phaseProgress}
          isActive={isActive}
        />
        
        <div className="phase-info">
          <AnimatePresence mode="wait">
            <motion.h3 
              key={currentPhase}
              className="phase-instruction"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {getPhaseInstructions(currentPhase)}
            </motion.h3>
          </AnimatePresence>
          
          <div className="countdown">
            {phaseDuration - phaseTime}
          </div>
          
          {exercise.rounds && (
            <div className="round-counter">
              Round {Math.min(currentRound, exercise.rounds)} of {exercise.rounds}
            </div>
          )}
        </div>
      </div>

      <div className="exercise-controls">
        <button 
          className="control-button reset"
          onClick={handleReset}
        >
          <RotateCcw size={20} />
        </button>
        
        <button 
          className={`control-button primary ${isActive ? 'pause' : 'play'}`}
          onClick={isActive ? handlePause : handleStart}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
        </button>
        
        <div className="control-spacer" />
      </div>
    </div>
  );
};

export default ExerciseScreen;
