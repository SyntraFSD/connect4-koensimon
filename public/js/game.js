// ----------------- 1. MODEL --------------------------
// html elements
var mainElement = document.querySelector('main');
var drawMessage = document.querySelector('.drawMessage');
var state = null; // -------------------- 2. UPDATE (only pure functions here) --------------------------

function initGameState() {
  return {
    turn: 'yellow',
    winner: false,
    winnerColor: null,
    full: false,
    board: [['empty', 'empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty', 'empty']]
  };
} // ---------------------3. VIEW -----------------------------------------------


function generateBoardHtml(board) {
  return board.reduce(function (colsHtml, col, colIndex) {
    var colHtml = '<div class="col" data-index="' + colIndex + '">';
    colHtml += col.reduce(function (rowsHtml, row, rowIndex) {
      return '<div class="row ' + row + '"></div>' + rowsHtml;
    }, '');
    colHtml += '</div>';
    return colsHtml + colHtml;
  }, '');
}

initGameState();

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

function changeTurn(state, col) {
  if (state.turn === 'yellow') {
    state.turn = 'red';
    htmlboard.classList.remove('yellow');
    htmlboard.classList.add('red');
  } else {
    state.turn = 'yellow';
    htmlboard.classList.remove('red');
    htmlboard.classList.add('yellow');
  }

  return state;
}

function dropStone(colList, state) {
  var indexEmpty = state.board[colList.dataset.index].reduce(function (acc, value, index) {
    if (acc === false) {
      if (value === 'empty') {
        return index;
      } else {
        return acc;
      }
    } else {
      return acc;
    }
  }, false);

  if (indexEmpty === false) {
    return false;
  } else {
    state.board[colList.dataset.index][indexEmpty] = state.turn;
    console.log(state.board);
    return state;
  }
}

function fullCheck(board) {
  var checkFull = board.reduce(function (colsHtml, col, colIndex) {
    return col.reduce(function (acc, row, rowIndex) {
      if (row === 'empty') {
        return false;
      } else {
        return acc;
      }
    }, colsHtml);
  }, true);
  return checkFull;
}

function fullCheckChecker(state) {
  if (fullCheck(state.board) === true) {
    state.full = true;
  }

  return state;
}

function stateMessage(state) {
  if (state.full === true) {
    return "gelijk";
  } else if (state.winner === true) {
    return "winner " + state.winnerColor;
  }

  return "";
}

var htmlboard = drawBoard(state.board, state.turn, mainElement); // -------------------------- 4. EVENTS -----------------------------------------

htmlboard.addEventListener('click', function (event) {
  var colList = event.target.closest('.col');

  if (event.target.matches('.col,.row')) {
    var newDrop = dropStone(colList, state);

    if (newDrop) {
      state = newDrop;
      state = fullCheckChecker(state);
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
window.addEventListener('load', functio());
//# sourceMappingURL=game.js.map