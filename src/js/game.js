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

const gameSettings = {
  columns: 7,
  rows: 6,
};

// 2 PURE functions

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
  return state;
}

state = initGameState();

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

function makeSearchArrays(startColIndex, startRowIndex, colIncrement, rowIncrement,
  arraygameSettings, makeArraysgamestate) {
  const newState = JSON.parse(JSON.stringify(makeArraysgamestate));
  const newSearchArray = [];
  let colIndex = startColIndex;
  let rowIndex = startRowIndex;
  while (colIndex < gameSettings.columns
  && rowIndex < gameSettings.rows
  && colIndex >= 0 && rowIndex >= 0) {
    newSearchArray.push(newState.board[colIndex][rowIndex]);
    colIndex += colIncrement;
    rowIndex += rowIncrement;
  }
  return newSearchArray;
}

function checkFor4color(array) {
  const newArray = JSON.parse(JSON.stringify(array));
  newArray.forEach(function (value) {
    value.reduce(function (acc, val) {
      let teller = 0;
      const check = val.reduce(function (accumulator, itemval) {
        if (itemval === 'empty') {
          teller += 1;
        } else {
          teller = 0;
        }

        if (teller === 4) {
          return true;
        }
      }, false);

      if (check) {
        return acc[acc.length] = val;
      }
      return acc;
    }, []);
  });
  console.log(newArray);
  return newArray;
}

function checkWinner(array) {

}


function searchForWinners(c4gameSettings, c4gamestate) {
  const rowArray = [];
  const colArray = [];

  rowArray.push(c4gamestate.board.map(function (value, index) {
    return makeSearchArrays(index, 0, 0, 1, c4gameSettings, c4gamestate);
  }));

  colArray.push(c4gamestate.board.map(function (value, index) {
    return makeSearchArrays(0, index, 1, 0, c4gameSettings, c4gamestate);
  }));


  const Arrays = [checkFor4color(rowArray), checkFor4color(colArray)];

  checkWinner(Arrays);
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

function drawturn(boardElement, turn) {
  boardElement.classList.add(turn);
  boardElement.classList.remove(changeTurn(turn));
}

function drawBoard(board, turn, htmlElement, boardElement) {
  if (!boardElement) {
    boardElement = document.createElement('div');
    boardElement.id = 'board';
  }
  drawturn(boardElement, turn);
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
      searchForWinners(gameSettings, state);
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
