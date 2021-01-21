let turn = true;

let board = {
  0: ['', '', ''],
  1: ['', '', ''],
  2: ['', '', '']
}

let blankBoard = {
  0: ['', '', ''],
  1: ['', '', ''],
  2: ['', '', '']
}

const _board = document.getElementById("board");
const newGame = document.getElementById('new game');

_board.onclick = function(event) {
  let target = event.target;
  let targetId = target.getAttribute('id');
  target.innerText = handlePlay();
  assignPlay(targetId, target.innerText);
  if (detectWinner()) {
    console.log(board);
    setTimeout(() => {
      alert('WINNER!')
      reset();
    }, 250)
  }
  if (detectTie()) {
    console.log(board);
    setTimeout(() => {
      alert('TIE!');
      reset();
    }, 250)
  }
}

newGame.onclick = function(event) {
  reset();
}

const assignPlay = function(id, move) {
  let split = id.split('-');
  let key = Number(split[0]);
  let index = Number(split[1]);
  board[key][index] = move;
}

const handlePlay = function() {
  let move = 'O';
  if (turn) {
    move = 'X'
  }
  turn = !turn;
  return move;
}

const detectRowWinner = function() {
  for (let row in board) {
    if (row[0] !== '') {
      let move = row[0];
      if (board[row].every(item => move === item)) {
        return move;
      }
    }
  }
  return undefined;
}

const detectMajDiagWinner = function() {
  const flattened = board[0].concat(board[1]).concat(board[2]);
  const diag = [flattened[0], flattened[4], flattened[8]];
  if (diag[0] !== '') {
    let move = diag[0];
    if (diag.every(item => move === item)) {
      return move;
    }
  }
}

const detectMinDiagWinner = function() {
  const flattened = board[0].concat(board[1]).concat(board[2]);
  const diag = [flattened[2], flattened[4], flattened[6]];
  if (diag[0] !== '') {
    let move = diag[0];
    if (diag.every(item => move === item)) {
      return move;
    }
  }
}

const detectColumnWinner = function() {
  const flattened = board[0].concat(board[1]).concat(board[2]);
  for (let i = 0; i < 3; i++) {
    if (flattened[i] !== '') {
      if (flattened[i] === flattened [i + 3] && flattened[i] === flattened[i + 6]) {
        return flattened[i];
      }
    }
  }
}

const detectTie = function() {
  const flattened = board[0].concat(board[1]).concat(board[2]);
  return flattened.every(item => item !== '');
}

const detectWinner = function() {
  if (detectMajDiagWinner() || detectMinDiagWinner() || detectColumnWinner() || detectRowWinner()) {
    return true;
  }
  return false;
}

const reset = function() {
  turn = true;
  board[0] = [...blankBoard[0]];
  board[1] = [...blankBoard[1]];
  board[2] = [...blankBoard[2]];
  let cells = document.getElementsByClassName('cell');
  for (let cell of cells) {
    cell.innerText = '';
  }
}