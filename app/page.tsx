'use client';

import { useState } from 'react';
import ChessBoard from '@/components/ChessBoard';
import GameModeSelector from '@/components/GameModeSelector';

export default function Home() {
  const [gameMode, setGameMode] = useState<'menu' | '1v1' | 'bot'>('menu');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const handleGameModeSelect = (mode: '1v1' | 'bot', diff?: 'easy' | 'medium' | 'hard') => {
    setGameMode(mode);
    if (diff) setDifficulty(diff);
  };

  const handleBackToMenu = () => {
    setGameMode('menu');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-center mb-8 text-white drop-shadow-lg">
          ♔ Chess Master ♚
        </h1>
        
        {gameMode === 'menu' ? (
          <GameModeSelector onSelectMode={handleGameModeSelect} />
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBackToMenu}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                ← Back to Menu
              </button>
              <div className="text-white text-lg font-semibold">
                {gameMode === '1v1' ? '1v1 Mode' : `Bot Mode (${difficulty})`}
              </div>
            </div>
            <ChessBoard mode={gameMode} difficulty={difficulty} />
          </div>
        )}

        <footer className="text-center mt-8 text-gray-400 text-sm">
          <p>Built with Next.js • Deploy on Vercel</p>
        </footer>
      </div>
    </main>
  );
}
