// 1 MODEL

const mainElement = document.querySelector('main');
const drawMessage = document.querySelector('.drawMessage');

let state = {
  turn: null,
  winner: false,
  winnerColor: null,
  full: false,
  board: null,
};

function initGameState() {
  state = {
    turn: 'yellow',
    winner: false,
    winnerColor: null,
    full: false,
    board: [
      ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ],
  };
}

initGameState();


// 2 PURE functions

function dropStone(colList, dropstate) {
  const newState = JSON.parse(JSON.stringify(dropstate));
  const indexEmpty = newState.board[colList.dataset.index].reduce((acc, value, index) => {
    if (acc === false) {
      if (value === 'empty') {
        return index;
      }
      return acc;
    }
    return acc;
  }, false);

  if (indexEmpty === false) {
    return false;
  }
  newState.board[colList.dataset.index][indexEmpty] = state.turn;
  return newState;
}

function fullCheck(board) {
  const checkFull = board.reduce((colsHtml, col) => col.reduce((acc, row) => {
    if (row === 'empty') {
      return false;
    }
    return acc;
  }, colsHtml), true);
  return checkFull;
}

function fullCheckChecker(fullcheckstate) {
  const newState = JSON.parse(JSON.stringify(fullcheckstate));
  if (fullCheck(newState.board) === true) {
    newState.full = true;
  }
  return newState;
}

function stateMessage(messagestate) {
  const newState = JSON.parse(JSON.stringify(messagestate));
  if (newState.full === true) {
    return 'gelijk';
  }

  if (newState.winner === true) {
    return 'winner ' + newState.winnerColor;
  }

  return '';
}

function changeTurn(changestate) {
  const newState = JSON.parse(JSON.stringify(changestate));

  if (newState.turn === 'yellow') {
    newState.turn = 'red';
  } else {
    newState.turn = 'yellow';
  }
  return newState;
}


// 3 VIEW functions

function generateBoardHtml(board) {
  return board.reduce((colsHtml, col, colIndex) => {
    let colHtml = '<div class="col" data-index="' + colIndex + '">';
    colHtml += col.reduce((rowsHtml, row) => '<div class="row ' + row + '"></div>' + rowsHtml, '');
    colHtml += '</div>';
    return colsHtml + colHtml;
  }, '');
}

function drawBoard(board, turn, htmlElement, boardElement) {
  if (!boardElement) {
    boardElement = document.createElement('div');
  }
  boardElement.id = 'board';
  boardElement.classList.add(turn);
  boardElement.innerHTML = generateBoardHtml(board);
  htmlElement.appendChild(boardElement);
  return boardElement;
}


function changecolorstone(color, board) {
  if (color === 'yellow') {
    board.classList.remove('yellow');
    board.classList.add('red');
  } else {
    board.classList.remove('red');
    board.classList.add('yellow');
  }
}


// 4 EVENTS

const htmlboard = drawBoard(state.board, state.turn, mainElement);

htmlboard.addEventListener('click', (event) => {
  const colList = event.target.closest('.col');
  if (event.target.matches('.col,.row')) {
    const newDrop = dropStone(colList, state);
    if (newDrop) {
      state = newDrop;
      state = fullCheckChecker(state);
      changecolorstone(state.turn, htmlboard);
      state = changeTurn(state);
      drawMessage.textContent = stateMessage(state);
      drawBoard(state.board, state.turn, mainElement, htmlboard);
    } else if (state.full === true) {
      initGameState();
      drawBoard(state.board, state.turn, mainElement, htmlboard);
      drawMessage.textContent = stateMessage(state);
    }
  }
});
