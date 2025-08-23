import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { BreathingExercise } from '../types/BreathingExercise';
import { breathingExercises, CATEGORIES, getCategoryInfo } from '../data/exercises';
import './HomeScreen.css';

interface SimpleHomeScreenProps {
  onStartExercise: (exercise: BreathingExercise) => void;
}

const SimpleHomeScreen: React.FC<SimpleHomeScreenProps> = ({ onStartExercise }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredExercises = selectedCategory === 'all' 
    ? breathingExercises 
    : breathingExercises.filter(exercise => exercise.category === selectedCategory);

  const popularExercises = [
    breathingExercises.find(e => e.id === 'four_seven_eight'),
    breathingExercises.find(e => e.id === 'box_breathing'),
    breathingExercises.find(e => e.id === 'wim_hof'),
    breathingExercises.find(e => e.id === 'coherent_breathing')
  ].filter(Boolean) as BreathingExercise[];

  const getExerciseEmoji = (category: string) => {
    switch (category) {
      case 'calm': return '😌';
      case 'energy': return '⚡';
      case 'focus': return '🎯';
      case 'sleep': return '🌙';
      default: return '🫁';
    }
  };

  return (
    <div className="home-screen">
      {/* Header */}
      <motion.div 
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="app-title">Breathe</h1>
        <button className="menu-button">
          <Settings size={20} />
        </button>
      </motion.div>

      {/* Quick Categories - Simple Version */}
      <motion.div 
        className="quick-categories"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <motion.button 
          className="quick-category-card calm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedCategory(CATEGORIES.CALM)}
        >
          <span className="quick-category-icon">😌</span>
          <span className="quick-category-title">Calm</span>
        </motion.button>
        
        <motion.button 
          className="quick-category-card energy"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedCategory(CATEGORIES.ENERGY)}
        >
          <span className="quick-category-icon">⚡</span>
          <span className="quick-category-title">Energy</span>
        </motion.button>
        
        <motion.button 
          className="quick-category-card focus"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedCategory(CATEGORIES.FOCUS)}
        >
          <span className="quick-category-icon">🎯</span>
          <span className="quick-category-title">Focus</span>
        </motion.button>
        
        <motion.button 
          className="quick-category-card sleep"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedCategory(CATEGORIES.SLEEP)}
        >
          <span className="quick-category-icon">🌙</span>
          <span className="quick-category-title">Sleep</span>
        </motion.button>
      </motion.div>

      {/* Section Header */}
      <motion.div 
        className="section-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="section-title">
          {selectedCategory === 'all' ? 'Popular Exercises' : `${getCategoryInfo(selectedCategory).name} Exercises`}
        </h2>
      </motion.div>

      {/* Exercises List */}
      <motion.div 
        className="exercises-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {(selectedCategory === 'all' ? popularExercises : filteredExercises).map((exercise, index) => (
          <motion.div
            key={exercise.id}
            className="exercise-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStartExercise(exercise)}
          >
            <div className="exercise-icon">
              <span className="exercise-emoji">
                {getExerciseEmoji(exercise.category)}
              </span>
            </div>
            <div className="exercise-info">
              <h3 className="exercise-title">{exercise.name}</h3>
              <p className="exercise-subtitle">{exercise.description}</p>
            </div>
            <div className="exercise-duration">
              {exercise.duration ? `${exercise.duration} min` : `${exercise.rounds || 8} rounds`}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Navigation */}
      <motion.div 
        className="bottom-nav"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <button className="nav-item active">
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </button>
        <button className="nav-item" onClick={() => setSelectedCategory('all')}>
          <span className="nav-icon">🫁</span>
          <span className="nav-label">Breathe</span>
        </button>
        <button className="nav-item" onClick={() => setSelectedCategory(CATEGORIES.SLEEP)}>
          <span className="nav-icon">😴</span>
          <span className="nav-label">Sleep</span>
        </button>
        <button className="nav-item">
          <span className="nav-icon">📚</span>
          <span className="nav-label">Learn</span>
        </button>
      </motion.div>
    </div>
  );
};

export default SimpleHomeScreen;
