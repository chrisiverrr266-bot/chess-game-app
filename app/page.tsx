'use client';

import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import ChessBoard from '@/components/ChessBoard';
import OnlineChessBoard from '@/components/OnlineChessBoard';
import GameModeSelector from '@/components/GameModeSelector';
import AuthButton from '@/components/AuthButton';

function HomeContent() {
  const [gameMode, setGameMode] = useState<'menu' | '1v1' | 'online' | 'bot'>('menu');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const handleGameModeSelect = (mode: '1v1' | 'online' | 'bot', diff?: 'easy' | 'medium' | 'hard') => {
    setGameMode(mode);
    if (diff) setDifficulty(diff);
  };

  const handleBackToMenu = () => {
    setGameMode('menu');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 right-6">
        <AuthButton />
      </div>

      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-2">
            ♔ Chess Master ♚
          </h1>
          <p className="text-white/70 text-sm font-medium tracking-wide">
            Made by <span className="text-blue-300 font-semibold">Chris Iver</span>
          </p>
        </div>
        
        {gameMode === 'menu' ? (
          <GameModeSelector onSelectMode={handleGameModeSelect} />
        ) : gameMode === 'online' ? (
          <OnlineChessBoard onBack={handleBackToMenu} />
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
                {gameMode === '1v1' ? 'Local 1v1 Mode' : `Bot Mode (${difficulty})`}
              </div>
            </div>
            <ChessBoard mode={gameMode} difficulty={difficulty} />
          </div>
        )}

        <footer className="text-center mt-8 text-gray-400 text-sm">
          <p>Built with Next.js • Socket.io • NextAuth</p>
          <p className="mt-1">Deploy on Vercel in minutes</p>
        </footer>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <SessionProvider>
      <HomeContent />
    </SessionProvider>
  );
}
