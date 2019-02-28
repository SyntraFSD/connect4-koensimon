// 1 MODEL
var mainElement = document.querySelector('main');
var drawMessage = document.querySelector('.drawMessage');
var state = {
  turn: null,
  winner: false,
  winnerColor: null,
  full: false,
  board: null
};
var gameSettings = {
  columns: 7,
  rows: 6
}; // 2 PURE functions

function initGameState() {
  state = {
    turn: 'yellow',
    winner: false,
    winnerColor: null,
    full: false,
    board: [['empty', 'empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty', 'empty']]
  };
  return state;
}

state = initGameState();

function dropStone(colList, dropstate) {
  var newState = JSON.parse(JSON.stringify(dropstate));
  var indexEmpty = newState.board[colList.dataset.index].reduce(function (acc, value, index) {
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
  var checkFull = board.reduce(function (colsHtml, col) {
    return col.reduce(function (acc, row) {
      if (row === 'empty') {
        return false;
      }

      return acc;
    }, colsHtml);
  }, true);
  return checkFull;
}

function fullCheckChecker(fullcheckstate) {
  var newState = JSON.parse(JSON.stringify(fullcheckstate));

  if (fullCheck(newState.board) === true) {
    newState.full = true;
  }

  return newState;
}

function stateMessage(messagestate) {
  var newState = JSON.parse(JSON.stringify(messagestate));

  if (newState.full === true) {
    return 'gelijk';
  }

  if (newState.winner === true) {
    return 'winner ' + newState.winnerColor;
  }

  return '';
}

function changeTurn(changestate) {
  var newState = JSON.parse(JSON.stringify(changestate));

  if (newState.turn === 'yellow') {
    newState.turn = 'red';
  } else {
    newState.turn = 'yellow';
  }

  return newState;
}

function makeSearchArrays(startColIndex, startRowIndex, colIncrement, rowIncrement, arraygameSettings, makeArraysgamestate) {
  var newState = JSON.parse(JSON.stringify(makeArraysgamestate));
  var newSearchArray = [];
  var colIndex = startColIndex;
  var rowIndex = startRowIndex;

  while (colIndex < gameSettings.columns && rowIndex < gameSettings.rows && colIndex >= 0 && rowIndex >= 0) {
    newSearchArray.push(newState.board[colIndex][rowIndex]);
    colIndex += colIncrement;
    rowIndex += rowIncrement;
  }

  return newSearchArray;
}

function checkFor4color(array) {
  var newArray = JSON.parse(JSON.stringify(array));
  newArray.forEach(function (value) {
    value.reduce(function (acc, val) {
      var teller = 0;
      var check = val.reduce(function (accumulator, itemval) {
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

function checkWinner(array) {}

function searchForWinners(c4gameSettings, c4gamestate) {
  var rowArray = [];
  var colArray = [];
  rowArray.push(c4gamestate.board.map(function (value, index) {
    return makeSearchArrays(index, 0, 0, 1, c4gameSettings, c4gamestate);
  }));
  colArray.push(c4gamestate.board.map(function (value, index) {
    return makeSearchArrays(0, index, 1, 0, c4gameSettings, c4gamestate);
  }));
  var Arrays = [checkFor4color(rowArray), checkFor4color(colArray)];
  checkWinner(Arrays);
} // 3 VIEW functions


function generateBoardHtml(board) {
  return board.reduce(function (colsHtml, col, colIndex) {
    var colHtml = '<div class="col" data-index="' + colIndex + '">';
    colHtml += col.reduce(function (rowsHtml, row) {
      return '<div class="row ' + row + '"></div>' + rowsHtml;
    }, '');
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
} // 4 EVENTS


var htmlboard = drawBoard(state.board, state.turn, mainElement);
htmlboard.addEventListener('click', function (event) {
  var colList = event.target.closest('.col');

  if (event.target.matches('.col,.row')) {
    var newDrop = dropStone(colList, state);

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
//# sourceMappingURL=game.js.map