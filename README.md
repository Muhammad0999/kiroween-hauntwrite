# 👻 HauntWrite

A fully-featured AI-powered haunted diary application with complete authentication, diary management, and a polished horror-themed UI.

## ✨ Features

### 🔐 Authentication System
- **User Registration** - Sign up with email and password
- **Secure Login** - Session-based authentication with JWT
- **Password Security** - Bcrypt hashing with 10 rounds
- **Protected Routes** - Middleware-based route protection
- **Auth Status Indicator** - Bulb glows red (not logged in) or green (logged in)

### 📖 Diary Management
- **Create Entries** - Write diary entries with typewriter sound effects
- **View All Entries** - Beautiful parchment-styled cards with ancient paper texture
- **Edit Entries** - Double-click any entry to edit
- **Delete Entries** - Spooky confirmation with fog animation
- **User-Specific** - Each user sees only their own entries

### 🎨 Immersive UI/UX
- **Cinematic Intro** - Smoke reveal animation on first visit (session-based)
- **Haunted Animations** - Floating candles, fog, and ghost effects
- **Typewriter Input** - Realistic typing sounds and cursor
- **Glitch Effects** - Animated glitchy titles
- **Smooth Transitions** - Smoky page transitions
- **Responsive Design** - Works on desktop and mobile

### 🎵 Sound Design
- **Ambient Sounds** - Toggleable background atmosphere
- **Click Sounds** - Satisfying audio feedback
- **Typewriter Sounds** - Short clips for each keystroke
- **Haunt Sounds** - Special effects for key actions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hauntwrite
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set your secrets:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-in-production
AUTH_SECRET=your-super-secret-key-change-in-production
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 Usage

### First Time User

1. **Home Page** - Click "Sign Up" or "Login" buttons in top navigation
2. **Sign Up** - Create account with email and password
3. **Auto Login** - Automatically signed in after registration
4. **Enter Diary** - Click "Enter the Diary" button
5. **Create Entry** - Click "📝 New Diary" button
6. **Write** - Type your diary entry with typewriter effects
7. **Save** - Click "💾 Save Diary" to persist your entry

### Returning User

1. **Login** - Sign in with your credentials
2. **View Entries** - See all your saved diary entries
3. **Edit** - Double-click any entry to edit it
4. **Delete** - Click three-dot menu and confirm deletion
5. **Create More** - Click "📝 New Diary" to add more entries

## 📁 Project Structure

```
hauntwrite/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/route.ts       # User registration
│   │   │   └── [...nextauth]/route.ts # NextAuth handlers
│   │   ├── diary/
│   │   │   └── entries/
│   │   │       ├── route.ts          # GET/POST entries
│   │   │       └── [id]/route.ts     # PUT/DELETE entry
│   │   └── haunt/route.ts            # AI transformation (optional)
│   ├── dairy/
│   │   ├── page.tsx                  # Diary list
│   │   ├── new/page.tsx              # Create entry
│   │   └── edit/[id]/page.tsx        # Edit entry
│   ├── signup/page.tsx               # Registration page
│   ├── login/page.tsx                # Login page
│   ├── page.tsx                      # Landing page
│   ├── layout.tsx                    # Root layout
│   ├── error.tsx                     # Error boundary
│   └── globals.css                   # Global styles
├── src/
│   ├── components/
│   │   ├── auth/                     # Auth components
│   │   │   ├── AuthButtons.tsx
│   │   │   ├── BulbIndicator.tsx
│   │   │   ├── SignInForm.tsx
│   │   │   ├── SignOutButton.tsx
│   │   │   └── SignUpForm.tsx
│   │   ├── DiaryEditor.tsx
│   │   ├── FloatingCandles.tsx
│   │   ├── FogOverlay.tsx
│   │   ├── GhostFloat.tsx
│   │   ├── GlitchTitle.tsx
│   │   ├── HauntedLayout.tsx
│   │   ├── IntroReveal.tsx
│   │   ├── OldPaperCard.tsx
│   │   ├── Providers.tsx
│   │   ├── SmokyTransition.tsx
│   │   └── TypewriterInput.tsx
│   ├── hooks/
│   │   ├── useSoundEffects.ts        # Sound management
│   │   └── useSessionState.ts        # Session storage hook
│   └── lib/
│       ├── auth.ts                   # NextAuth config
│       ├── auth-utils.ts             # Password hashing
│       ├── db.ts                     # Database layer
│       └── models.ts                 # TypeScript types
├── data/                             # JSON storage
│   ├── users.json                    # User accounts
│   └── entries.json                  # Diary entries
├── middleware.ts                     # Route protection
└── public/
    └── sounds/                       # Audio files
```

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js v5 (Auth.js)
- **Password Hashing**: bcryptjs
- **Database**: JSON file storage (easily migrated to PostgreSQL/MongoDB)
- **Session Management**: JWT with httpOnly cookies

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT-based sessions with expiration
- ✅ httpOnly and secure cookies
- ✅ Route protection via middleware
- ✅ User ownership verification for CRUD operations
- ✅ Generic error messages (no credential leakage)
- ✅ CSRF protection (built into NextAuth)

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Sign in (handled by NextAuth)
- `POST /api/auth/signout` - Sign out (handled by NextAuth)

### Diary Entries
- `GET /api/diary/entries` - Fetch all entries for logged-in user
- `POST /api/diary/entries` - Create new diary entry
- `PUT /api/diary/entries/[id]` - Update existing entry
- `DELETE /api/diary/entries/[id]` - Delete entry

## 🗺️ Routes

### Public Routes
- `/` - Home page with intro animation
- `/signup` - User registration
- `/login` - User sign in

### Protected Routes (Require Authentication)
- `/dairy` - Diary list page
- `/dairy/new` - Create new entry
- `/dairy/edit/[id]` - Edit existing entry

## 🎵 Sound Files

Place audio files in `public/sounds/`:
- `Scary_Effect.mp3` - Ambient background sound
- `810329__mokasza__smooth-whoosh.mp3` - Click/haunt sounds
- `TypeWriter.mp3` - Typewriter sound effects (optional)

## 🔧 Configuration

### Environment Variables

Required in `.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-a-random-secret>
AUTH_SECRET=<same-as-nextauth-secret>
```

Generate a secret:
```bash
openssl rand -base64 32
```

### Database Migration

Currently uses JSON files. To migrate to a real database:

1. Install database client (e.g., `pg` for PostgreSQL)
2. Update `src/lib/db.ts` to use database queries
3. No changes needed to API routes (abstraction layer)

## 🎯 Spec Compliance

Built according to:
- `.kiro/specs/authentication/` - Authentication spec
- `.kiro/specs/intro-state-management/` - Intro state spec
- `.kiro/steering/hauntwrite-steering.md` - Style guidelines

## 📝 License

MIT

## 🎃 Happy Haunting!

Made with 💀 and ✨ using Kiro AI
