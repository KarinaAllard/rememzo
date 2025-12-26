/*
The GamePhase will ensure that the player only navigates the game in the intended game flow and does not successfully manipulate it through freely navigating in the URL or through the UI.
Below are the different states of the game:
*/

export type GamePhase = 
| "idle"            // before the user presses Start
| "countdown"       // countdown active
| "question"        // question visible
| "result"          // result shown
| "paused"          // user left mid-game
| "completed";      // daily game is finished