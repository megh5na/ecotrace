# EcoTrace

Carbon tracking system with IoT device integration, activity logging, and a carbon credits rewards program.

## Features

- IoT device integration for automatic carbon tracking
- Manual activity logging for transportation and energy usage
- Carbon credits system with environmental project allocation
- Location-based transit recommendations
- Sustainable vendor rewards program
- Real-time dashboard with activity tracking

## Tech Stack

- Frontend: React, TypeScript, Vite, TailwindCSS, shadcn/ui
- Backend: Express.js, Node.js
- Database: Drizzle ORM with Neon (PostgreSQL)
- State: React Context API
- Storage: Browser localStorage

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd EcoTraceUI
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser to `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes

## Project Structure

```
EcoTraceUI/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and state management
│   │   └── main.tsx       # Application entry point
│   └── index.html
├── server/                # Backend Express server
│   ├── index.ts          # Server entry point
│   └── routes.ts         # API routes
└── shared/               # Shared types and utilities
```

## How It Works

### Carbon Credits

- Earn 10 credits for every kg of CO₂ saved
- Low-carbon activities (biking, walking, public transit) earn more credits
- Allocate credits to local environmental projects
- Redeem credits at sustainable vendor partners

### Activity Tracking

1. **Automatic Tracking** (IoT mockup) - Displays simulated data from connected devices
2. **Manual Tracking** (Fully functional) - Log activities and see live updates across the app

### Data Persistence

All manually logged activities and credit transactions are saved to browser localStorage and persist across sessions.

## License

MIT

## Author

Meghana Yamajala