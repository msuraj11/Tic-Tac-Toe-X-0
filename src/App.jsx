import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Logs from "./components/Logs";
import Player from "./components/Player";
import GameOver from "./components/GameOver";
import {
  generateWinningCombination,
  derivedActivePlayer,
  generateGameBoard,
} from "./helpers";
import { PLAYER_1, PLAYER_2, X, O } from "./constants";
import Modal from "./components/Modal";

let gameBoard;
const winnigCombinations3x3 = generateWinningCombination(3);

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({ [X]: PLAYER_1, [O]: PLAYER_2 });
  const [isWarning, toggleIsWarning] = useState(false);
  const activePlayer = derivedActivePlayer(gameTurns);
  const freshGame = gameTurns.length === 0;

  if (freshGame || !gameBoard) {
    gameBoard = [...generateGameBoard(3).map((row) => [...row])];
  }

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
      winner = players[firstSquareSymbol];
      break;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleRematchClick() {
    setGameTurns([]);
  }

  function handleModalClicks(event) {
    if (event?.target?.name === "yes") {
      handleRematchClick();
    }
    toggleIsWarning((prevState) => !prevState);
  }

  function handleSaveName(symbol, playerName) {
    setPlayers((prevState) => ({
      ...prevState,
      [symbol]: playerName,
    }));
  }

  return (
    <main>
      <div id="pre-game">
        {!freshGame && (
          <button name="no" onClick={handleModalClicks}>
            🔁
          </button>
        )}
      </div>
      {isWarning && (
        <Modal>
          <p>Are you sure you want to rematch?</p>
          <ul>
            <li>
              <button name="yes" onClick={handleModalClicks}>
                Yes
              </button>
            </li>
            <li>
              <button name="no" onClick={handleModalClicks}>
                No
              </button>
            </li>
          </ul>
        </Modal>
      )}

      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            symbol={X}
            initialName={PLAYER_1}
            isActive={activePlayer === X}
            onSaveName={handleSaveName}
            disableEdit={!freshGame}
          />
          <Player
            symbol={O}
            initialName={PLAYER_2}
            isActive={activePlayer === O}
            onSaveName={handleSaveName}
            disableEdit={!freshGame}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematchClick} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
          disableBoard={isWarning}
        />
      </div>
      <Logs turns={gameTurns} />
    </main>
  );
}

export default App;
