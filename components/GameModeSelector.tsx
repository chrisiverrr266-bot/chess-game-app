'use client';

import { useState } from 'react';

interface GameModeSelectorProps {
  onSelectMode: (mode: '1v1' | 'bot', difficulty?: 'easy' | 'medium' | 'hard') => void;
}

export default function GameModeSelector({ onSelectMode }: GameModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<'1v1' | 'bot' | null>(null);

  const handleModeClick = (mode: '1v1' | 'bot') => {
    if (mode === '1v1') {
      onSelectMode('1v1');
    } else {
      setSelectedMode('bot');
    }
  };

  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    onSelectMode('bot', difficulty);
  };

  if (selectedMode === 'bot') {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setSelectedMode(null)}
          className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          ← Back
        </button>
        
        <div className="grid gap-6">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Select Difficulty</h2>
          
          <div className="grid gap-4">
            <button
              onClick={() => handleDifficultySelect('easy')}
              className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white p-8 rounded-xl shadow-xl transition-all transform hover:scale-105"
            >
              <div className="text-4xl mb-2">😊</div>
              <h3 className="text-2xl font-bold mb-2">Easy</h3>
              <p className="text-green-100">Perfect for beginners</p>
            </button>

            <button
              onClick={() => handleDifficultySelect('medium')}
              className="group bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white p-8 rounded-xl shadow-xl transition-all transform hover:scale-105"
            >
              <div className="text-4xl mb-2">🤔</div>
              <h3 className="text-2xl font-bold mb-2">Medium</h3>
              <p className="text-yellow-100">A balanced challenge</p>
            </button>

            <button
              onClick={() => handleDifficultySelect('hard')}
              className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white p-8 rounded-xl shadow-xl transition-all transform hover:scale-105"
            >
              <div className="text-4xl mb-2">🔥</div>
              <h3 className="text-2xl font-bold mb-2">Hard</h3>
              <p className="text-red-100">For experienced players</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <button
        onClick={() => handleModeClick('1v1')}
        className="group bg-gradient-to-br from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white p-12 rounded-2xl shadow-2xl transition-all transform hover:scale-105"
      >
        <div className="text-6xl mb-4">👥</div>
        <h2 className="text-3xl font-bold mb-4">1v1 Mode</h2>
        <p className="text-lg text-blue-100">Play against a friend locally</p>
        <p className="text-sm text-blue-200 mt-2">Take turns on the same device</p>
      </button>

      <button
        onClick={() => handleModeClick('bot')}
        className="group bg-gradient-to-br from-purple-600 to-pink-700 hover:from-purple-500 hover:to-pink-600 text-white p-12 rounded-2xl shadow-2xl transition-all transform hover:scale-105"
      >
        <div className="text-6xl mb-4">🤖</div>
        <h2 className="text-3xl font-bold mb-4">Play with Bot</h2>
        <p className="text-lg text-purple-100">Challenge the AI opponent</p>
        <p className="text-sm text-purple-200 mt-2">Multiple difficulty levels</p>
      </button>
    </div>
  );
}
