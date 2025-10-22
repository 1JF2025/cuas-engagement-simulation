// script.js
document.addEventListener("DOMContentLoaded", () => {
    // =================================================================
    // CORE GAME LOGIC
    // =================================================================

    const MOVES = ["Drone", "Jammer", "Interceptor"];
    const BEATS = {
        "Drone": "Interceptor",
        "Jammer": "Drone",
        "Interceptor": "Jammer"
    };

    /**
     * Selects a random move for the computer.
     * @returns {string} One of the moves from the MOVES array ('Drone', 'Jammer', or 'Interceptor').
     */
    function getComputerChoice() {
        return MOVES[Math.floor(Math.random() * MOVES.length)];
    }

    /**
     * Compares the player's move against the computer's move to determine the winner.
     * @param {string} pilotMove - The player's selected move.
     * @param {string} computerMove - The computer's randomly selected move.
     * @returns {object} An object with the 'outcome' ('win', 'lose', 'draw') and a 'message'.
     */
    function determineOutcome(pilotMove, computerMove) {
        if (pilotMove === computerMove) {
            return { outcome: "draw", message: `Stand-off — both deployed ${pilotMove}.` };
        }
        if (BEATS[pilotMove] === computerMove) {
            const messages = {
                "Drone": "Your Drone evaded the Interceptor and completed the mission!",
                "Jammer": "Your Jammer disrupted enemy Drone comms — target neutralized!",
                "Interceptor": "Your Interceptor destroyed the enemy Jammer — signal restored!"
            };
            return { outcome: "win", message: messages[pilotMove] };
        } else {
            const lossMessages = {
                "Drone": "Your Drone was jammed — communications lost!",
                "Jammer": "Enemy Interceptor destroyed your Jammer!",
                "Interceptor": "Enemy Drone outmaneuvered your Interceptor!"
            };
            return { outcome: "lose", message: lossMessages[pilotMove] };
        }
    }

    // =================================================================
    // GAME STATE & DOM ELEMENTS
    // =================================================================

    // Game Configuration
    const BEST_OF = 5;
    const WINNING_SCORE = Math.floor(BEST_OF / 2) + 1;

    // Game State
    let pilotScore = 0;
    let computerScore = 0;
    let engagementNumber = 0;

    // DOM Elements
    const pilotScoreEl = document.getElementById("pilot-score");
    const computerScoreEl = document.getElementById("computer-score");
    const engagementNumberEl = document.getElementById("engagement-number");
    const resultMessageEl = document.getElementById("result-message");
    const moveButtons = document.querySelectorAll(".move-btn");
    const resetBtn = document.getElementById("reset-btn");

    /**
     * Updates the scoreboard display with the current game state values.
     */
    function updateBoard() {
        pilotScoreEl.textContent = pilotScore;
        computerScoreEl.textContent = computerScore;
        engagementNumberEl.textContent = engagementNumber;
    }

    // =================================================================
    // GAMEPLAY & INTERACTION
    // =================================================================

    /**
     * Handles the end of game logic.
     * @todo Implement full UI for end of game reset.
     */
    function endSimulation() {
        // TODO: Disable buttons, show final message and unhide resert button.
        // It will be replaced with the real logic in the next commit.
        console.warn("endSimulation() called but is not fully complete.");
    }

    /**
     * Handles the main logic for a single round of the game.
     * @param {string} pilotMove - The move selected by the player.
     */
    function handleMove(pilotMove) {
        // Stop the game if a winner has already been decided
        if (pilotScore >= WINNING_SCORE || computerScore >= WINNING_SCORE) return;

        engagementNumber++;
        const cpuMove = getComputerChoice();
        const res = determineOutcome(pilotMove, cpuMove);

        // Update scores and messages
        resultMessageEl.textContent = `Round ${engagementNumber}: ${res.message}`;
        if (res.outcome === "win") pilotScore++;
        if (res.outcome === "lose") computerScore++;
        
        updateBoard();

        // Check for a game-ending condition
        if (pilotScore >= WINNING_SCORE || computerScore >= WINNING_SCORE) {
            endSimulation();
        }
    }

    // Add click listeners to all move buttons
    moveButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const move = btn.dataset.move;
            handleMove(move);
        });
    });
});