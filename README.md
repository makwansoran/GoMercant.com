# GoMercant - Technical Procurement Marketplace

A modern, iOS-native style technical procurement marketplace platform built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🎯 Overview

MissionControl is a platform where organizations post missions for digital deliverables (Code, CAD, Datasets, AI Models, Designs) without hiring. Users submit their best work, organizations accept the best submission, and users get paid based on their reputation and work quality.

**Key Philosophy**: No Resume Vetting → Pure Meritocracy → Reputation-Based Economy

## ✨ Features

### 🏠 Mission Feed
- **Scrollable Mission List**: Browse all available missions
- **Smart Filtering**: Filter by deliverable type (Code, CAD, Data, Design, Autonomous Systems)
- **Full-Text Search**: Search missions by title, description, or tags
- **Mission Cards**: Beautiful iOS-style cards showing:
  - Deliverable Type with Icons
  - Bolded Bounty Amount
  - Mission Title & 2-Line Description
  - Reputation Badge (Star Rating)
  - Submission Count
  - Mission Status

### 📋 Mission Details (Bottom Sheet Modal)
Three-tabbed interface:
1. **Details Tab**:
   - Full mission description
   - Bounty amount prominently displayed
   - Mission metadata (Type, Deadline, Status, Submissions)
   - Poster information with rating
   - Accepted file types

2. **Submit Tab**:
   - Drag-and-drop file upload zone
   - Click-to-browse file selection
   - Real-time file validation
   - Visual feedback on submission status
   - Support for: .zip, .cad, .json, .py, .ts, .js, .stp, .step, .stl, .csv

3. **Reviews Tab**:
   - Display completed mission reviews
   - Star ratings from mission posters
   - Reviewer comments
   - Empty state for open missions

### 🎨 User Profile
Comprehensive user profile dashboard displaying:
- User avatar and bio
- **Reputation Stats**:
  - 5-star rating (from mission posters)
  - Total missions completed
  - Total earned ($)
  - Success rate (%) with animated progress bar
- **Skills**: Tag-based skill display
- **Proof of Work**: Gallery of completed missions with bounties and star ratings

### 📱 Activity Feed
Track submission progress with:
- Mission status indicators (Pending Review, Completed)
- Completion badges with earned amounts
- Star ratings for completed work
- Timeline view of all user activities

### ➕ Create Mission (Org View)
Form to post new missions with:
- Mission title input
- Detailed description textarea
- Bounty amount specification
- Deliverable type selection dropdown
- Form validation and submission

### 🧭 Bottom Navigation
iOS-style fixed tab bar with:
- **Search** (🔍): Discover missions
- **Create** (➕): Post new missions
- **Activity** (⚡): Track submissions
- **Profile** (👤): View user stats
- Animated tab selection indicator

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 10
- **Icons**: Lucide React
- **Font**: San Francisco System Font Stack (iOS Native)

## 🎨 Design System

### Colors
- **Background**: `#F2F2F7` (iOS Light Gray)
- **Cards**: Pure White (`#FFFFFF`)
- **Primary**: Blue (`#007AFF`)
- **Text**: Black/Gray scale

### Typography
- **Font Family**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'San Francisco'`
- Follows iOS Human Interface Guidelines

### Components
- **Border Radius**: 20px (iOS-style)
- **Shadows**: Subtle iOS-style shadows
- **Spacing**: Consistent 4px/8px/12px/16px grid

## 📂 Project Structure

```
mercator/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main app entry point
│   ├── globals.css         # Global styles
├── components/
│   ├── MissionCard.tsx     # Individual mission card
│   ├── MissionDetail.tsx   # Bottom sheet detail view
│   ├── MissionFeed.tsx     # Mission list & filtering
│   ├── BottomNavBar.tsx    # Navigation tab bar
│   ├── CreateMission.tsx   # Mission creation form
│   ├── ActivityFeed.tsx    # User activity timeline
│   └── UserProfile.tsx     # Profile dashboard
├── lib/
│   ├── missions.ts         # Mock mission data & types
│   └── users.ts            # Mock user data & types
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── .eslintrc.json
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
npm run build
npm start
```

## 📊 Mock Data Structure

### Mission Data
Each mission includes:
- ID, title, description, full description
- Bounty amount, deliverable type
- Poster info (name, rating, ID)
- Status (Open, Pending Review, Completed)
- Submission count, creation date, deadline
- Tags and accepted file types
- Reviews (for completed missions)

### User Data
Each user includes:
- ID, name, avatar, bio
- Rating, total earned, success rate
- Completed missions count
- Skills array
- Portfolio (completed mission IDs)
- Join date

## 🎬 Animations

- **Card Entrance**: Fade + slide-up on mount
- **Card Tap**: Spring scale animations (whileTap, whileHover)
- **Tab Transitions**: Smooth opacity fade between views
- **Modal Entry**: Bottom sheet slide-up with backdrop blur
- **Filter Selection**: Scale and color transitions
- **Progress Bar**: Animated bar fill on profile

## 🔑 Key Features Implementation

### Filtering Logic
- Multiple filter selection (AND logic)
- Case-insensitive tag matching
- Real-time filter updates

### Search Implementation
- Title and description matching
- Tag-based search
- Combined with filters (AND logic)

### Responsive Design
- Mobile-first approach
- Viewport meta tag for mobile optimization
- Touch-friendly tap targets
- Optimized for 375px width (iPhone)

## 📝 Mock Data Features

### Autonomous Systems Missions
Realistic autonomous vehicle missions:
- LIDAR data labeling for ML training
- Drone pathfinding algorithms
- Sensor mount CAD design
- Vehicle telemetry dashboard UI
- Computer vision for safety detection
- Sensor fusion implementations

### User Reputation System
- Ratings from 4.4 to 4.95 stars
- Success rates from 88% to 100%
- Varying bounty amounts ($450 - $2000)
- Completed missions with reviews
- Skill-based portfolios

## 🎯 Future Enhancement Ideas

1. **Real Backend Integration**
   - Firebase/Supabase for persistence
   - User authentication
   - Real file upload to cloud storage

2. **Advanced Features**
   - Team submissions
   - Escrow payments
   - Dispute resolution
   - User messaging system
   - Mission categories with pagination

3. **Analytics**
   - Success rate trends
   - Earning history charts
   - Most popular deliverable types
   - Market trends dashboard

4. **Mobile App**
   - React Native version
   - Native notifications
   - Offline mode

## 🎨 UI/UX Highlights

✅ iOS-native look and feel
✅ Smooth spring animations
✅ Bottom sheet modals
✅ Accessible color contrasts
✅ Touch-optimized interface
✅ Intuitive navigation
✅ Clear visual hierarchy
✅ Responsive typography

## 📄 License

MIT - Feel free to use for personal or commercial projects.

---

**Built with ❤️ for the modern bounty marketplace**
