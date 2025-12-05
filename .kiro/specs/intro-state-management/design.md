# Design Document

## Overview

This design implements session-based state persistence for the IntroReveal component to prevent the intro animation from replaying when users navigate back to the home page. The solution uses a custom React hook that leverages sessionStorage to maintain state across route changes while ensuring the intro plays again in new browser sessions.

The design focuses on creating a reusable pattern that can be applied to other session-based UI states throughout the application, maintaining consistency with the existing HauntWrite architecture.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser Session                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │              sessionStorage                        │ │
│  │  { "hauntwrite_intro_completed": "true" }         │ │
│  └────────────────────────────────────────────────────┘ │
│                          ↕                               │
│  ┌────────────────────────────────────────────────────┐ │
│  │         useSessionState Hook                       │ │
│  │  - Read from sessionStorage                        │ │
│  │  - Write to sessionStorage                         │ │
│  │  - Sync with React state                           │ │
│  └────────────────────────────────────────────────────┘ │
│                          ↕                               │
│  ┌────────────────────────────────────────────────────┐ │
│  │            Home Page Component                     │ │
│  │  - Conditionally render IntroReveal                │ │
│  │  - Handle intro completion                         │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### State Flow

1. **Initial Load**: Home page checks sessionStorage for intro completion state
2. **First Visit**: No state found → Show IntroReveal
3. **Intro Complete**: Update sessionStorage and React state
4. **Navigation**: User navigates to diary page
5. **Return Navigation**: User returns to home page → Check sessionStorage → Skip IntroReveal
6. **Session End**: Browser tab closed → sessionStorage cleared automatically

## Components and Interfaces

### useSessionState Hook

A generic custom hook for managing session-based state persistence.

```typescript
interface UseSessionStateReturn<T> {
  value: T;
  setValue: (newValue: T) => void;
  isLoading: boolean;
}

function useSessionState<T>(
  key: string,
  initialValue: T
): UseSessionStateReturn<T>
```

**Parameters:**
- `key`: Unique identifier for the sessionStorage entry
- `initialValue`: Default value when no stored value exists

**Returns:**
- `value`: Current state value
- `setValue`: Function to update both React state and sessionStorage
- `isLoading`: Boolean indicating if initial storage read is complete

**Behavior:**
- Reads from sessionStorage on mount
- Updates sessionStorage whenever value changes
- Handles SSR by checking for window availability
- Gracefully handles storage errors (quota exceeded, disabled storage)

### Updated Home Page Component

The home page will use the new hook to manage intro state:

```typescript
export default function Home() {
  const { value: introCompleted, setValue: setIntroCompleted, isLoading } = 
    useSessionState("hauntwrite_intro_completed", false);
  
  const handleIntroComplete = () => {
    setIntroCompleted(true);
    playAmbient();
  };

  // Don't render intro if already completed or still loading
  const shouldShowIntro = !isLoading && !introCompleted;

  return (
    <>
      {shouldShowIntro && <IntroReveal onComplete={handleIntroComplete} />}
      <HauntedLayout>
        {/* ... rest of page */}
      </HauntedLayout>
    </>
  );
}
```

### IntroReveal Component

No changes required to IntroReveal component. It remains a controlled component that accepts an `onComplete` callback.

## Data Models

### Session Storage Schema

```typescript
// Storage key-value pairs
type SessionStorageSchema = {
  "hauntwrite_intro_completed": "true" | "false";
  // Future session-based states can be added here
};
```

### Hook State

```typescript
type SessionState<T> = {
  value: T;
  isLoading: boolean;
};
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: State persistence after intro completion

*For any* intro completion event, when the intro animation completes and the completion handler is called, the sessionStorage SHALL contain the intro completion state with value "true".

**Validates: Requirements 1.2**

### Property 2: State persistence across navigation

*For any* navigation sequence where the intro has been completed, when a user navigates away from the home page and returns, the IntroReveal component SHALL NOT render.

**Validates: Requirements 1.3, 2.1**

### Property 3: SessionStorage usage

*For any* state update performed by the useSessionState hook, the hook SHALL write to sessionStorage (not localStorage or other storage mechanisms).

**Validates: Requirements 1.5, 3.3**

### Property 4: Immediate rendering when intro completed

*For any* home page render where the intro completion state is true, the IntroReveal component SHALL NOT be included in the rendered output.

**Validates: Requirements 2.2**

### Property 5: Graceful degradation on storage failure

*For any* storage operation failure (disabled storage, quota exceeded, or invalid data), the useSessionState hook SHALL return the initial value and allow the application to continue functioning.

**Validates: Requirements 2.3, 3.4**

### Property 6: Hook reusability with different types

*For any* valid TypeScript type T and storage key, the useSessionState hook SHALL correctly store and retrieve values of that type.

**Validates: Requirements 3.2**

## Error Handling

### Storage Errors

**Scenario**: sessionStorage is disabled or quota exceeded
- **Handling**: Catch storage exceptions and fall back to in-memory state only
- **User Impact**: Intro may replay on navigation within same session, but app remains functional
- **Logging**: Console warning for debugging

**Scenario**: Invalid JSON in sessionStorage
- **Handling**: Catch parse errors and use initial value
- **User Impact**: Intro replays as if first visit
- **Logging**: Console warning with key name

### SSR/Hydration

**Scenario**: Code runs on server where window is undefined
- **Handling**: Check for window availability before accessing sessionStorage
- **User Impact**: None - proper SSR handling
- **Implementation**: Use `typeof window !== 'undefined'` guard

### Race Conditions

**Scenario**: Multiple rapid state updates
- **Handling**: React's state batching handles this naturally
- **User Impact**: None - last update wins
- **Implementation**: No special handling needed

## Testing Strategy

### Unit Tests

Unit tests will verify specific examples and edge cases:

1. **First visit scenario**: Verify intro shows when no sessionStorage value exists
2. **New session scenario**: Verify intro shows after sessionStorage is cleared
3. **Storage disabled scenario**: Verify app functions when sessionStorage throws errors
4. **Invalid JSON scenario**: Verify hook handles corrupted storage data
5. **SSR scenario**: Verify hook doesn't crash when window is undefined

### Property-Based Tests

Property-based tests will verify universal properties across all inputs using **fast-check** (JavaScript property-based testing library):

Each property-based test will run a minimum of 100 iterations to ensure comprehensive coverage.

1. **Property 1 Test**: Generate random completion events, verify sessionStorage always contains correct value after completion
   - **Feature: intro-state-management, Property 1: State persistence after intro completion**

2. **Property 2 Test**: Generate random navigation sequences with completed intro, verify IntroReveal never renders
   - **Feature: intro-state-management, Property 2: State persistence across navigation**

3. **Property 3 Test**: Generate random state values, verify all writes go to sessionStorage
   - **Feature: intro-state-management, Property 3: SessionStorage usage**

4. **Property 4 Test**: Generate random render scenarios with introCompleted=true, verify IntroReveal not in output
   - **Feature: intro-state-management, Property 4: Immediate rendering when intro completed**

5. **Property 5 Test**: Generate random storage errors, verify hook always returns valid value
   - **Feature: intro-state-management, Property 5: Graceful degradation on storage failure**

6. **Property 6 Test**: Generate random types (string, number, boolean, object), verify hook handles all correctly
   - **Feature: intro-state-management, Property 6: Hook reusability with different types**

### Testing Tools

- **Unit Testing**: Jest + React Testing Library
- **Property-Based Testing**: fast-check
- **Component Testing**: React Testing Library with user-event
- **Storage Mocking**: jest-localstorage-mock

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

### Performance Considerations

- **Storage Access**: sessionStorage operations are synchronous but fast (< 1ms typically)
- **Initial Load**: Single storage read on mount, minimal impact
- **Updates**: Storage writes only on state changes, not on every render

### Browser Compatibility

- sessionStorage is supported in all modern browsers
- Graceful degradation for browsers with storage disabled
- No polyfills required for target browsers (modern evergreen browsers)

### Future Extensibility

The useSessionState hook can be extended for:
- Sound preferences persistence
- UI theme preferences
- Temporary form data
- Feature tour completion states
- Any other session-scoped UI state

### Migration Path

No migration needed - this is a new feature. Existing users will see the intro on their next visit, then behavior will be consistent going forward.
