import React from 'react';
import type { AnimationProps } from './OrbAnimation';
import './BoxAnimation.css';

const SIZE = 240;
const PAD = 20;
const MIN = PAD;
const MAX = SIZE - PAD;

function dotPos(phase: AnimationProps['phase'], progress: number): { x: number; y: number } {
  const p = Math.min(1, Math.max(0, progress / 100));
  switch (phase) {
    case 'inhale':
      return { x: MIN, y: MAX - (MAX - MIN) * p }; // up the left side
    case 'hold':
      return { x: MIN + (MAX - MIN) * p, y: MIN }; // across the top
    case 'exhale':
      return { x: MAX, y: MIN + (MAX - MIN) * p }; // down the right side
    case 'holdEmpty':
      return { x: MAX - (MAX - MIN) * p, y: MAX }; // across the bottom
  }
}

const BoxAnimation: React.FC<AnimationProps> = ({ phase, progress, isActive }) => {
  const { x, y } = dotPos(phase, isActive ? progress : 0);

  return (
    <div className="box-stage">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="box-svg" aria-hidden>
        <defs>
          <filter id="box-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect
          x={PAD}
          y={PAD}
          width={SIZE - PAD * 2}
          height={SIZE - PAD * 2}
          rx="14"
          className="box-outline"
        />
        <rect
          x={PAD}
          y={PAD}
          width={SIZE - PAD * 2}
          height={SIZE - PAD * 2}
          rx="14"
          className="box-outline-active"
        />
        <circle
          cx={x}
          cy={y}
          r="10"
          className="box-dot"
          filter="url(#box-glow)"
          style={{
            transition: `cx 600ms cubic-bezier(0.42,0,0.2,1), cy 600ms cubic-bezier(0.42,0,0.2,1)`,
          }}
        />
      </svg>
    </div>
  );
};

export default BoxAnimation;
