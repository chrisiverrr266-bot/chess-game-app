'use client';

import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { initSocket } from '@/lib/socket';
import { useSession } from 'next-auth/react';

interface OnlineChessBoardProps {
  onBack: () => void;
}

export default function OnlineChessBoard({ onBack }: OnlineChessBoardProps) {
  const { data: session } = useSession();
  const [game, setGame] = useState(new Chess());
  const [gameStatus, setGameStatus] = useState('Waiting for opponent...');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [roomId, setRoomId] = useState<string>('');
  const [playerColor, setPlayerColor] = useState<'white' | 'black' | null>(null);
  const [opponentName, setOpponentName] = useState<string>('');
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socketInstance = initSocket();
    setSocket(socketInstance);

    socketInstance.emit('joinGame', { 
      userName: session?.user?.name || 'Anonymous'
    });

    socketInstance.on('gameStart', ({ roomId, color, opponentName }) => {
      setRoomId(roomId);
      setPlayerColor(color);
      setOpponentName(opponentName);
      setGameStatus(`${color === 'white' ? 'White' : 'Black'} to move`);
    });

    socketInstance.on('moveMade', ({ fen, move }) => {
      const newGame = new Chess(fen);
      setGame(newGame);
      setMoveHistory(prev => [...prev, move]);
      updateGameStatus(newGame);
    });

    socketInstance.on('opponentDisconnected', () => {
      setGameStatus('Opponent disconnected');
    });

    return () => {
      socketInstance.emit('leaveGame');
      socketInstance.off('gameStart');
      socketInstance.off('moveMade');
      socketInstance.off('opponentDisconnected');
    };
  }, [session]);

  const updateGameStatus = (currentGame: Chess) => {
    if (currentGame.isCheckmate()) {
      setGameStatus(`Checkmate! ${currentGame.turn() === 'w' ? 'Black' : 'White'} wins!`);
    } else if (currentGame.isDraw()) {
      setGameStatus('Draw!');
    } else if (currentGame.isStalemate()) {
      setGameStatus('Stalemate!');
    } else if (currentGame.isCheck()) {
      setGameStatus(`Check! ${currentGame.turn() === 'w' ? 'White' : 'Black'} to move`);
    } else {
      setGameStatus(`${currentGame.turn() === 'w' ? 'White' : 'Black'} to move`);
    }
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    // Check if it's player's turn
    if (
      (game.turn() === 'w' && playerColor !== 'white') ||
      (game.turn() === 'b' && playerColor !== 'black')
    ) {
      return false;
    }

    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) return false;

      const newGame = new Chess(game.fen());
      setGame(newGame);
      setMoveHistory([...moveHistory, move.san]);
      updateGameStatus(newGame);

      // Emit move to server
      socket?.emit('makeMove', {
        roomId,
        fen: newGame.fen(),
        move: move.san,
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <div className="flex-1 max-w-2xl mx-auto w-full">
        <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-4 rounded-xl shadow-2xl">
          <div className="mb-4 bg-white/80 backdrop-blur-sm rounded-lg p-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${playerColor === 'black' ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
                <span className="font-semibold text-gray-800">{opponentName || 'Waiting...'}</span>
              </div>
              <span className="text-gray-600">Room: {roomId.slice(0, 8) || 'Connecting...'}</span>
            </div>
          </div>

          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            boardOrientation={playerColor || 'white'}
            boardWidth={Math.min(600, typeof window !== 'undefined' ? window.innerWidth - 80 : 600)}
          />

          <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-lg p-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${playerColor === 'white' ? 'bg-white border-2 border-gray-800' : 'bg-gray-300'}`}></div>
                <span className="font-semibold text-gray-800">{session?.user?.name || 'You'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex gap-4 justify-center">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors shadow-lg"
          >
            Leave Game
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
