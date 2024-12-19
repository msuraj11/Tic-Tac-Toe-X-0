import {O, X} from './constants';

export function generateGameBoard(boardSize) {
  return new Array(boardSize).fill().map(() => new Array(boardSize).fill(null));
}

export function derivedActivePlayer(gameTurns) {
  return gameTurns?.length > 0 && gameTurns[0].player === X ? O : X;
}

// Works for 3x3, 4x4, 5x5
export function generateWinningCombination(boardSize) {
  const straightCombinations = boardSize * 2; //n * 2
  const crossCombinations = 2; // +2
  const totalCombinationsLength = straightCombinations + crossCombinations; // (n * 2) + 2
  const combinationArray = Array(totalCombinationsLength).fill(); // Empty array with (n * 2) + 2 spaces
  return combinationArray.map((_, combiKey) => {
    return Array(boardSize) // each combination will have n tiles filled with certain combinations ex: 4x4 has 4 squares filled in a combination
      .fill({})
      .map((__, squareKey) => {
        if (combiKey <= boardSize - 1) {
          // until n-1th position row value will be combinationArray's index value
          return {row: combiKey, column: squareKey};
        }
        if (combiKey >= boardSize && combiKey <= straightCombinations - 1) {
          // after nth position combinationArray's index minus boardSize
          return {row: squareKey, column: combiKey - boardSize};
        }
        if (combiKey === straightCombinations) {
          // combinationArray's index is equal to totalCombinationsLength - 2
          return {row: squareKey, column: boardSize - squareKey - 1};
        } else {
          return {row: squareKey, column: squareKey}; // last case row and column are equal
        }
      });
  });
}

export function deriveWinner(gameBoard, players, boardSize) {
  let winner;
  for (const combination of generateWinningCombination(boardSize)) {
    // Generate a board size array because one combination is equivalent to board size.
    const symbolArray = Array(boardSize)
      .fill(null)
      .map((_, key) => {
        return gameBoard[combination[key]?.row][combination[key]?.column];
      });
    const firstSquareSymbol = symbolArray[0];
    let hasSymbolMatchCombination = Boolean(firstSquareSymbol);
    // if there is no firstSquareSymbol it is clear that this current iteration is not the Winning combination.
    // so we don't go checking next squareSymbolArray items.
    if (hasSymbolMatchCombination) {
      // checking if each squareSymbol in array is same as first, i.e, All squares have same symbol.
      for (const symbol of symbolArray) {
        hasSymbolMatchCombination =
          hasSymbolMatchCombination && firstSquareSymbol === symbol;
      }
    }
    if (hasSymbolMatchCombination) {
      winner = players[firstSquareSymbol];
      break;
    }
  }

  return winner;
}

export function deriveGameBoard(gameTurns, freshGame, boardSize) {
  const gameBoard = [...generateGameBoard(boardSize).map((row) => [...row])];
  if (freshGame) {
    return gameBoard;
  }
  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
