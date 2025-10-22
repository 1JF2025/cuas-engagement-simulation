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
});