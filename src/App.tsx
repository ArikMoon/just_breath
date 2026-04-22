import React, { useState } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import ExerciseSetup from './components/ExerciseSetup';
import ExerciseScreen from './components/ExerciseScreen';
import { BreathingExercise } from './types/BreathingExercise';
import { SessionSettings } from './themes';

type View =
  | { kind: 'home' }
  | { kind: 'setup'; exercise: BreathingExercise }
  | { kind: 'session'; exercise: BreathingExercise; settings: SessionSettings };

function App() {
  const [view, setView] = useState<View>({ kind: 'home' });

  return (
    <div className="App">
      {view.kind === 'home' && (
        <HomeScreen
          onStartExercise={(exercise) => setView({ kind: 'setup', exercise })}
        />
      )}
      {view.kind === 'setup' && (
        <ExerciseSetup
          exercise={view.exercise}
          onBack={() => setView({ kind: 'home' })}
          onStart={(settings) =>
            setView({ kind: 'session', exercise: view.exercise, settings })
          }
        />
      )}
      {view.kind === 'session' && (
        <ExerciseScreen
          exercise={view.exercise}
          settings={view.settings}
          onExit={() => setView({ kind: 'home' })}
        />
      )}
    </div>
  );
}

export default App;
