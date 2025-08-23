import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, RotateCcw } from 'lucide-react';
import { BreathingExercise } from '../types/BreathingExercise';
import PixelCard from './PixelCard';
import './ExerciseCard.css';

interface ExerciseCardProps {
  exercise: BreathingExercise;
  onStart: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onStart }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onStart}
    >
      <PixelCard 
        variant={exercise.category}
        className={`exercise-list ${exercise.category}`}
      >
        <div className="pixel-card-content">
          <div className="pixel-card-header">
            <h3 className="pixel-card-title">{exercise.name}</h3>
            <div className="pixel-card-category">{exercise.category}</div>
          </div>

          <p className="pixel-card-description">{exercise.description}</p>

          <div className="exercise-details">
            <div className="detail-item">
              <span className="pattern">
                {exercise.pattern.inhale}
                {exercise.pattern.hold && `-${exercise.pattern.hold}`}
                -{exercise.pattern.exhale}
                {exercise.pattern.holdEmpty && `-${exercise.pattern.holdEmpty}`}
              </span>
            </div>
            
            {exercise.duration && (
              <div className="detail-item">
                <Clock size={14} />
                <span>{exercise.duration} min</span>
              </div>
            )}
            
            {exercise.rounds && (
              <div className="detail-item">
                <RotateCcw size={14} />
                <span>{exercise.rounds} rounds</span>
              </div>
            )}
          </div>

          <div className="benefits">
            {exercise.benefits.slice(0, 2).map((benefit, index) => (
              <span key={index} className="benefit-tag">
                {benefit}
              </span>
            ))}
          </div>

          <motion.button 
            className="pixel-card-start-btn"
            onClick={(e) => { e.stopPropagation(); onStart(); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={16} fill="currentColor" />
            Start
          </motion.button>
        </div>
      </PixelCard>
    </motion.div>
  );
};

export default ExerciseCard;
