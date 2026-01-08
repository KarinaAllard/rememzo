# Rememzo

Rememzo is a daily memory-based puzzle game, inspired by Wordle and other DLE-games but with a focus on remembering a scene. It’s designed as a fun pasttime that also challenges your brain, featuring **original artwork created entirely by the developer**.

The project is fully deployed and playable online.

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

- **Frontend:** React + TypeScript, TailwindCSS, Vite
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

## Deployment

The project is live and accessible online. You can play the game directly without installation:

[Play Rememzo](https://rememzo.vercel.app)

---

## Known Bugs / Limitations

- The Swedish and English question generator produces slightly different questions for the same puzzle.  
- Animations and transitions are mostly complete, but some minor UI elements may still appear abrupt on slower devices.
- Toasts might appear in the wrong place due to page animations.
