# 🎮 Tamaclaude

A Tamagotchi-style virtual pet game with Solana wallet integration and persistent high scores.

![Tamaclaude Screenshot](screenshot.png)

## ✨ Features

- 🐾 **Cute Pixel Pet** - Animated sprite with 4 states (idle, eating, playing, sleeping)
- 📊 **Pet Stats** - Hunger, Happiness, and Energy that decay over time
- ⏱️ **5-Minute Cooldowns** - Strategic gameplay with timed actions
- 💀 **Death System** - Pet dies when any stat hits zero
- 🏆 **Scoring** - 1 point per second alive + 100 points per action
- 👛 **Solana Wallet** - Connect Phantom or Solflare
- 🗃️ **MongoDB Persistence** - Scores saved per wallet address
- 📋 **Global Leaderboard** - Compete for high scores

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- MongoDB Atlas account (free tier works)
- Phantom or Solflare wallet (optional)

### Installation

```bash
# Clone the repo
git clone https://github.com/sp3aker2020/Tamaclaude.git
cd Tamaclaude

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB connection string

# Run frontend (port 5173)
npm run dev

# Run API server (port 3001) - in another terminal
npm run server
```

## 🎮 How to Play

1. **Connect Wallet** (optional) - Link your Solana wallet for score persistence
2. **Care for Your Pet** - Use the action buttons:
   - 🍔 **Feed** - Increases hunger (+25)
   - 🎮 **Play** - Increases happiness (+20), costs energy (-15)
   - 💤 **Sleep** - Increases energy (+30)
3. **Keep Stats Up** - All stats decay over time
4. **Don't Let Stats Hit Zero** - Or your pet dies!
5. **Beat Your High Score** - Scores are saved to the global leaderboard

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Styling | Vanilla CSS with glassmorphism |
| Wallet | @solana/wallet-adapter |
| Backend | Express.js |
| Database | MongoDB Atlas |
| Deployment | Render |

## 📁 Project Structure

```
├── src/                    # Frontend
│   ├── api/               # API client
│   ├── components/        # React components
│   ├── hooks/             # Custom hooks
│   └── assets/            # Sprites
├── server/                # Backend API
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   └── utils/             # Helpers
├── render.yaml            # Render deployment config
└── .env.example           # Environment template
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/scores` | Save a score |
| GET | `/api/scores/:wallet` | Get wallet history |
| GET | `/api/scores/leaderboard/top` | Global leaderboard |

## 🚢 Deploying to Render

1. Push code to GitHub
2. Create new **Blueprint** on [render.com](https://render.com)
3. Connect your repo (auto-detects `render.yaml`)
4. Set environment variables:
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `VITE_API_URL` - Your API service URL

## 📝 License

MIT

## 🙏 Credits

Built with ❤️ using React, Solana, and MongoDB.
