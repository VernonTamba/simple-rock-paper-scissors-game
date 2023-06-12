const playerIcons = document.querySelectorAll(".you");
const computerIcons = document.querySelectorAll(".computer");
const fightingBoard = document.querySelector(".fighting-board");
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");
const playButton = document.querySelector(".button");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const container = document.querySelector(".container");
const playerDiv = document.querySelector(".player-you");
const computerDiv = document.querySelector(".player-computer");
const boards = document.querySelector(".board-container");
const header = document.querySelector(".header");

// ANIMATION WHEN THE WINDOW LOADS
window.addEventListener("load", () => {
  gsap.from(header, {
    y: -100,
    duration: 2,
  });

  gsap.from(playerDiv, {
    x: -300,
    duration: 2,
  });

  gsap.from(computerDiv, {
    x: 300,
    duration: 2,
  });

  gsap.from(boards, {
    y: -10,
    duration: 2,
  });
});

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

// playButton.addEventListener("click", () => {
//   if (playButton.textContent === "PLAY") {
//     playButton.textContent = "QUIT";

//     // Show the game
//   } else {
//     // Reset, hide, and quit the game
//     playButton.textContent = "PLAY";
//     playerScore.textContent = 0;
//     computerScore.textContent = 0;
//   }
// });

playerIcons.forEach((playerIcon) => {
  playerIcon.addEventListener("click", (event) => {
    // Store the current position of the icons
    let playerIconPosition = {
      top: playerIcon.getBoundingClientRect().top,
      left: playerIcon.getBoundingClientRect().left,
      right: playerIcon.getBoundingClientRect().right,
    };
    let playerIconOriginalPosition = {
      x: playerIcon.offsetLeft,
      y: playerIcon.offsetTop,
    };
    // Store the player icon and get the random computer icon
    players.player = event.target.alt;
    players.computer = icons[Math.floor(Math.random() * 3)];

    // Values are still unsure and not applicable for responsive design
    gsap.to(playerIcon, {
      x: playerIconOriginalPosition.x * 42.5,
      y: playerIcons[1].getBoundingClientRect().top - playerIconPosition.top,
      onComplete: () => {
        // Bring back the icon to its original position
        gsap.to(playerIcon, {
          x: -playerIconOriginalPosition.x / 100,
          y: -playerIconOriginalPosition.y / 100,
          delay: 4,
        });
      },
    });

    computerIcons.forEach((computerIcon) => {
      if (computerIcon.classList.contains(players.computer)) {
        // computerIcon.style.transform = "scale(2)";
        let computerIconPosition = {
          top: computerIcon.getBoundingClientRect().top,
          right: computerIcon.getBoundingClientRect().right,
        };
        let computerIconOriginalPosition = {
          x: computerIcon.offsetLeft,
          y: computerIcon.offsetTop,
        };
        // Values are still unsure and not applicable for responsive design
        gsap.to(computerIcon, {
          x: -playerIconOriginalPosition.x * 44.5,
          y:
            computerIcons[1].getBoundingClientRect().top -
            computerIconPosition.top,
          // Check who the winner is (after the animation completes)
          onComplete: () => {
            setTimeout(() => {
              checkWinner(players.player, players.computer);
            }, 2000);
            // Bring back the icon to its original position
            gsap.to(computerIcon, {
              x: computerIconOriginalPosition.x / 100,
              y: -computerIconOriginalPosition.y / 100,
              delay: 4,
            });
          },
        });
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
    displayModal();
  }
  // Player wins here
  else if (
    (playerPick === icons[0] && computerPick === icons[2]) ||
    (playerPick === icons[1] && computerPick === icons[0]) ||
    (playerPick === icons[2] && computerPick === icons[1])
  ) {
    scoreCount.player++;
    if (scoreCount.player === 3) {
      resetGame();
      modalContent.textContent = "GAME OVER! PLAYER WINS!";
      displayModal();
    } else {
      modalContent.textContent = "PLAYER WINS!";
      displayModal();
      playerScore.textContent = scoreCount.player;
    }
  }
  // TODO: Fix the positioning of the icons on the board
  // Computer wins here
  else {
    scoreCount.computer++;
    if (scoreCount.computer === 3) {
      resetGame();
      modalContent.textContent = "GAME OVER! COMPUTER WINS!";
      displayModal();
    } else {
      modalContent.textContent = "COMPUTER WINS!";
      displayModal();
      computerScore.textContent = scoreCount.computer;
    }
  }
  // If both players have 2 points, that means sudden death (last one wins)
  if (scoreCount.player === 2 && scoreCount.computer === 2) {
    modalContent.textContent = "SUDDEN DEATH!";
    displayModal();
  }
};

const displayModal = () => {
  modal.showModal();
  setTimeout(() => {
    modal.close();
  }, 1500);
};

const resetGame = () => {
  scoreCount.player = 0;
  scoreCount.computer = 0;
  playerScore.textContent = "0";
  computerScore.textContent = "0";
};

// TODO: Change position of the picked icons when screen is changing (responsive web design)
// TODO: Fix the positioning of the modal
