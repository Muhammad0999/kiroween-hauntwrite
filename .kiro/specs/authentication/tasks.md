# Implementation Plan

- [ ] 1. Set up authentication infrastructure
- [x] 1.1 Install and configure NextAuth.js and dependencies
  - Install next-auth, bcryptjs, @types/bcryptjs
  - Create auth configuration file
  - Set up environment variables for JWT secret
  - _Requirements: 2.2, 7.3, 7.4_

- [x] 1.2 Create data storage layer
  - Create data directory and JSON file structure
  - Implement User repository with file I/O operations
  - Implement DiaryEntry repository with file I/O operations
  - Add TypeScript interfaces for data models
  - _Requirements: 1.2, 4.1, 4.2_

- [x] 1.3 Implement password hashing utilities
  - Create password hashing function using bcrypt
  - Create password verification function
  - Set bcrypt work factor to 10 rounds
  - _Requirements: 7.1_

- [ ] 2. Implement user registration
- [x] 2.1 Create signup API route
  - Implement POST /api/auth/signup endpoint
  - Add email validation
  - Add password length validation (8+ characters)
  - Check for duplicate emails
  - Hash password and create user record
  - Return appropriate error messages with spooky theming
  - _Requirements: 1.2, 1.3, 1.4, 6.3_

- [ ] 2.2 Write property test for valid registration
  - **Property 1: Valid registration creates account**
  - **Validates: Requirements 1.2**

- [ ] 2.3 Write property test for password validation
  - **Property 2: Password minimum length enforcement**
  - **Validates: Requirements 1.4**

- [x] 2.4 Create SignUpForm component
  - Build form with email, password, confirm password fields
  - Add client-side validation
  - Implement spooky styling with purple/green accents
  - Add loading state with haunted animation
  - Handle form submission and errors
  - _Requirements: 1.1, 6.2, 6.4_

- [x] 2.5 Create signup page
  - Create app/signup/page.tsx
  - Use HauntedLayout for consistent theming
  - Integrate SignUpForm component
  - Add link to sign-in page
  - Implement auto sign-in after successful registration
  - _Requirements: 1.1, 1.5, 6.1_

- [ ] 3. Implement user authentication
- [x] 3.1 Configure NextAuth.js
  - Create app/api/auth/[...nextauth]/route.ts
  - Configure credentials provider
  - Implement authorize function with credential verification
  - Set up JWT strategy
  - Configure session callbacks
  - Set secure cookie options (httpOnly, secure)
  - _Requirements: 2.2, 7.2, 7.3, 7.4_

- [ ] 3.2 Write property test for successful authentication
  - **Property 3: Successful authentication creates session**
  - **Validates: Requirements 2.2**

- [ ] 3.3 Write property test for invalid credentials
  - **Property 4: Invalid credentials show generic error**
  - **Validates: Requirements 2.3**

- [ ] 3.4 Write property test for secure sessions
  - **Property 13: Sessions use secure cookies**
  - **Validates: Requirements 7.3**

- [ ] 3.5 Write property test for token expiration
  - **Property 14: Tokens have expiration**
  - **Validates: Requirements 7.4**

- [x] 3.6 Create SignInForm component
  - Build form with email and password fields
  - Add client-side validation
  - Implement spooky styling
  - Add loading state with haunted animation
  - Call NextAuth signIn function
  - Handle authentication errors with spooky messages
  - _Requirements: 2.1, 2.3, 6.2, 6.3, 6.4_

- [x] 3.7 Create signin page
  - Create app/signin/page.tsx
  - Use HauntedLayout for consistent theming
  - Integrate SignInForm component
  - Add link to sign-up page
  - Implement redirect after successful sign-in
  - _Requirements: 2.1, 2.4, 6.1_

- [ ] 4. Implement sign-out functionality
- [x] 4.1 Create SignOutButton component
  - Implement client component with sign-out action
  - Call NextAuth signOut function
  - Add spooky button styling
  - Play sound effect on click
  - _Requirements: 3.1, 3.2, 3.3, 6.5_

- [ ] 4.2 Write property test for sign-out
  - **Property 5: Sign-out terminates session**
  - **Validates: Requirements 3.1, 3.2, 3.3**

- [ ] 4.3 Create AuthButton component
  - Implement server component that checks session
  - Show user email and SignOutButton if authenticated
  - Show sign-in/sign-up links if not authenticated
  - Add spooky styling
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 4.4 Write property test for authenticated UI
  - **Property 8: Authenticated UI shows user info**
  - **Validates: Requirements 5.1, 5.3**

- [ ] 4.5 Integrate AuthButton into layout
  - Add AuthButton to app navigation
  - Ensure it appears on all pages
  - Test authentication state updates
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 4.6 Write property test for reactive UI updates
  - **Property 9: Authentication state updates reactively**
  - **Validates: Requirements 5.4**

- [ ] 5. Implement protected routes and diary persistence
- [x] 5.1 Create route protection middleware
  - Add session check to diary page
  - Redirect unauthenticated users to sign-in
  - Pass user session to page components
  - _Requirements: 2.5, 3.4_

- [x] 5.2 Create diary entries API routes
  - Implement GET /api/diary/entries (fetch user's entries)
  - Implement POST /api/diary/entries (create new entry)
  - Add authentication checks to both endpoints
  - Associate entries with authenticated user ID
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 5.3 Write property test for entry association
  - **Property 6: Diary entries associate with user**
  - **Validates: Requirements 4.1, 4.2**

- [ ] 5.4 Write property test for entry persistence
  - **Property 7: User entries persist across sessions**
  - **Validates: Requirements 4.3**

- [ ] 5.5 Update DiaryEditor to save entries
  - Modify DiaryEditor to call POST /api/diary/entries after haunting
  - Save both original and haunted content
  - Include intensity level
  - Handle save errors gracefully
  - _Requirements: 4.1, 4.2_

- [ ] 5.6 Create diary entry history component
  - Build component to display user's saved entries
  - Show original and haunted versions
  - Add timestamps and intensity levels
  - Implement spooky card styling
  - _Requirements: 4.3_

- [ ] 5.7 Integrate entry history into diary page
  - Add entry history component to diary page
  - Fetch entries on page load
  - Update list when new entries are created
  - _Requirements: 4.3_

- [ ] 6. Implement security and error handling
- [ ] 6.1 Write property test for password hashing
  - **Property 11: Passwords are hashed**
  - **Validates: Requirements 7.1**

- [ ] 6.2 Write property test for password transmission security
  - **Property 12: Passwords never transmitted in plain text**
  - **Validates: Requirements 7.2**

- [ ] 6.3 Write property test for error message security
  - **Property 15: Error messages don't leak sensitive data**
  - **Validates: Requirements 7.5**

- [ ] 6.4 Write property test for spooky error messages
  - **Property 10: Spooky error messages**
  - **Validates: Requirements 6.3**

- [ ] 6.5 Add error boundaries for auth pages
  - Create error boundary components
  - Add spooky error displays
  - Ensure graceful degradation
  - _Requirements: 6.3_

- [ ] 6.6 Implement rate limiting (optional enhancement)
  - Add rate limiting to auth endpoints
  - Prevent brute force attacks
  - Return spooky error when rate limited
  - _Requirements: 7.2_

- [ ] 7. Handle unauthenticated user entries
- [ ] 7.1 Implement localStorage for unauthenticated entries
  - Save entries to localStorage when not authenticated
  - Load localStorage entries on page load
  - Display localStorage entries in UI
  - _Requirements: 4.4_

- [ ] 7.2 Create entry migration prompt
  - Detect localStorage entries on sign-in
  - Show modal offering to migrate entries
  - Implement migration function to save to database
  - Clear localStorage after successful migration
  - _Requirements: 4.5_

- [ ] 8. Final integration and testing
- [ ] 8.1 Test complete authentication flows
  - Test sign-up → auto sign-in → diary access
  - Test sign-in → diary access → sign-out
  - Test protected route access without auth
  - Test entry creation and persistence
  - Test entry migration from localStorage
  - _Requirements: All_

- [ ] 8.2 Test error scenarios
  - Test duplicate email registration
  - Test invalid credentials sign-in
  - Test expired session handling
  - Test database errors
  - _Requirements: 1.3, 2.3, 2.5_

- [ ] 8.3 Verify security requirements
  - Verify passwords are hashed in storage
  - Verify cookies have httpOnly and secure flags
  - Verify JWT tokens have expiration
  - Verify error messages don't leak sensitive data
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 8.4 Test UI theming consistency
  - Verify all auth pages use HauntedLayout
  - Verify spooky styling on all forms
  - Verify sound effects play appropriately
  - Verify loading animations are haunted-themed
  - _Requirements: 6.1, 6.2, 6.4, 6.5_

- [ ] 9. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
