import React from 'react';
import type { AnimationProps } from './OrbAnimation';
import './HillAnimation.css';

const W = 280;
const H = 200;
const BASE_Y = 170;
const PEAK_Y = 40;
const LEFT_X = 30;
const PEAK_X = W / 2;
const RIGHT_X = W - 30;

// Quadratic-bezier along the left half: (LEFT_X, BASE_Y) → control (LEFT_X, PEAK_Y) → (PEAK_X, PEAK_Y)
// Mirrored on the right. We just parameterize by t in [0,1] on each half.
function leftArc(t: number) {
  const mt = 1 - t;
  const x = mt * mt * LEFT_X + 2 * mt * t * LEFT_X + t * t * PEAK_X;
  const y = mt * mt * BASE_Y + 2 * mt * t * PEAK_Y + t * t * PEAK_Y;
  return { x, y };
}
function rightArc(t: number) {
  const mt = 1 - t;
  const x = mt * mt * PEAK_X + 2 * mt * t * RIGHT_X + t * t * RIGHT_X;
  const y = mt * mt * PEAK_Y + 2 * mt * t * PEAK_Y + t * t * BASE_Y;
  return { x, y };
}

function dotPos(phase: AnimationProps['phase'], progress: number): { x: number; y: number } {
  const p = Math.min(1, Math.max(0, progress / 100));
  switch (phase) {
    case 'inhale':
      return leftArc(p);
    case 'hold':
      return { x: PEAK_X, y: PEAK_Y };
    case 'exhale':
      return rightArc(p);
    case 'holdEmpty':
      return { x: RIGHT_X, y: BASE_Y };
  }
}

const HillAnimation: React.FC<AnimationProps> = ({ phase, progress, isActive }) => {
  const { x, y } = dotPos(phase, isActive ? progress : 0);
  const pathD = `M ${LEFT_X} ${BASE_Y} Q ${LEFT_X} ${PEAK_Y} ${PEAK_X} ${PEAK_Y} Q ${RIGHT_X} ${PEAK_Y} ${RIGHT_X} ${BASE_Y}`;

  return (
    <div className="hill-stage">
      <svg viewBox={`0 0 ${W} ${H}`} className="hill-svg" aria-hidden>
        <defs>
          <filter id="hill-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hill-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <line
          x1={LEFT_X - 6}
          x2={RIGHT_X + 6}
          y1={BASE_Y}
          y2={BASE_Y}
          className="hill-base"
        />
        <path d={pathD} className="hill-path" />
        <path
          d={`${pathD} L ${RIGHT_X} ${BASE_Y} L ${LEFT_X} ${BASE_Y} Z`}
          className="hill-fill"
          style={{ color: 'var(--exercise-accent, #fff)', fill: 'url(#hill-grad)' }}
        />
        <circle
          cx={x}
          cy={y}
          r="8"
          className="hill-dot"
          filter="url(#hill-glow)"
          style={{
            transition: `cx 600ms cubic-bezier(0.42,0,0.2,1), cy 600ms cubic-bezier(0.42,0,0.2,1)`,
          }}
        />
      </svg>
    </div>
  );
};

export default HillAnimation;
