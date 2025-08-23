import React from 'react';
import { motion } from 'framer-motion';
import './BreathingAnimation.css';

interface BreathingAnimationProps {
  phase: 'inhale' | 'hold' | 'exhale' | 'holdEmpty';
  progress: number;
  isActive: boolean;
}

const BreathingAnimation: React.FC<BreathingAnimationProps> = ({ 
  phase, 
  progress, 
  isActive 
}) => {
  const getScale = () => {
    if (!isActive) return 1;
    
    switch (phase) {
      case 'inhale':
        return 1 + (progress / 100) * 0.5; // Scale from 1 to 1.5
      case 'hold':
        return 1.5; // Stay expanded
      case 'exhale':
        return 1.5 - (progress / 100) * 0.5; // Scale from 1.5 to 1
      case 'holdEmpty':
        return 1; // Stay contracted
      default:
        return 1;
    }
  };

  const getOpacity = () => {
    if (!isActive) return 0.7;
    
    switch (phase) {
      case 'inhale':
        return 0.7 + (progress / 100) * 0.3; // Fade from 0.7 to 1
      case 'hold':
        return 1; // Stay bright
      case 'exhale':
        return 1 - (progress / 100) * 0.3; // Fade from 1 to 0.7
      case 'holdEmpty':
        return 0.7; // Stay dim
      default:
        return 0.7;
    }
  };

  return (
    <div className="breathing-animation">
      <motion.div
        className="breathing-circle"
        animate={{
          scale: getScale(),
          opacity: getOpacity(),
        }}
        transition={{
          duration: 0.1,
          ease: "easeInOut"
        }}
      >
        <div className="circle-inner">
          <div className="circle-core" />
        </div>
        
        {/* Ripple effects */}
        {isActive && (
          <>
            <motion.div
              className="ripple ripple-1"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="ripple ripple-2"
              animate={{
                scale: [1, 2.5, 1],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 1,
                ease: "easeInOut"
              }}
            />
          </>
        )}
      </motion.div>
      
      {/* Breathing guide dots */}
      <div className="breathing-guide">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="guide-dot"
            style={{
              transform: `rotate(${i * 45}deg) translateY(-80px)`,
            }}
            animate={{
              scale: isActive ? [1, 1.2, 1] : 1,
              opacity: isActive ? [0.5, 1, 0.5] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BreathingAnimation;
