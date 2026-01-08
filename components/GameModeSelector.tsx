'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface GameModeSelectorProps {
  onSelectMode: (mode: '1v1' | 'online' | 'bot', difficulty?: 'easy' | 'medium' | 'hard') => void;
}

export default function GameModeSelector({ onSelectMode }: GameModeSelectorProps) {
  const { data: session } = useSession();
  const [selectedMode, setSelectedMode] = useState<'1v1' | 'online' | 'bot' | null>(null);

  const handleModeClick = (mode: '1v1' | 'online' | 'bot') => {
    if (mode === '1v1' || mode === 'online') {
      onSelectMode(mode);
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
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <button
        onClick={() => handleModeClick('1v1')}
        className="group bg-gradient-to-br from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white p-12 rounded-2xl shadow-2xl transition-all transform hover:scale-105"
      >
        <div className="text-6xl mb-4">👥</div>
        <h2 className="text-3xl font-bold mb-4">Local 1v1</h2>
        <p className="text-lg text-blue-100">Play on same device</p>
        <p className="text-sm text-blue-200 mt-2">Pass and play locally</p>
      </button>

      <button
        onClick={() => handleModeClick('online')}
        disabled={!session}
        className="group bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white p-12 rounded-2xl shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative"
      >
        <div className="text-6xl mb-4">🌐</div>
        <h2 className="text-3xl font-bold mb-4">Online 1v1</h2>
        <p className="text-lg text-cyan-100">Play with anyone online</p>
        <p className="text-sm text-cyan-200 mt-2">Real-time multiplayer</p>
        {!session && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
            <span className="text-white font-bold text-lg">Sign in required</span>
          </div>
        )}
      </button>

      <button
        onClick={() => handleModeClick('bot')}
        className="group bg-gradient-to-br from-purple-600 to-pink-700 hover:from-purple-500 hover:to-pink-600 text-white p-12 rounded-2xl shadow-2xl transition-all transform hover:scale-105"
      >
        <div className="text-6xl mb-4">🤖</div>
        <h2 className="text-3xl font-bold mb-4">Play with Bot</h2>
        <p className="text-lg text-purple-100">Challenge the AI</p>
        <p className="text-sm text-purple-200 mt-2">Multiple difficulty levels</p>
      </button>
    </div>
  );
}
