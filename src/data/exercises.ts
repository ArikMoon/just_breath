import { BreathingExercise } from '../types/BreathingExercise';

export const CATEGORIES = {
  CALM: 'calm',
  ENERGY: 'energy',
  FOCUS: 'focus',
  SLEEP: 'sleep'
};

export const breathingExercises: BreathingExercise[] = [
  // CALM CATEGORY
  {
    id: 'belly_breathing',
    name: 'Belly Breathing',
    description: 'A foundational breathing technique that activates the parasympathetic nervous system.',
    category: 'calm',
    pattern: {
      inhale: 4,
      exhale: 6
    },
    duration: 5,
    instructions: [
      'Sit or lie down comfortably',
      'Place one hand on your chest, one on your belly',
      'Breathe slowly through your nose, expanding your belly',
      'Exhale slowly through your mouth',
      'Focus on the hand on your belly rising and falling'
    ],
    benefits: ['Reduces stress', 'Lowers heart rate', 'Promotes relaxation'],
    color: '#4299E1',
    gradient: ['#4299E1', '#38B2AC']
  },
  {
    id: 'coherent_breathing',
    name: 'Coherent Breathing',
    description: 'Equal breathing that creates coherence between heart, mind, and emotions.',
    category: 'calm',
    pattern: {
      inhale: 5,
      exhale: 5
    },
    duration: 10,
    instructions: [
      'Sit comfortably with your spine straight',
      'Breathe in through your nose for 5 seconds',
      'Breathe out through your nose for 5 seconds',
      'Maintain a steady, even rhythm',
      'Focus on the balance between inhale and exhale'
    ],
    benefits: ['Balances the nervous system', 'Improves heart rate variability'],
    color: '#38B2AC',
    gradient: ['#38B2AC', '#4299E1']
  },
  {
    id: 'pranayama_breathing',
    name: 'Pranayama (4-7-8)',
    description: 'Ancient yogic breathing technique that acts as a natural tranquilizer for the nervous system.',
    category: 'calm',
    pattern: {
      inhale: 4,
      hold: 7,
      exhale: 8
    },
    rounds: 24,
    duration: 8,
    instructions: [
      'Sit with your back straight',
      'Place tongue tip against roof of mouth behind teeth',
      'Inhale through nose for 4 counts',
      'Hold breath for 7 counts',
      'Exhale through mouth for 8 counts making whoosh sound',
      'This is one cycle - repeat'
    ],
    benefits: ['Reduces anxiety', 'Promotes deep relaxation', 'Improves sleep quality'],
    color: '#38B2AC',
    gradient: ['#38B2AC', '#4299E1']
  },
  {
    id: 'buteyko',
    name: 'Buteyko Breathing',
    description: 'Reduced breathing technique for asthma and over-breathing correction.',
    category: 'calm',
    pattern: {
      inhale: 2,
      exhale: 3
    },
    duration: 10,
    instructions: [
      'Breathe very lightly and slowly',
      'Small, gentle breaths through nose only',
      'Reduce breathing volume gradually',
      'Include control pauses between breaths'
    ],
    benefits: ['Asthma relief', 'Better oxygen utilization', 'Calm nervous system'],
    color: '#059669',
    gradient: ['#059669', '#047857']
  },

  // ENERGY CATEGORY
  {
    id: 'wim_hof',
    name: 'Wim Hof Method',
    description: 'Powerful breathing technique developed by Wim Hof for energy, immune system boost, and stress resilience.',
    category: 'energy',
    pattern: {
      inhale: 2,
      exhale: 2
    },
    rounds: 3,
    duration: 11,
    instructions: [
      'Sit or lie down comfortably',
      'Take 30 deep, powerful breaths',
      'Breathe in fully, breathe out naturally (not forced)',
      'After 30 breaths, exhale and hold your breath',
      'Hold until you feel the urge to breathe',
      'Take a recovery breath and hold for 15 seconds',
      'Repeat for 3 rounds total'
    ],
    benefits: ['Increases energy and alertness', 'Boosts immune system', 'Improves stress resilience', 'Enhances cold tolerance'],
    color: '#F56565',
    gradient: ['#F56565', '#ED8936']
  },
  {
    id: 'power_breathing',
    name: 'Power Breathing',
    description: 'Energizing breath pattern designed to increase alertness and mental clarity.',
    category: 'energy',
    pattern: {
      inhale: 1,
      hold: 4,
      exhale: 2
    },
    rounds: 10,
    instructions: [
      'Sit up straight with good posture',
      'Take a quick, powerful inhale for 1 count',
      'Hold your breath for 4 counts',
      'Exhale forcefully for 2 counts',
      'Focus on building energy with each cycle'
    ],
    benefits: ['Increases mental clarity', 'Boosts energy levels', 'Enhances alertness'],
    color: '#ED8936',
    gradient: ['#ED8936', '#F56565']
  },
  {
    id: 'breath_of_fire',
    name: 'Breath of Fire',
    description: 'Kundalini breathing technique that generates internal heat and energy.',
    category: 'energy',
    pattern: {
      inhale: 1,
      exhale: 1
    },
    rounds: 30,
    instructions: [
      'Sit with spine straight',
      'Begin with rapid, forceful exhales through the nose',
      'Allow inhales to happen naturally (passive)',
      'Focus on pumping the belly with each exhale',
      'Maintain rhythm of 1-2 breaths per second'
    ],
    benefits: ['Generates internal heat', 'Increases energy', 'Improves focus', 'Supports detoxification'],
    color: '#F56565',
    gradient: ['#F56565', '#FC8181']
  },
  {
    id: 'bellows_breath',
    name: 'Bellows Breath (Bhastrika)',
    description: 'Rapid, forceful breathing technique for heat generation and energy.',
    category: 'energy',
    pattern: {
      inhale: 1,
      exhale: 1
    },
    rounds: 30,
    instructions: [
      'Sit with spine erect',
      'Rapid, forceful inhale and exhale',
      'Strong pumping action like bellows',
      'Equal force on inhale and exhale',
      'Maintain 30-60 breaths per round'
    ],
    benefits: ['Heat generation', 'Energy boost', 'Mental alertness'],
    color: '#DC2626',
    gradient: ['#DC2626', '#B91C1C']
  },

  // FOCUS CATEGORY
  {
    id: 'box_breathing',
    name: 'Box Breathing',
    description: 'Military and Navy SEALs technique for maintaining calm focus under pressure.',
    category: 'focus',
    pattern: {
      inhale: 4,
      hold: 4,
      exhale: 4,
      holdEmpty: 4
    },
    rounds: 8,
    instructions: [
      'Sit comfortably with your back straight',
      'Inhale through your nose for 4 counts',
      'Hold your breath for 4 counts',
      'Exhale through your mouth for 4 counts',
      'Hold empty for 4 counts',
      'Visualize drawing a box with your breath'
    ],
    benefits: ['Improves focus and concentration', 'Reduces stress and anxiety', 'Enhances performance under pressure'],
    color: '#805AD5',
    gradient: ['#805AD5', '#9F7AEA']
  },
  {
    id: 'buteyko_breathing',
    name: 'Buteyko Breathing',
    description: 'Developed by Dr. Konstantin Buteyko to normalize breathing patterns and improve oxygen utilization.',
    category: 'focus',
    pattern: {
      inhale: 3,
      exhale: 3,
      holdEmpty: 3
    },
    rounds: 50,
    duration: 10,
    instructions: [
      'Sit upright with good posture',
      'Breathe only through your nose',
      'Take a small breath in for 3 seconds',
      'Breathe out gently for 3 seconds',
      'Hold empty for 3 seconds',
      'Focus on breathing less, not more'
    ],
    benefits: ['Improves oxygen efficiency', 'Reduces over-breathing', 'Enhances focus'],
    color: '#805AD5',
    gradient: ['#805AD5', '#9F7AEA']
  },
  {
    id: 'alternate_nostril',
    name: 'Alternate Nostril Breathing',
    description: 'Traditional pranayama technique that balances the nervous system and enhances mental clarity.',
    category: 'focus',
    pattern: {
      inhale: 4,
      hold: 2,
      exhale: 4
    },
    rounds: 12,
    duration: 8,
    instructions: [
      'Sit comfortably with spine straight',
      'Use right thumb to close right nostril',
      'Inhale through left nostril for 4 counts',
      'Close left nostril with ring finger, release thumb',
      'Exhale through right nostril for 4 counts',
      'Continue alternating nostrils'
    ],
    benefits: ['Balances nervous system', 'Improves concentration', 'Reduces stress', 'Enhances mental clarity'],
    color: '#9F7AEA',
    gradient: ['#9F7AEA', '#805AD5']
  },
  {
    id: 'triangle_breathing',
    name: 'Triangle Breathing',
    description: 'Simple technique for beginners and meditation focus.',
    category: 'focus',
    pattern: {
      inhale: 3,
      hold: 3,
      exhale: 3
    },
    duration: 5,
    instructions: [
      'Visualize an equilateral triangle',
      'Inhale for 3 counts (first side)',
      'Hold for 3 counts (second side)',
      'Exhale for 3 counts (third side)',
      'Complete the triangle with each breath'
    ],
    benefits: ['Beginner friendly', 'Meditation aid', 'Focus training'],
    color: '#6366F1',
    gradient: ['#6366F1', '#3730A3']
  },

  // SLEEP CATEGORY
  {
    id: 'four_seven_eight',
    name: '4-7-8 Breathing',
    description: 'Dr. Andrew Weil\'s adaptation of pranayama breathing for sleep and anxiety relief.',
    category: 'sleep',
    pattern: {
      inhale: 4,
      hold: 7,
      exhale: 8
    },
    rounds: 4,
    duration: 3,
    instructions: [
      'Sit or lie down comfortably',
      'Place tongue tip behind upper front teeth',
      'Exhale completely through mouth',
      'Inhale through nose for 4 counts',
      'Hold breath for 7 counts',
      'Exhale through mouth for 8 counts with whoosh sound'
    ],
    benefits: ['Promotes sleep', 'Reduces anxiety', 'Calms nervous system'],
    color: '#553C9A',
    gradient: ['#553C9A', '#4C51BF']
  },
  {
    id: 'progressive_relaxation',
    name: 'Progressive Relaxation',
    description: 'Gradual breathing technique that progressively relaxes the body for deep sleep.',
    category: 'sleep',
    pattern: {
      inhale: 4,
      hold: 2,
      exhale: 8
    },
    duration: 15,
    instructions: [
      'Lie down in a comfortable position',
      'Start with natural breathing',
      'Gradually slow down each breath',
      'Focus on releasing tension with each exhale',
      'Let each exhale become longer and deeper',
      'Allow your body to sink into relaxation'
    ],
    benefits: ['Prepares body for sleep', 'Releases physical tension', 'Calms racing thoughts'],
    color: '#4C51BF',
    gradient: ['#4C51BF', '#553C9A']
  },
  {
    id: 'moon_breathing',
    name: 'Moon Breathing (Chandra Bhedana)',
    description: 'Cooling pranayama technique that activates the parasympathetic nervous system for rest.',
    category: 'sleep',
    pattern: {
      inhale: 4,
      exhale: 6
    },
    rounds: 20,
    duration: 8,
    instructions: [
      'Sit comfortably or lie down',
      'Use right thumb to close right nostril',
      'Inhale slowly through left nostril only',
      'Close left nostril and release right',
      'Exhale slowly through right nostril',
      'Continue this pattern for cooling effect'
    ],
    benefits: ['Cools the body', 'Promotes sleepiness', 'Reduces mental activity'],
    color: '#4C51BF',
    gradient: ['#4C51BF', '#6366F1']
  },
  {
    id: 'body_scan_breathing',
    name: 'Body Scan Breathing',
    description: 'Natural breath with body awareness for sleep preparation.',
    category: 'sleep',
    pattern: {
      inhale: 4,
      exhale: 6
    },
    duration: 12,
    instructions: [
      'Lie down comfortably',
      'Breathe naturally and slowly',
      'Focus on different body parts sequentially',
      'Start from toes, work up to head',
      'Breathe into each body part',
      'Release tension with each exhale'
    ],
    benefits: ['Sleep preparation', 'Body awareness', 'Deep relaxation'],
    color: '#553C9A',
    gradient: ['#553C9A', '#4C51BF']
  }
];

export const getCategoryInfo = (category: string) => {
  const categoryMap = {
    [CATEGORIES.CALM]: {
      name: 'Calm',
      description: 'Relaxation and stress relief',
      icon: '😌',
      gradient: ['#dbeafe', '#bfdbfe'],
      color: '#3b82f6'
    },
    [CATEGORIES.ENERGY]: {
      name: 'Energy',
      description: 'Boost energy and alertness',
      icon: '⚡',
      gradient: ['#fed7d7', '#fbb6ce'],
      color: '#f59e0b'
    },
    [CATEGORIES.FOCUS]: {
      name: 'Focus',
      description: 'Enhance concentration',
      icon: '🎯',
      gradient: ['#e9d5ff', '#ddd6fe'],
      color: '#8b5cf6'
    },
    [CATEGORIES.SLEEP]: {
      name: 'Sleep',
      description: 'Prepare for rest',
      icon: '🌙',
      gradient: ['#e0e7ff', '#c7d2fe'],
      color: '#6366f1'
    }
  };
  return categoryMap[category] || categoryMap[CATEGORIES.CALM];
};

export const getCategoryExercises = (category: string) => {
  return breathingExercises.filter(exercise => exercise.category === category);
};