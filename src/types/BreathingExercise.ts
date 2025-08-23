export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  category: 'calm' | 'energy' | 'focus' | 'sleep';
  pattern: {
    inhale: number;
    hold?: number;
    exhale: number;
    holdEmpty?: number;
  };
  rounds?: number;
  duration?: number; // in minutes
  instructions: string[];
  benefits: string[];
  color: string;
  gradient: string[];
}
