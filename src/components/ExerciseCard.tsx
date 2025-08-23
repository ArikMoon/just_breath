import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, RotateCcw } from 'lucide-react';
import { BreathingExercise } from '../types/BreathingExercise';
import './ExerciseCard.css';

interface ExerciseCardProps {
  exercise: BreathingExercise;
  onStart: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onStart }) => {
  return (
    <motion.div 
      className="exercise-card"
      style={{
        background: `linear-gradient(135deg, ${exercise.gradient[0]}, ${exercise.gradient[1]})`
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="card-content">
        <div className="card-header">
          <h3 className="exercise-name">{exercise.name}</h3>
          <div className="category-badge">{exercise.category}</div>
        </div>
        
        <p className="exercise-description">{exercise.description}</p>
        
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
      </div>
      
      <motion.button 
        className="start-button"
        onClick={onStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Play size={16} fill="currentColor" />
        Start
      </motion.button>
    </motion.div>
  );
};

export default ExerciseCard;
