document.addEventListener('DOMContentLoaded', () => {
  let currentPlayer = 1;
  let player1Score = 0;
  let player2Score = 0;
  let gameOver = false;

  const player1Display = document.querySelector('.p1');
  const player2Display = document.querySelector('.p2');
  const playerText = document.getElementById('playerText');
  const spaces = document.querySelectorAll('.space');
  const restartBtn = document.getElementById('restartBtn');
  const announcer = document.getElementById('announcer');

  player1Display.textContent = `Player 1: ${player1Score}`;
  player2Display.textContent = `Player 2: ${player2Score}`;

  spaces.forEach(space => {
    space.addEventListener('click', () => {
      if (!gameOver && !space.textContent) {
        space.textContent = currentPlayer === 1 ? 'X' : 'O';
        checkWinner();
        currentPlayer = 3 - currentPlayer; // Switch between 1 and 2
        playerText.textContent = `Player ${currentPlayer}'s turn`;
      }
    });
  });

  restartBtn.addEventListener('click', restartGame);

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        spaces[a].textContent &&
        spaces[a].textContent === spaces[b].textContent &&
        spaces[a].textContent === spaces[c].textContent
      ) {
        announceWinner(currentPlayer);
        return;
      }
    }

    if ([...spaces].every(space => space.textContent)) {
      announceDraw();
    }
  }

  function announceWinner(winner) {
    if (winner === 1) {
      player1Score++;
    } else {
      player2Score++;
    }
    gameOver = true;
    player1Display.textContent = `Player 1: ${player1Score}`;
    player2Display.textContent = `Player 2: ${player2Score}`;
    announcer.innerHTML = winner === 1
      ? 'Player <span class="playerX">1(X)</span> Wins!'
      : 'Player <span class="playerO">2(O)</span> Wins!';
    announcer.classList.remove('hide');
  }

  function announceDraw() {
    gameOver = true;
    announcer.innerText = "It's a Draw!";
    announcer.classList.remove('hide');
  }

  function restartGame() {
    spaces.forEach(space => {
      space.textContent = '';
    });
    gameOver = false;
    announcer.classList.add('hide');
    playerText.textContent = `Player ${currentPlayer}'s turn`;
  }
});
