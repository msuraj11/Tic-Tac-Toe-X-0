import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Logs from "./components/Logs";
import Player from "./components/Player";
import GameOver from "./components/GameOver";
import Warning from "./components/Warning";
import { derivedActivePlayer, deriveGameBoard, deriveWinner } from "./helpers";
import { PLAYER_1, PLAYER_2, X, O } from "./constants";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({ [X]: PLAYER_1, [O]: PLAYER_2 });
  const [isWarning, toggleIsWarning] = useState(false);

  const activePlayer = derivedActivePlayer(gameTurns);
  const freshGame = gameTurns.length === 0;
  const gameBoard = deriveGameBoard(gameTurns, freshGame);
  const winner = deriveWinner(gameBoard, players);
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
        <button
          name="no"
          onClick={handleModalClicks}
          disabled={freshGame || winner || hasDraw}
        >
          🔁
        </button>
      </div>
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
        {isWarning && <Warning handleModalClicks={handleModalClicks} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
          disableBoard={isWarning}
        />
      </div>
      <Logs turns={gameTurns} players={players} />
    </main>
  );
}

export default App;
