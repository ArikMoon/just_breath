export interface Theme {
  id: string;
  name: string;
  accent: string;
  bg1: string;
  bg2: string;
}

export const THEMES: Theme[] = [
  { id: 'auto',       name: 'Auto',       accent: '',         bg1: '',                      bg2: ''                       },
  { id: 'ocean',      name: 'Ocean',      accent: '#5ce1e6',  bg1: 'rgba(92,225,230,0.28)', bg2: 'rgba(58,123,180,0.35)'  },
  { id: 'forest',     name: 'Forest',     accent: '#86d39a',  bg1: 'rgba(134,211,154,0.25)',bg2: 'rgba(63,132,96,0.35)'   },
  { id: 'lavender',   name: 'Lavender',   accent: '#c8a7ff',  bg1: 'rgba(200,167,255,0.28)',bg2: 'rgba(120,90,180,0.35)'  },
  { id: 'sunset',     name: 'Sunset',     accent: '#ffb86b',  bg1: 'rgba(255,184,107,0.30)',bg2: 'rgba(255,122,156,0.28)' },
  { id: 'moonlight',  name: 'Moonlight',  accent: '#8aa0ff',  bg1: 'rgba(138,160,255,0.25)',bg2: 'rgba(36,45,70,0.55)'    },
  { id: 'rose',       name: 'Rose',       accent: '#ffb3c6',  bg1: 'rgba(255,179,198,0.28)',bg2: 'rgba(200,120,160,0.32)' },
  { id: 'sand',       name: 'Sand',       accent: '#e8c39e',  bg1: 'rgba(232,195,158,0.25)',bg2: 'rgba(150,110,80,0.35)'  },
];

export function themeById(id: string): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

export type AnimationStyle = 'orb' | 'box' | 'hill';

export const ANIMATIONS: { id: AnimationStyle; name: string; hint: string }[] = [
  { id: 'orb',  name: 'Orb',  hint: 'Expanding circle' },
  { id: 'box',  name: 'Box',  hint: 'Dot around a square' },
  { id: 'hill', name: 'Hill', hint: 'Up on inhale, down on exhale' },
];

export interface SessionSettings {
  durationMin?: number;
  rounds?: number;
  animation: AnimationStyle;
  themeId: string;
}
