import React, { useState } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import ExerciseScreen from './components/ExerciseScreen';
import { BreathingExercise } from './types/BreathingExercise';

function App() {
  const [currentExercise, setCurrentExercise] = useState<BreathingExercise | null>(null);

  const handleStartExercise = (exercise: BreathingExercise) => {
    setCurrentExercise(exercise);
  };

  const handleExitExercise = () => {
    setCurrentExercise(null);
  };

  return (
    <div className="App">
      {currentExercise ? (
        <ExerciseScreen 
          exercise={currentExercise} 
          onExit={handleExitExercise}
        />
      ) : (
        <HomeScreen onStartExercise={handleStartExercise} />
      )}
    </div>
  );
}

export default App;