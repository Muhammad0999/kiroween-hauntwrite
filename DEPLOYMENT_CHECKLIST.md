# 🚀 HauntWrite Deployment Checklist

## ✅ Pre-Deployment Verification

### Code Quality
- [x] All TypeScript files compile without errors
- [x] No console errors in development
- [x] All components render correctly
- [x] All API routes tested and working
- [x] Authentication flow tested
- [x] CRUD operations tested
- [x] Build completes successfully

### Security
- [x] Passwords hashed with bcrypt
- [x] JWT tokens with expiration
- [x] httpOnly cookies enabled
- [x] Route protection implemented
- [x] User ownership verification
- [x] Generic error messages (no data leakage)
- [ ] Environment variables secured (production)
- [ ] Rate limiting added (recommended)

### Documentation
- [x] README.md updated
- [x] Steering doc updated
- [x] Project summary created
- [x] API endpoints documented
- [x] Component structure documented

---

## 🔧 Production Setup

### 1. Environment Variables

Create `.env.production` with:

```env
# Required
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=<generate-strong-secret>
AUTH_SECRET=<same-as-nextauth-secret>

# Optional (if using real AI)
OPENAI_API_KEY=<your-key>
```

Generate secrets:
```bash
openssl rand -base64 32
```

### 2. Database Migration

**Current**: JSON files in `data/` directory
**Recommended**: PostgreSQL or MongoDB

#### Option A: PostgreSQL

```bash
npm install pg
```

Update `src/lib/db.ts`:
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Update all repository methods to use SQL queries
```

#### Option B: MongoDB

```bash
npm install mongodb
```

Update `src/lib/db.ts`:
```typescript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('hauntwrite');

// Update all repository methods to use MongoDB
```

### 3. Hosting Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel
```

- Add environment variables in Vercel dashboard
- Connect database (Vercel Postgres or external)
- Deploy

#### Other Options
- **Netlify**: Similar to Vercel
- **Railway**: Easy database + hosting
- **Render**: Free tier available
- **AWS/GCP/Azure**: More control, more setup

---

## 🔒 Security Hardening

### Required for Production

1. **HTTPS Only**
   - Ensure your domain has SSL certificate
   - Secure cookies require HTTPS

2. **Strong Secrets**
   ```bash
   # Generate new secrets
   openssl rand -base64 32
   ```

3. **Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```
   
   Add to auth endpoints:
   ```typescript
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 5 // 5 requests per window
   });
   ```

4. **CORS Configuration**
   - Set allowed origins
   - Restrict API access

### Recommended Enhancements

1. **Email Verification**
   - Use SendGrid, Resend, or similar
   - Verify email on signup

2. **Password Reset**
   - Email-based reset flow
   - Temporary reset tokens

3. **Two-Factor Authentication**
   - TOTP (Google Authenticator)
   - SMS verification

4. **Session Management**
   - Show active sessions
   - Remote logout capability

---

## 📊 Monitoring & Analytics

### Error Tracking

**Sentry** (Recommended)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Analytics

**Vercel Analytics**
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Logging

**Production Logging**
```bash
npm install winston
```

---

## 🗄️ Database Setup

### PostgreSQL Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Diary entries table
CREATE TABLE diary_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  haunted_content TEXT NOT NULL,
  intensity INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_entries_user_id ON diary_entries(user_id);
CREATE INDEX idx_entries_created_at ON diary_entries(created_at DESC);
```

### MongoDB Collections

```javascript
// users collection
{
  _id: ObjectId,
  email: String,
  passwordHash: String,
  createdAt: Date,
  updatedAt: Date
}

// entries collection
{
  _id: ObjectId,
  userId: ObjectId,
  content: String,
  hauntedContent: String,
  intensity: Number,
  createdAt: Date,
  updatedAt: Date
}

// Indexes
db.entries.createIndex({ userId: 1 });
db.entries.createIndex({ createdAt: -1 });
db.users.createIndex({ email: 1 }, { unique: true });
```

---

## 🎵 Asset Optimization

### Sound Files

Current location: `public/sounds/`

**Optimization**:
1. Compress audio files (reduce file size)
2. Use CDN for faster delivery
3. Lazy load non-critical sounds

```bash
# Compress MP3 files
ffmpeg -i input.mp3 -b:a 128k output.mp3
```

### Images

If adding images:
1. Use Next.js Image component
2. Optimize with WebP format
3. Use CDN for delivery

---

## 🧪 Testing Checklist

### Manual Testing

- [ ] Sign up with new account
- [ ] Login with credentials
- [ ] Create diary entry
- [ ] Edit diary entry
- [ ] Delete diary entry
- [ ] Logout
- [ ] Try accessing protected routes without auth
- [ ] Test on mobile device
- [ ] Test all sound effects
- [ ] Test intro animation
- [ ] Test error states

### Automated Testing (Optional)

```bash
# Install testing libraries
npm install -D @testing-library/react @testing-library/jest-dom jest
npm install -D @playwright/test # for E2E tests
```

---

## 📦 Build & Deploy

### Build for Production

```bash
# Clean build
rm -rf .next
npm run build

# Test production build locally
npm run start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Environment Variables in Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add:
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `AUTH_SECRET`
   - `DATABASE_URL` (if using database)

---

## 🔄 Post-Deployment

### Verify Deployment

- [ ] Visit production URL
- [ ] Test sign up flow
- [ ] Test login flow
- [ ] Create/edit/delete entries
- [ ] Check error pages
- [ ] Verify HTTPS is working
- [ ] Test on multiple devices
- [ ] Check browser console for errors

### Monitor

- [ ] Set up error tracking
- [ ] Monitor API response times
- [ ] Check database performance
- [ ] Monitor user signups
- [ ] Track error rates

### Backup

- [ ] Set up automated database backups
- [ ] Test restore procedure
- [ ] Document backup schedule

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Module not found" errors
- **Solution**: Run `npm install` and rebuild

**Issue**: Authentication not working
- **Solution**: Check `NEXTAUTH_SECRET` is set correctly

**Issue**: Database connection fails
- **Solution**: Verify `DATABASE_URL` and network access

**Issue**: Sounds not playing
- **Solution**: Check file paths and browser autoplay policies

**Issue**: Middleware errors
- **Solution**: Ensure no Node.js modules in middleware

---

## 📞 Support

### Resources

- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Project Documentation

- `README.md` - Setup guide
- `PROJECT_SUMMARY.md` - Feature overview
- `.kiro/steering/hauntwrite-steering.md` - Style guide
- `.kiro/specs/` - Technical specifications

---

## ✅ Final Checklist

Before going live:

- [ ] All tests passing
- [ ] Build successful
- [ ] Environment variables set
- [ ] Database migrated (if applicable)
- [ ] HTTPS enabled
- [ ] Error tracking configured
- [ ] Backups configured
- [ ] Documentation updated
- [ ] Security review completed
- [ ] Performance tested
- [ ] Mobile tested
- [ ] Monitoring enabled

---

**Status**: Ready for deployment with database migration

**Estimated Time**: 2-4 hours (including database setup)

**Difficulty**: Intermediate

Good luck! 🎃👻
