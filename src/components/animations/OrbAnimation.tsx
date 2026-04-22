import React from 'react';
import { motion } from 'framer-motion';
import './OrbAnimation.css';

export interface AnimationProps {
  phase: 'inhale' | 'hold' | 'exhale' | 'holdEmpty';
  progress: number;
  isActive: boolean;
}

const MIN = 0.78;
const MAX = 1.18;

const OrbAnimation: React.FC<AnimationProps> = ({ phase, progress, isActive }) => {
  const p = Math.min(1, Math.max(0, progress / 100));

  let scale = MIN;
  let glow = 0.55;
  if (!isActive) {
    scale = (MIN + MAX) / 2;
    glow = 0.45;
  } else if (phase === 'inhale') {
    scale = MIN + (MAX - MIN) * p;
    glow = 0.55 + 0.35 * p;
  } else if (phase === 'hold') {
    scale = MAX;
    glow = 0.9;
  } else if (phase === 'exhale') {
    scale = MAX - (MAX - MIN) * p;
    glow = 0.9 - 0.4 * p;
  } else {
    scale = MIN;
    glow = 0.5;
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

export default OrbAnimation;
