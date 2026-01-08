import { Chess, Square } from 'chess.js';

export const isValidMove = (game: Chess, from: Square, to: Square): boolean => {
  const moves = game.moves({ verbose: true });
  return moves.some(move => move.from === from && move.to === to);
};

export const getGameStatus = (game: Chess): string => {
  if (game.isCheckmate()) {
    return `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`;
  }
  if (game.isDraw()) {
    return 'Draw!';
  }
  if (game.isStalemate()) {
    return 'Stalemate!';
  }
  if (game.isCheck()) {
    return `Check! ${game.turn() === 'w' ? 'White' : 'Black'} to move`;
  }
  return `${game.turn() === 'w' ? 'White' : 'Black'} to move`;
};
