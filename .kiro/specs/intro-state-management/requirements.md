# Requirements Document

## Introduction

This specification addresses the state management of the IntroReveal component in HauntWrite to ensure a consistent user experience during navigation. Currently, when users navigate from the home page to the diary page and then return to the home page, the intro animation plays again, disrupting the user experience. This feature will implement proper state persistence to ensure the intro animation only plays once per session.

## Glossary

- **IntroReveal**: The cinematic smoke animation component that plays when users first visit the home page
- **Session**: A single continuous period of user interaction with the application, ending when the browser tab/window is closed
- **Navigation**: The act of moving between different routes in the application (e.g., from "/" to "/diary")
- **State Persistence**: The mechanism of storing and retrieving application state across component re-renders and route changes
- **Home Page**: The landing page at route "/"
- **Diary Page**: The main diary interface at route "/diary"

## Requirements

### Requirement 1

**User Story:** As a user, I want the intro animation to play only once per session, so that I can navigate freely without seeing the animation repeatedly.

#### Acceptance Criteria

1. WHEN a user first visits the home page in a new session THEN the IntroReveal component SHALL display the cinematic smoke animation
2. WHEN a user completes the intro animation and navigates to the diary page THEN the system SHALL persist the intro completion state
3. WHEN a user navigates back to the home page from the diary page THEN the IntroReveal component SHALL NOT display again
4. WHEN a user closes the browser tab and opens the application in a new tab THEN the IntroReveal component SHALL display again
5. WHEN the intro completion state is stored THEN the system SHALL use session-based storage that clears when the browser session ends

### Requirement 2

**User Story:** As a user, I want smooth transitions between pages without unexpected animations, so that my navigation experience feels seamless.

#### Acceptance Criteria

1. WHEN a user navigates between the home page and diary page THEN the system SHALL maintain consistent state without component re-initialization
2. WHEN the intro has been completed THEN the home page SHALL render immediately without delay
3. WHEN state persistence fails THEN the system SHALL default to showing the intro animation to ensure functionality

### Requirement 3

**User Story:** As a developer, I want a reusable state management pattern for session-based UI states, so that similar features can be implemented consistently.

#### Acceptance Criteria

1. WHEN implementing intro state management THEN the system SHALL use a custom React hook for state persistence
2. WHEN the state management hook is created THEN it SHALL be reusable for other session-based state needs
3. WHEN storing state THEN the system SHALL use sessionStorage for automatic cleanup on browser close
4. WHEN retrieving state THEN the system SHALL handle missing or invalid storage values gracefully
