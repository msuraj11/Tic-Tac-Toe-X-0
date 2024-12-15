import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Logs from "./components/Logs";
import Player from "./components/Player";
import {
  generateWinningCombination,
  initialGameBoard,
  derivedActivePlayer,
} from "./helpers";

const winnigCombinations3x3 = generateWinningCombination(3);

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;
  for (const combination of winnigCombinations3x3) {
    const firstSquareSymbol =
      gameBoard[combination[0]?.row][combination[0]?.column];
    const secondSquareSymbol =
      gameBoard[combination[1]?.row][combination[1]?.column];
    const thirdSquareSymbol =
      gameBoard[combination[2]?.row][combination[2]?.column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            symbol="X"
            initialName="Player 1"
            isActive={activePlayer === "X"}
          />
          <Player
            symbol="O"
            initialName="Player 2"
            isActive={activePlayer === "O"}
          />
        </ol>
        {winner && `You won, ${winner}`}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Logs turns={gameTurns} />
    </main>
  );
}

export default App;
