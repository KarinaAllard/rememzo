# Rememzo

Rememzo is a daily memory-based puzzle game, inspired by Wordle and other DLE-games but with a focus on remembering a scene. It’s designed as a fun pastime that also challenges your brain, featuring **original artwork created entirely by the developer**.

The project is fully deployed and playable online.

[Play Rememzo](https://rememzo.vercel.app)

## Key Features

- **Daily Puzzles:** A new puzzle is available every day.
- **User Accounts:** JWT-based login and registration.
- **Multi-Language Support:** Switch between English and Swedish seamlessly.
- **Session Handling:** Persistent user sessions with automatic token refresh.
- **Responsive Design:** Works smoothly on mobile, tablet, and desktop screens.
- **Interactive Gameplay:** Animations and transitions make the experience engaging.
- **Accessible:** Designed with accessibility in mind for a wide range of users.
- **Original Art:** All graphics, icons, and visual elements were created by the author.

## Tech Stack

- **Frontend:** React + TypeScript, TailwindCSS, Vite, Framer-Motion, Axios, Flag-Icons
- **Backend:** Node.js + Express + TypeScript, MongoDB
- **Authentication:** JWT with refresh tokens
- **Deployment:** Vercel (frontend) and Railway (backend)

## Project Concept

Rememzo is designed as a casual game that users can play daily. Each puzzle challenges the player’s memory and sequence recognition skills. It’s engaging, fast to pick up, and visually unique thanks to the custom art created for the project.

The app also demonstrates:

- Full frontend/backend integration
- Multi-language support
- Responsive, polished UI with animations
- Secure user authentication and session management

## Game Flow & Architecture

Rememzo uses a **phase-based game flow** to ensure players experience the game in the intended order and cannot bypass steps via URL navigation or UI manipulation.

The game state is managed globally through a `GameContext`, which tracks the current phase of the daily game, session hydration, and attempt state.

### Game Phases

The game progresses through the following phases:

- **idle** – Initial state before the user starts the daily game  
- **countdown** – Short countdown before gameplay begins  
- **question** – Memory questions are presented  
- **result** – Results and feedback are shown  
- **completed** – The daily attempt is finished and locked  

This structure ensures that:

- Logged in users can only play **once per day**
- Results cannot be accessed without completing the game
- Reloads or navigation attempts should not break the intended flow

### GameGuard (Flow Protection)

A `GameGuard` component is used to restrict access to views based on the current game phase.

Each screen declares which phases are allowed, and content is conditionally rendered only when the player is in a valid state. This prevents users from skipping steps or accessing protected views prematurely.

This approach acts as a lightweight **anti-cheat and flow validation mechanism** on the frontend.


## Deployment

The project is live and accessible online. You can play the game directly without installation:

[Play Rememzo](https://rememzo.vercel.app)

---

## Known Bugs / Limitations

- After completing a daily attempt, the game may require opening the app in a **new browser tab** to start a fresh session. This is a known session-state issue.
- The Swedish and English question generator produces slightly different questions for the same puzzle.  
- Animations and transitions are mostly complete, but some minor UI elements may still appear abrupt on slower devices.
- Toasts might appear in the wrong place due to page animations.

## Submission Note

This README was slightly updated after the initial submission to clarify game flow, architecture, and known limitations.  
No functional changes were made to the application after the deadline.
