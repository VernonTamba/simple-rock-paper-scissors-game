const playerIcon = document.querySelectorAll(".you");
const computerIcon = document.querySelectorAll(".computer");
const fightingBoard = document.querySelector(".fighting-board");
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");
const playButton = document.querySelector(".button");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

// LOGIC OF THE GAME
let players = {
  player: "",
  computer: "",
};

let scoreCount = {
  player: 0,
  computer: 0,
};

const icons = ["rock", "paper", "scissors"];

playButton.addEventListener("click", () => {
  if (playButton.textContent === "PLAY") {
    playButton.textContent = "QUIT";

    // Show the game
  } else {
    // Reset, hide, and quit the game
    playButton.textContent = "PLAY";
    playerScore.textContent = 0;
    computerScore.textContent = 0;
  }
});

playerIcon.forEach((playerIcon) => {
  playerIcon.addEventListener("click", (event) => {
    // Store the current position of the icons
    let playerIconPosition = {
      top: playerIcon.getBoundingClientRect().top,
      left: playerIcon.getBoundingClientRect().left,
      right: playerIcon.getBoundingClientRect().right,
    };
    players.player = event.target.alt;
    players.computer = icons[Math.floor(Math.random() * 2)];

    // Values are still unsure and not applicable for responsive design
    gsap.to(playerIcon, {
      x: document.body.offsetWidth / 2 - playerIconPosition.left * 2.5,
      y: document.body.offsetHeight / 2 - playerIconPosition.top - 25,
    });
    playerIcon.style.transform = "scale(1.5)";

    computerIcon.forEach((computerIcon) => {
      let computerIconPosition = {
        top: computerIcon.getBoundingClientRect().top,
        right: computerIcon.getBoundingClientRect().right,
      };
      if (computerIcon.classList.contains(players.computer)) {
        // Values are still unsure and not applicable for responsive design
        gsap.to(computerIcon, {
          x: -(document.body.offsetWidth / 2 - computerIconPosition.right / 5),
          y: document.body.offsetHeight / 2 - computerIconPosition.top - 8,
          // Check who the winner is (after the animation completes)
          onComplete: () => {
            setTimeout(() => {
              checkWinner(players.player, players.computer);
            }, 1000);
            // TODO: Bring back the icons to its original state (same for the player icon)
            gsap.to(computerIcon, {
              x: computerIconPosition.right,
              y: computerIconPosition.top,
            });
          },
        });
        computerIcon.style.transform = "scale(1.5)";
      }
    });
  });
});

// Function to check the winner of the game
const checkWinner = (playerPick, computerPick) => {
  // No winner here or a draw
  if (
    (playerPick === icons[0] && computerPick === icons[0]) ||
    (playerPick === icons[1] && computerPick === icons[1]) ||
    (playerPick === icons[2] && computerPick === icons[2])
  ) {
    modalContent.textContent = "DRAW! NO WINNERS!";
    modal.showModal();
    setTimeout(() => {
      modal.close();
    }, 2000);
  }
  // Player wins here
  else if (
    (playerPick === icons[0] && computerPick === icons[2]) ||
    (playerPick === icons[1] && computerPick === icons[0]) ||
    (playerPick === icons[2] && computerPick === icons[1])
  ) {
    modalContent.textContent = "PLAYER WINS!";
    modal.showModal();
    setTimeout(() => {
      modal.close();
    }, 2000);
    scoreCount.player++;
    playerScore.textContent = scoreCount.player;
  }
  // Computer wins here
  else {
    modalContent.textContent = "COMPUTER WINS!";
    modal.showModal();
    setTimeout(() => {
      modal.close();
    }, 2000);
    scoreCount.computer++;
    computerScore.textContent = scoreCount.computer;
  }
};

// TODO: When play button clicks, do some fading in with the icons and stuff
// TODO: Change position of the picked icons when screen is changing (responsive web design)
