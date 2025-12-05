# HauntWrite Steering Doc

## Project Overview
HauntWrite is an AI-powered haunted diary application with full authentication, allowing users to create, edit, and manage their personal diary entries with a spooky horror-themed interface.

## Coding Style
- Always use TypeScript.
- Use functional React components only.
- Use Tailwind CSS for styling.
- Use Framer Motion for animations.
- Keep components modular and clean.
- Use Next.js 14+ App Router conventions.

## Theme Rules
- Dark horror theme with neon purple/green/red accents.
- Use glitch effects on headings (GlitchTitle component).
- Use animated floating shadows, smoke, candles, and fog in background.
- No bright/light colors unless used for contrast.
- Ancient parchment styling for diary entries (amber tones with old paper texture).
- Blood-red ink aesthetic for text on parchment.

## UI Guidelines
- Pages must use HauntedLayout for consistent theming.
- Buttons must be animated with glow effects and gradient backgrounds.
- Use TypewriterInput for text entry with typewriter sound effects.
- Bulb indicator shows auth state (red pulsing = not logged in, green soft hum = logged in).
- Ghost hovering animations on hover states.
- Spooky error messages with horror-themed language.
- Loading states must show haunted animations.

## Authentication
- NextAuth.js (Auth.js v5) with credentials provider.
- Email + password authentication.
- Session-based with JWT tokens (httpOnly cookies).
- Passwords hashed with bcrypt (10 rounds).
- Protected routes: `/dairy/*` requires authentication.
- Public routes: `/`, `/login`, `/signup`.
- Middleware handles route protection via Edge Runtime.

## Architecture Rules
- All pages under `app/` folder (Next.js App Router).
- Reusable components under `src/components/`.
- Auth components under `src/components/auth/`.
- API routes in `app/api/*/route.ts`.
- Custom hooks in `src/hooks/`.
- Data models in `src/lib/models.ts`.
- Database layer in `src/lib/db.ts` (JSON file storage).
- Auth configuration in `src/lib/auth.ts`.

## Data Storage
- JSON file-based storage in `data/` directory.
- `data/users.json` - User accounts.
- `data/entries.json` - Diary entries.
- Each entry associated with user ID.
- Supports CRUD operations (Create, Read, Update, Delete).

## Sound Effects
- Ambient background sound (Scary_Effect.mp3).
- Click sounds for navigation (smooth-whoosh.mp3).
- Haunt sounds for special actions (smooth-whoosh.mp3).
- Typewriter sounds for text input (smooth-whoosh.mp3 - 200ms clips).
- All sounds in `public/sounds/` directory.
- useSoundEffects hook manages all audio.

## Key Features
1. **Authentication System**
   - Sign up with email/password
   - Login with credentials
   - Logout functionality
   - Session persistence
   - Bulb indicator for auth state

2. **Diary Management**
   - Create new diary entries
   - View all user's entries
   - Edit existing entries (double-click)
   - Delete entries with confirmation
   - Entries displayed as ancient parchment cards

3. **UI/UX Features**
   - Intro reveal animation (smoke effect)
   - Session-based intro (shows once per session)
   - Floating candles and fog effects
   - Ghost animations on hover
   - Typewriter input with sound
   - Smoky page transitions
   - Responsive design (mobile-friendly)

## Routes
- `/` - Home page (public)
- `/signup` - User registration
- `/login` - User sign in
- `/dairy` - Diary list (protected)
- `/dairy/new` - Create new entry (protected)
- `/dairy/edit/[id]` - Edit entry (protected)

## API Endpoints
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/[...nextauth]` - NextAuth handlers
- `GET /api/diary/entries` - Fetch user's entries
- `POST /api/diary/entries` - Create new entry
- `PUT /api/diary/entries/[id]` - Update entry
- `DELETE /api/diary/entries/[id]` - Delete entry
- `POST /api/haunt` - AI haunting endpoint (optional)

## Component Structure
```
src/components/
├── auth/
│   ├── AuthButtons.tsx - Auth state UI with bulb indicator
│   ├── BulbIndicator.tsx - Red/green auth status bulb
│   ├── SignInForm.tsx - Login form
│   ├── SignOutButton.tsx - Logout button
│   └── SignUpForm.tsx - Registration form
├── BatsParallax.tsx - (removed)
├── DiaryEditor.tsx - Diary editing interface
├── ErrorMessage.tsx - Error display
├── FloatingCandles.tsx - Ambient candle animations
├── FogOverlay.tsx - Fog effect
├── GhostFloat.tsx - Ghost animations
├── GlitchTitle.tsx - Glitchy text effect
├── HauntedLayout.tsx - Main layout wrapper
├── HauntedOutputPanel.tsx - AI output display
├── IntroReveal.tsx - Intro smoke animation
├── OldPaperCard.tsx - Parchment-styled card
├── Providers.tsx - SessionProvider wrapper
├── SmokyTransition.tsx - Page transition effect
├── SpookinessSlider.tsx - Intensity slider
└── TypewriterInput.tsx - Text input with typewriter effect
```

## Environment Variables
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-secret-key>
AUTH_SECRET=<your-secret-key>
```

## File Structure
- No unused components.
- Descriptive file names only.
- Group related components in subdirectories.
- Keep API routes organized by feature.

## Error Handling
- All errors use spooky-themed messages.
- Generic error messages for security (don't reveal which credential is wrong).
- Graceful degradation when storage fails.
- Error boundaries for React errors.

## Security Best Practices
- Passwords never stored in plain text.
- JWT tokens with expiration.
- httpOnly and secure cookies.
- Route protection via middleware.
- User ownership verification for CRUD operations.
- No sensitive data in error messages.
