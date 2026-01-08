'use client';

import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { makeAIMove } from '@/lib/ai-bot';

interface ChessBoardProps {
  mode: '1v1' | 'bot';
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function ChessBoard({ mode, difficulty }: ChessBoardProps) {
  const [game, setGame] = useState(new Chess());
  const [gameStatus, setGameStatus] = useState('');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  useEffect(() => {
    updateGameStatus();
  }, [game]);

  const updateGameStatus = () => {
    if (game.isCheckmate()) {
      setGameStatus(`Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`);
    } else if (game.isDraw()) {
      setGameStatus('Draw!');
    } else if (game.isStalemate()) {
      setGameStatus('Stalemate!');
    } else if (game.isCheck()) {
      setGameStatus(`Check! ${game.turn() === 'w' ? 'White' : 'Black'} to move`);
    } else {
      setGameStatus(`${game.turn() === 'w' ? 'White' : 'Black'} to move`);
    }
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) return false;

      setGame(new Chess(game.fen()));
      setMoveHistory([...moveHistory, move.san]);

      // AI move in bot mode
      if (mode === 'bot' && !game.isGameOver()) {
        setTimeout(() => {
          const aiMove = makeAIMove(game, difficulty);
          if (aiMove) {
            setGame(new Chess(game.fen()));
            setMoveHistory(prev => [...prev, aiMove.san]);
          }
        }, 300);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setMoveHistory([]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <div className="flex-1 max-w-2xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-2xl">
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            boardWidth={Math.min(600, typeof window !== 'undefined' ? window.innerWidth - 80 : 600)}
          />
        </div>
        
        <div className="mt-4 flex gap-4 justify-center">
          <button
            onClick={resetGame}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
          >
            New Game
          </button>
        </div>

        <div className="mt-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-xl font-bold text-white">{gameStatus}</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-64 bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-white font-bold mb-3 text-lg">Move History</h3>
        <div className="max-h-96 overflow-y-auto space-y-1">
          {moveHistory.length === 0 ? (
            <p className="text-gray-300 text-sm">No moves yet</p>
          ) : (
            moveHistory.map((move, index) => (
              <div key={index} className="text-gray-200 text-sm">
                <span className="font-semibold">{Math.floor(index / 2) + 1}.</span>
                {index % 2 === 0 ? ' ' : '... '}
                {move}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
