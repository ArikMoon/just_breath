import React from 'react';
import { motion } from 'framer-motion';
import './BreathingAnimation.css';

interface BreathingAnimationProps {
  phase: 'inhale' | 'hold' | 'exhale' | 'holdEmpty';
  progress: number;
  isActive: boolean;
}

const MIN = 0.78;
const MAX = 1.18;

const BreathingAnimation: React.FC<BreathingAnimationProps> = ({ phase, progress, isActive }) => {
  const p = Math.min(1, Math.max(0, progress / 100));

  let scale = MIN;
  let glow = 0.55;
  if (!isActive) {
    scale = (MIN + MAX) / 2;
    glow = 0.45;
  } else {
    switch (phase) {
      case 'inhale':
        scale = MIN + (MAX - MIN) * p;
        glow = 0.55 + 0.35 * p;
        break;
      case 'hold':
        scale = MAX;
        glow = 0.9;
        break;
      case 'exhale':
        scale = MAX - (MAX - MIN) * p;
        glow = 0.9 - 0.4 * p;
        break;
      case 'holdEmpty':
        scale = MIN;
        glow = 0.5;
        break;
    }
  }

  return (
    <div className="orb-stage">
      <motion.div
        className="orb-ring"
        animate={{ scale: scale * 1.14, opacity: 0.35 }}
        transition={{ duration: 0.9, ease: [0.42, 0, 0.2, 1] }}
      />
      <motion.div
        className="orb-ring orb-ring-2"
        animate={{ scale: scale * 1.32, opacity: 0.2 }}
        transition={{ duration: 0.9, ease: [0.42, 0, 0.2, 1] }}
      />
      <motion.div
        className="orb-core"
        animate={{ scale, ['--glow' as any]: glow }}
        transition={{ duration: 0.9, ease: [0.42, 0, 0.2, 1] }}
        style={{ ['--glow' as any]: glow }}
      />
    </div>
  );
};

export default BreathingAnimation;
