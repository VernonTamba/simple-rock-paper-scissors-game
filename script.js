const playerIcons = document.querySelectorAll(".you");
const computerIcons = document.querySelectorAll(".computer");
const fightingBoard = document.querySelector(".fighting-board");
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");
const playButton = document.querySelector(".button");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const container = document.querySelector(".container");
// const playerYouDiv = document.querySelector(".player-you");
// const playerComputerDiv = document.querySelector(".player-computer");

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

playerIcons.forEach((playerIcon) => {
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
      x: document.body.clientWidth / 3 + 20,
      y:
        playerIcons[1].getBoundingClientRect().top -
        (playerIconPosition.top + 20),
    });
    playerIcon.style.transform = "scale(1.5)";

    computerIcons.forEach((computerIcon) => {
      if (computerIcon.classList.contains(players.computer)) {
        let computerIconPosition = {
          top: computerIcon.getBoundingClientRect().top,
          right: computerIcon.getBoundingClientRect().right,
        };
        let computerIconOriginalPosition = {
          x: computerIcon.offsetLeft,
          y: computerIcon.offsetTop,
        };
        console.log(computerIconPosition);
        console.log(computerIconOriginalPosition);
        computerIcon.style.transform = "scale(1.5)";
        // Values are still unsure and not applicable for responsive design
        gsap.to(computerIcon, {
          x: -(document.body.clientWidth / 3 - 20),
          y:
            computerIcons[1].getBoundingClientRect().top -
            computerIconPosition.top,
          // Check who the winner is (after the animation completes)
          onComplete: () => {
            setTimeout(() => {
              checkWinner(players.player, players.computer);
              console.log(-(document.body.clientWidth / 3 - 20));
              console.log(
                computerIcons[1].getBoundingClientRect().top -
                  computerIconPosition.top
              );
            }, 1000);
            // TODO: Bring back the icons to its original state (same for the player icon)
            // gsap.to(computerIcon, {
            //   x: computerIconOriginalPosition.x,
            //   y: computerIconOriginalPosition.y,
            // });
          },
        });
      }
    });
  });
});

// Function to check the winner of the game
const checkWinner = (playerPick, computerPick) => {
  // If both players have 2 points, that means sudden death (last one wins)
  if (scoreCount.player === 2 && scoreCount.computer === 2) {
    modalContent.textContent = "SUDDEN DEATH!";
    modal.showModal();
    setTimeout(() => {
      modal.close();
    }, 2000);
  }
  // No winner here or a draw
  else if (
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
    if (scoreCount.player === 3) {
      modalContent.textContent = "GAME OVER! PLAYER WINS!";
      modal.showModal();
      setTimeout(() => {
        modal.close();
      }, 2000);
    }
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
    if (scoreCount.computer === 3) {
      modalContent.textContent = "GAME OVER! COMPUTER WINS!";
      modal.showModal();
      setTimeout(() => {
        modal.close();
      }, 2000);
    }
  }
};

// TODO: When play button clicks, do some fading in with the icons and stuff
// TODO: Change position of the picked icons when screen is changing (responsive web design)
