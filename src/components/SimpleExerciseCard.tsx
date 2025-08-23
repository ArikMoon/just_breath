import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, RotateCcw } from 'lucide-react';
import { BreathingExercise } from '../types/BreathingExercise';

interface SimpleExerciseCardProps {
  exercise: BreathingExercise;
  onStart: () => void;
}

const SimpleExerciseCard: React.FC<SimpleExerciseCardProps> = ({ exercise, onStart }) => {
  return (
    <motion.div 
      className="simple-exercise-card"
      style={{
        background: `linear-gradient(135deg, ${exercise.gradient[0]}, ${exercise.gradient[1]})`,
        borderRadius: '16px',
        padding: '1.5rem',
        color: '#334155',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s ease'
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onStart}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 500, margin: 0, lineHeight: 1.3, color: '#1e293b' }}>
            {exercise.name}
          </h3>
          <div style={{ 
            background: '#dbeafe', 
            color: '#3b82f6', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '20px', 
            fontSize: '0.75rem', 
            fontWeight: 500, 
            textTransform: 'capitalize',
            border: '1px solid #93c5fd'
          }}>
            {exercise.category}
          </div>
        </div>
        
        <p style={{ 
          fontSize: '0.875rem', 
          color: '#64748b', 
          lineHeight: 1.5, 
          marginBottom: '1.25rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {exercise.description}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', margin: '1rem 0' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.25rem', 
            fontSize: '0.75rem', 
            color: '#64748b',
            background: '#f8fafc',
            padding: '0.25rem 0.5rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ fontWeight: 600, color: '#3b82f6' }}>
              {exercise.pattern.inhale}
              {exercise.pattern.hold && `-${exercise.pattern.hold}`}
              -{exercise.pattern.exhale}
              {exercise.pattern.holdEmpty && `-${exercise.pattern.holdEmpty}`}
            </span>
          </div>
          
          {exercise.duration && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.25rem', 
              fontSize: '0.75rem', 
              color: '#64748b',
              background: '#f8fafc',
              padding: '0.25rem 0.5rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <Clock size={14} />
              <span>{exercise.duration} min</span>
            </div>
          )}
          
          {exercise.rounds && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.25rem', 
              fontSize: '0.75rem', 
              color: '#64748b',
              background: '#f8fafc',
              padding: '0.25rem 0.5rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <RotateCcw size={14} />
              <span>{exercise.rounds} rounds</span>
            </div>
          )}
        </div>

        <motion.button 
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
            marginTop: '1rem'
          }}
          onClick={(e) => { e.stopPropagation(); onStart(); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play size={16} fill="currentColor" />
          Start
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SimpleExerciseCard;
