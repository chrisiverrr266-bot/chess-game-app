# ♔ Chess Master - Online Multiplayer Chess Game

**Made by Chris Iver**

A full-featured online chess game with real-time multiplayer, AI bot opponents, and Google authentication. Built with Next.js, Socket.io, and NextAuth.

## 🎮 Features

### Game Modes
- **Local 1v1**: Play chess with a friend on the same device
- **Online 1v1**: Real-time multiplayer chess with anyone worldwide via Socket.io
- **AI Bot**: Challenge an intelligent AI with three difficulty levels

### Authentication
- **Google Sign-In**: Quick authentication with your Google account
- **Email/Password**: Create an account with email and password
- **Session Management**: Secure session handling with NextAuth

### Gameplay Features
- Real-time move synchronization for online games
- Move history tracking
- Legal move validation
- Check, checkmate, and stalemate detection
- Automatic matchmaking for online games
- Player disconnection handling
- Beautiful gradient UI with responsive design

### AI Difficulty Levels
- **Easy**: Random moves for beginners
- **Medium**: Minimax algorithm (depth 2)
- **Hard**: Advanced minimax with alpha-beta pruning (depth 3)

## 🚀 Deploy to Vercel

### Prerequisites
1. **PostgreSQL Database** (recommended: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or [Supabase](https://supabase.com/))
2. **Google OAuth Credentials** from [Google Cloud Console](https://console.cloud.google.com/)

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chrisiverrr266-bot/chess-game-app)

### Environment Variables Setup

1. After importing to Vercel, add these environment variables:

```bash
# Database (use Vercel Postgres or your PostgreSQL URL)
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Socket.io
NEXT_PUBLIC_SOCKET_URL="https://your-app.vercel.app"
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Application type: "Web application"
6. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://your-app.vercel.app/api/auth/callback/google` (for production)
7. Copy Client ID and Client Secret to environment variables

### Database Setup

1. **Vercel Postgres** (Recommended):
   - Go to your Vercel project dashboard
   - Navigate to "Storage" tab
   - Create a Postgres database
   - Copy the `DATABASE_URL` to environment variables

2. **After deployment**, run migrations:
   ```bash
   npx prisma migrate deploy
   ```

## 💻 Local Development

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL database
- Google OAuth credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/chrisiverrr266-bot/chess-game-app.git
cd chess-game-app

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your credentials
# For local development, you can use SQLite:
# DATABASE_URL="file:./dev.db"

# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

### Running Development Server

```bash
# Start the development server with Socket.io
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: Socket.io for multiplayer
- **Chess Logic**: chess.js
- **Chess UI**: react-chessboard
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 📁 Project Structure

```
chess-game-app/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth configuration
│   │   └── register/             # User registration endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Main page with game modes
├── components/
│   ├── AuthButton.tsx            # Authentication UI
│   ├── ChessBoard.tsx            # Local/AI chess board
│   ├── OnlineChessBoard.tsx      # Online multiplayer board
│   └── GameModeSelector.tsx      # Game mode selection
├── lib/
│   ├── ai-bot.ts                 # AI logic
│   ├── chess-logic.ts            # Chess utilities
│   └── socket.ts                 # Socket.io client
├── prisma/
│   └── schema.prisma             # Database schema
├── server.js                     # Socket.io server
└── package.json
```

## 🎯 How to Play

### Online Multiplayer
1. Sign in with Google or create an account
2. Click "Online 1v1"
3. Wait for matchmaking to find an opponent
4. Play in real-time!

### Local 1v1
1. Click "Local 1v1"
2. Play with a friend on the same device
3. Take turns making moves

### AI Bot
1. Click "Play with Bot"
2. Select difficulty level
3. Challenge the AI!

## 🤖 AI Algorithm

The chess bot uses **Minimax algorithm with Alpha-Beta pruning**:

- **Evaluation**: Material-based (Pawn=1, Knight/Bishop=3, Rook=5, Queen=9)
- **Search Depth**:
  - Easy: Random moves
  - Medium: 2-ply minimax
  - Hard: 3-ply minimax with pruning

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based sessions
- CSRF protection
- Secure cookie handling
- Environment variable validation

## 📝 License

MIT License - Free to use for personal and commercial projects.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

## 📧 Contact

**Created by Chris Iver**
- GitHub: [@chrisiverrr266-bot](https://github.com/chrisiverrr266-bot)

---

Enjoy playing Chess Master! ♟️
