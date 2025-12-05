# Design Document

## Overview

This design implements a complete authentication system for HauntWrite using NextAuth.js (Auth.js v5) with a credentials provider. The system will handle user registration, sign-in, sign-out, and session management while maintaining the horror-themed aesthetic. User data and diary entries will be stored in a database (initially using a simple JSON file-based approach, with easy migration path to PostgreSQL/MongoDB).

The authentication flow integrates seamlessly with Next.js 14+ App Router, using server components for security and client components for interactivity.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client Browser                       │
│  ┌────────────────────────────────────────────────────┐ │
│  │         React Components (Client/Server)           │ │
│  │  - SignIn/SignUp Forms                             │ │
│  │  - Protected Diary Page                            │ │
│  │  - Auth Status Display                             │ │
│  └────────────────────────────────────────────────────┘ │
│                          ↕                               │
│  ┌────────────────────────────────────────────────────┐ │
│  │              NextAuth.js Session                   │ │
│  │  - JWT Token (httpOnly cookie)                     │ │
│  │  - User ID, Email                                  │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                   Next.js Server                         │
│  ┌────────────────────────────────────────────────────┐ │
│  │            NextAuth.js Auth Handler                │ │
│  │  - /api/auth/[...nextauth]/route.ts               │ │
│  │  - Credentials Provider                            │ │
│  │  - Session Management                              │ │
│  └────────────────────────────────────────────────────┘ │
│                          ↕                               │
│  ┌────────────────────────────────────────────────────┐ │
│  │              Authentication Service                │ │
│  │  - User Registration                               │ │
│  │  - Credential Verification                         │ │
│  │  - Password Hashing (bcrypt)                       │ │
│  └────────────────────────────────────────────────────┘ │
│                          ↕                               │
│  ┌────────────────────────────────────────────────────┐ │
│  │                 Data Layer                         │ │
│  │  - User Repository                                 │ │
│  │  - Diary Entry Repository                          │ │
│  │  - JSON File Storage (Phase 1)                     │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Authentication Flow

**Sign Up Flow:**
1. User fills sign-up form → Client validation
2. POST to /api/auth/signup → Server validation
3. Hash password with bcrypt → Store user in database
4. Auto sign-in → Create session → Redirect to diary

**Sign In Flow:**
1. User fills sign-in form → Client validation
2. POST to NextAuth credentials provider
3. Verify credentials → Compare hashed password
4. Create JWT session → Set httpOnly cookie
5. Redirect to diary page

**Protected Route Access:**
1. User navigates to /diary
2. Server component checks session
3. If no session → Redirect to /signin
4. If session valid → Render page with user data

## Components and Interfaces

### Authentication Pages

**app/signin/page.tsx**
- Sign-in form with email/password
- Link to sign-up page
- Error message display
- Uses HauntedLayout for consistent theming

**app/signup/page.tsx**
- Registration form with email/password/confirm password
- Client-side validation
- Link to sign-in page
- Uses HauntedLayout for consistent theming

### Authentication Components

**src/components/auth/SignInForm.tsx**
```typescript
interface SignInFormProps {
  callbackUrl?: string;
}

export default function SignInForm({ callbackUrl }: SignInFormProps)
```
- Email and password inputs with spooky styling
- Form validation and error handling
- Loading state with haunted animation
- Calls NextAuth signIn function

**src/components/auth/SignUpForm.tsx**
```typescript
interface SignUpFormProps {
  onSuccess?: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpFormProps)
```
- Email, password, and confirm password inputs
- Client-side validation (email format, password strength)
- Calls /api/auth/signup endpoint
- Auto sign-in on success

**src/components/auth/AuthButton.tsx**
```typescript
export default function AuthButton()
```
- Server component that checks session
- Shows user email + sign-out button if authenticated
- Shows sign-in/sign-up buttons if not authenticated
- Spooky themed styling

**src/components/auth/SignOutButton.tsx**
```typescript
export default function SignOutButton()
```
- Client component for sign-out action
- Calls NextAuth signOut function
- Plays sound effect on click
- Haunted button styling

### API Routes

**app/api/auth/[...nextauth]/route.ts**
- NextAuth.js configuration
- Credentials provider setup
- JWT strategy
- Session callbacks

**app/api/auth/signup/route.ts**
```typescript
POST /api/auth/signup
Body: { email: string, password: string }
Response: { success: boolean, message: string }
```
- Validates email and password
- Checks for existing user
- Hashes password with bcrypt
- Creates new user record

**app/api/diary/entries/route.ts**
```typescript
GET /api/diary/entries
Response: { entries: DiaryEntry[] }

POST /api/diary/entries
Body: { content: string, hauntedContent: string, intensity: number }
Response: { entry: DiaryEntry }
```
- Protected endpoints requiring authentication
- CRUD operations for diary entries
- Associates entries with authenticated user

## Data Models

### User Model

```typescript
interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Diary Entry Model

```typescript
interface DiaryEntry {
  id: string;
  userId: string;
  content: string;
  hauntedContent: string;
  intensity: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Session Model (NextAuth)

```typescript
interface Session {
  user: {
    id: string;
    email: string;
  };
  expires: string;
}
```

### Storage Schema (JSON Files - Phase 1)

```
data/
  users.json          # Array of User objects
  entries.json        # Array of DiaryEntry objects
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Valid registration creates account

*For any* valid email and password (8+ characters), submitting the registration form SHALL create a new user account with hashed password in the database.

**Validates: Requirements 1.2**

### Property 2: Password minimum length enforcement

*For any* password with fewer than 8 characters, the registration form SHALL reject the submission and display a validation error.

**Validates: Requirements 1.4**

### Property 3: Successful authentication creates session

*For any* registered user with valid credentials, signing in SHALL create an authenticated session with a valid JWT token.

**Validates: Requirements 2.2**

### Property 4: Invalid credentials show generic error

*For any* invalid credential combination (wrong email or wrong password), the system SHALL display an error message that does not reveal which credential was incorrect.

**Validates: Requirements 2.3**

### Property 5: Sign-out terminates session

*For any* authenticated user, clicking sign-out SHALL terminate the session, clear all authentication tokens and cookies, and redirect to the home page.

**Validates: Requirements 3.1, 3.2, 3.3**

### Property 6: Diary entries associate with user

*For any* authenticated user creating a diary entry, the entry SHALL be stored in the database with the user's ID and both original and haunted content.

**Validates: Requirements 4.1, 4.2**

### Property 7: User entries persist across sessions

*For any* authenticated user with saved entries, returning to the diary page SHALL display all their previously created entries.

**Validates: Requirements 4.3**

### Property 8: Authenticated UI shows user info

*For any* authenticated user, the navigation SHALL display the user's email and a sign-out button.

**Validates: Requirements 5.1, 5.3**

### Property 9: Authentication state updates reactively

*For any* authentication state change (sign-in or sign-out), the UI SHALL update immediately without requiring a page refresh.

**Validates: Requirements 5.4**

### Property 10: Spooky error messages

*For any* authentication error, the error message SHALL contain horror-themed language consistent with the app's aesthetic.

**Validates: Requirements 6.3**

### Property 11: Passwords are hashed

*For any* user password stored in the database, the password SHALL be hashed using bcrypt and SHALL NOT be stored in plain text.

**Validates: Requirements 7.1**

### Property 12: Passwords never transmitted in plain text

*For any* authentication request, the password SHALL be transmitted over HTTPS and SHALL NOT appear in logs or error messages.

**Validates: Requirements 7.2**

### Property 13: Sessions use secure cookies

*For any* created user session, the authentication cookie SHALL have the httpOnly and secure flags set.

**Validates: Requirements 7.3**

### Property 14: Tokens have expiration

*For any* generated JWT token, the token SHALL include an expiration time (exp claim).

**Validates: Requirements 7.4**

### Property 15: Error messages don't leak sensitive data

*For any* authentication error, the error message SHALL NOT contain sensitive information such as password hashes, user IDs, or database details.

**Validates: Requirements 7.5**

## Error Handling

### Registration Errors

**Scenario**: Email already exists
- **Handling**: Return 409 Conflict with spooky message "This soul is already bound to our realm..."
- **User Impact**: User knows email is taken, can try different email or sign in
- **Logging**: Log attempt with email (hashed) for security monitoring

**Scenario**: Invalid email format
- **Handling**: Client-side validation prevents submission, shows error
- **User Impact**: Immediate feedback, no server request made
- **Implementation**: Use email regex validation

**Scenario**: Password too weak
- **Handling**: Client-side validation shows strength indicator
- **User Impact**: Real-time feedback as they type
- **Implementation**: Check length, optionally check for common passwords

### Authentication Errors

**Scenario**: Invalid credentials
- **Handling**: Return 401 Unauthorized with generic message "The spirits reject your offering..."
- **User Impact**: User knows credentials are wrong but not which one
- **Security**: Prevents username enumeration attacks

**Scenario**: Account locked (future enhancement)
- **Handling**: Return 403 Forbidden with message "Your soul is trapped..."
- **User Impact**: User knows account is locked, can contact support
- **Implementation**: Track failed login attempts

### Session Errors

**Scenario**: Expired session
- **Handling**: Redirect to sign-in page with message "Your session has faded into darkness..."
- **User Impact**: User knows they need to sign in again
- **Implementation**: Check JWT expiration on protected routes

**Scenario**: Invalid/tampered token
- **Handling**: Clear session, redirect to sign-in
- **User Impact**: Seamless redirect, no error shown
- **Security**: Prevents token manipulation attacks

### Database Errors

**Scenario**: Database connection failure
- **Handling**: Return 503 Service Unavailable with message "The spirits are restless..."
- **User Impact**: User knows service is temporarily unavailable
- **Logging**: Alert developers immediately

**Scenario**: Data corruption
- **Handling**: Fail gracefully, log error, show generic error to user
- **User Impact**: User sees error, can retry
- **Recovery**: Implement data validation and backup strategies

## Testing Strategy

### Unit Tests

Unit tests will verify specific examples and edge cases:

1. **Registration validation**: Test email format validation, password length requirements
2. **Duplicate email handling**: Test registering with existing email returns error
3. **Password hashing**: Test that stored passwords are hashed, not plain text
4. **Sign-in with valid credentials**: Test successful authentication flow
5. **Sign-in with invalid credentials**: Test error handling for wrong password/email
6. **Session creation**: Test JWT token generation and cookie setting
7. **Sign-out**: Test session termination and cookie clearing
8. **Protected route access**: Test unauthenticated access redirects to sign-in
9. **Entry association**: Test diary entries are linked to correct user
10. **UI state updates**: Test auth state changes update UI components

### Property-Based Tests

Property-based tests will verify universal properties across all inputs using **fast-check** (JavaScript property-based testing library):

Each property-based test will run a minimum of 100 iterations to ensure comprehensive coverage.

1. **Property 1 Test**: Generate random valid emails and passwords, verify accounts are created
   - **Feature: authentication, Property 1: Valid registration creates account**

2. **Property 2 Test**: Generate random passwords of various lengths, verify those under 8 characters are rejected
   - **Feature: authentication, Property 2: Password minimum length enforcement**

3. **Property 3 Test**: Generate random users, sign them in, verify sessions are created
   - **Feature: authentication, Property 3: Successful authentication creates session**

4. **Property 4 Test**: Generate random invalid credentials, verify error messages don't reveal which field is wrong
   - **Feature: authentication, Property 4: Invalid credentials show generic error**

5. **Property 5 Test**: Generate random authenticated users, sign them out, verify session is terminated
   - **Feature: authentication, Property 5: Sign-out terminates session**

6. **Property 6 Test**: Generate random diary entries for authenticated users, verify entries are associated with user ID
   - **Feature: authentication, Property 6: Diary entries associate with user**

7. **Property 7 Test**: Generate random users with entries, verify entries persist across sessions
   - **Feature: authentication, Property 7: User entries persist across sessions**

8. **Property 8 Test**: Generate random authenticated users, verify UI shows user email and sign-out button
   - **Feature: authentication, Property 8: Authenticated UI shows user info**

9. **Property 9 Test**: Generate random auth state changes, verify UI updates without refresh
   - **Feature: authentication, Property 9: Authentication state updates reactively**

10. **Property 10 Test**: Generate random authentication errors, verify messages contain spooky keywords
    - **Feature: authentication, Property 10: Spooky error messages**

11. **Property 11 Test**: Generate random passwords, verify stored versions are hashed
    - **Feature: authentication, Property 11: Passwords are hashed**

12. **Property 12 Test**: Generate random auth requests, verify passwords not in plain text
    - **Feature: authentication, Property 12: Passwords never transmitted in plain text**

13. **Property 13 Test**: Generate random sessions, verify cookies have httpOnly and secure flags
    - **Feature: authentication, Property 13: Sessions use secure cookies**

14. **Property 14 Test**: Generate random JWT tokens, verify all have expiration times
    - **Feature: authentication, Property 14: Tokens have expiration**

15. **Property 15 Test**: Generate random auth errors, verify messages don't contain sensitive data
    - **Feature: authentication, Property 15: Error messages don't leak sensitive data**

### Testing Tools

- **Unit Testing**: Jest + React Testing Library
- **Property-Based Testing**: fast-check
- **API Testing**: Supertest for API route testing
- **E2E Testing**: Playwright for full authentication flows
- **Security Testing**: OWASP ZAP for vulnerability scanning

### Test Configuration

```typescript
// Property-based test configuration
const propertyTestConfig = {
  numRuns: 100, // Minimum iterations per property test
  verbose: true,
  seed: Date.now() // For reproducibility
};
```

## Implementation Notes

### Technology Choices

**NextAuth.js (Auth.js v5)**
- Industry-standard authentication for Next.js
- Built-in CSRF protection
- Supports multiple providers (credentials, OAuth)
- Excellent TypeScript support
- Easy to extend and customize

**bcrypt for Password Hashing**
- Industry-standard hashing algorithm
- Automatic salt generation
- Configurable work factor for future-proofing
- Well-tested and secure

**JSON File Storage (Phase 1)**
- Simple to implement and debug
- No database setup required
- Easy to migrate to real database later
- Suitable for development and small-scale deployment

### Security Considerations

1. **Password Requirements**: Minimum 8 characters (can be enhanced with complexity requirements)
2. **Rate Limiting**: Implement rate limiting on auth endpoints to prevent brute force
3. **HTTPS Only**: Enforce HTTPS in production for secure cookie transmission
4. **CSRF Protection**: NextAuth provides built-in CSRF protection
5. **XSS Prevention**: React's built-in XSS protection + httpOnly cookies
6. **SQL Injection**: Not applicable with JSON storage, but use parameterized queries when migrating to SQL

### Performance Considerations

- **Password Hashing**: bcrypt is intentionally slow (10 rounds), acceptable for auth operations
- **Session Validation**: JWT validation is fast, minimal overhead on protected routes
- **File I/O**: JSON file reads/writes are synchronous, acceptable for small user base
- **Caching**: Consider caching user sessions in memory for high-traffic scenarios

### Future Enhancements

1. **OAuth Providers**: Add Google, GitHub sign-in options
2. **Email Verification**: Send verification emails on registration
3. **Password Reset**: Implement forgot password flow
4. **Two-Factor Authentication**: Add 2FA for enhanced security
5. **Database Migration**: Move from JSON files to PostgreSQL/MongoDB
6. **Account Management**: Allow users to update email, change password
7. **Session Management**: Show active sessions, allow remote sign-out
8. **Audit Logging**: Track all authentication events for security monitoring

### Migration Path to Database

When ready to migrate from JSON files to a database:

1. Install database client (pg for PostgreSQL, mongodb for MongoDB)
2. Create database schema/tables
3. Update repository layer to use database queries instead of file I/O
4. Migrate existing data from JSON files to database
5. No changes needed to API routes or components (abstraction layer)

Example repository interface (database-agnostic):

```typescript
interface UserRepository {
  create(email: string, passwordHash: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
```
