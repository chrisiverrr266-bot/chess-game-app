const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const waitingPlayers = [];
const games = new Map();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    path: '/api/socket',
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinGame', ({ userName }) => {
      console.log(`${userName} (${socket.id}) wants to join a game`);

      if (waitingPlayers.length > 0) {
        const opponent = waitingPlayers.shift();
        const roomId = `${socket.id}-${opponent.id}`;
        
        socket.join(roomId);
        opponent.socket.join(roomId);

        const whitePlayer = Math.random() < 0.5 ? socket : opponent.socket;
        const blackPlayer = whitePlayer === socket ? opponent.socket : socket;

        games.set(roomId, {
          white: { id: whitePlayer.id, name: whitePlayer === socket ? userName : opponent.name },
          black: { id: blackPlayer.id, name: blackPlayer === socket ? userName : opponent.name },
        });

        whitePlayer.emit('gameStart', {
          roomId,
          color: 'white',
          opponentName: blackPlayer === socket ? userName : opponent.name,
        });

        blackPlayer.emit('gameStart', {
          roomId,
          color: 'black',
          opponentName: whitePlayer === socket ? userName : opponent.name,
        });

        console.log(`Game started: ${roomId}`);
      } else {
        waitingPlayers.push({ socket, id: socket.id, name: userName });
        console.log(`${userName} added to waiting list`);
      }
    });

    socket.on('makeMove', ({ roomId, fen, move }) => {
      socket.to(roomId).emit('moveMade', { fen, move });
    });

    socket.on('leaveGame', () => {
      const index = waitingPlayers.findIndex(p => p.id === socket.id);
      if (index !== -1) {
        waitingPlayers.splice(index, 1);
      }

      games.forEach((game, roomId) => {
        if (game.white.id === socket.id || game.black.id === socket.id) {
          socket.to(roomId).emit('opponentDisconnected');
          games.delete(roomId);
        }
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      const index = waitingPlayers.findIndex(p => p.id === socket.id);
      if (index !== -1) {
        waitingPlayers.splice(index, 1);
      }

      games.forEach((game, roomId) => {
        if (game.white.id === socket.id || game.black.id === socket.id) {
          socket.to(roomId).emit('opponentDisconnected');
          games.delete(roomId);
        }
      });
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
