# ♔ Chess Game - 1v1 & AI Bot

A full-featured chess game built with Next.js, React, and TypeScript. Play against a friend locally or challenge an AI bot with multiple difficulty levels.

## 🎮 Features

- **1v1 Mode**: Play chess against a friend on the same device
- **AI Bot Mode**: Challenge an AI opponent with three difficulty levels:
  - **Easy**: Random moves, perfect for beginners
  - **Medium**: Strategic AI using minimax algorithm (depth 2)
  - **Hard**: Advanced AI with deeper analysis (depth 3)
- **Move History**: Track all moves made during the game
- **Game Status**: Real-time updates on check, checkmate, stalemate, and draws
- **Responsive Design**: Beautiful UI that works on all screen sizes
- **Legal Move Validation**: Only valid chess moves are allowed

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chrisiverrr266-bot/chess-game-app)

### Quick Deploy Steps:

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Vercel will automatically:
   - Clone this repository
   - Install dependencies
   - Build the project
   - Deploy to production

### Manual Deploy:

1. Fork or clone this repository
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and configure settings
4. Click "Deploy"

## 💻 Local Development

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/chrisiverrr266-bot/chess-game-app.git

# Navigate to the project directory
cd chess-game-app

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Chess Logic**: [chess.js](https://github.com/jhlywa/chess.js)
- **Chess UI**: [react-chessboard](https://github.com/Clariity/react-chessboard)
- **Styling**: Tailwind CSS
- **AI Algorithm**: Minimax with Alpha-Beta Pruning

## 📁 Project Structure

```
chess-game-app/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── ChessBoard.tsx    # Main chess board component
│   └── GameModeSelector.tsx  # Game mode selection UI
├── lib/
│   ├── ai-bot.ts         # AI bot logic
│   └── chess-logic.ts    # Chess utilities
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🎯 How to Play

1. **Select Game Mode**:
   - Choose "1v1 Mode" to play locally with a friend
   - Choose "Play with Bot" to challenge the AI

2. **Playing the Game**:
   - Click on a piece to select it
   - Click on a valid square to move
   - The game automatically switches turns
   - In bot mode, the AI will respond after your move

3. **Game Controls**:
   - **New Game**: Start a fresh game
   - **Back to Menu**: Return to mode selection

## 🤖 AI Algorithm

The bot uses the **Minimax algorithm with Alpha-Beta pruning** to make intelligent moves:

- **Evaluation Function**: Assigns values to pieces (Pawn=1, Knight/Bishop=3, Rook=5, Queen=9)
- **Depth Search**: 
  - Easy: Random moves
  - Medium: 2-ply search
  - Hard: 3-ply search
- **Optimization**: Alpha-Beta pruning reduces computational complexity

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

Created by [chrisiverrr266-bot](https://github.com/chrisiverrr266-bot)

---

Enjoy playing chess! ♟️
