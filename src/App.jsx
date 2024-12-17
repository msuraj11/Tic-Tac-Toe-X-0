import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Logs from "./components/Logs";
import Player from "./components/Player";
import GameOver from "./components/GameOver";
import Warning from "./components/Warning";
import { derivedActivePlayer, deriveGameBoard, deriveWinner } from "./helpers";
import { X, O, INIT_PLAYERS } from "./constants";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(INIT_PLAYERS);
  const [isWarning, toggleIsWarning] = useState(false);

  const activePlayer = derivedActivePlayer(gameTurns);
  const freshGame = gameTurns.length === 0;
  const gameBoard = deriveGameBoard(gameTurns, freshGame);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;
  const hasSameName = players.X === players.O;
  const disableBoard =
    isWarning ||
    Object.values(players).some((player) => player?.length === 0) ||
    hasSameName;

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
    setPlayers(INIT_PLAYERS);
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
            savedName={players.X}
            isActive={activePlayer === X}
            onSaveName={handleSaveName}
            freshGame={freshGame}
            hasInvalidInput={players.X.length === 0 || hasSameName}
          />
          <Player
            symbol={O}
            savedName={players.O}
            isActive={activePlayer === O}
            onSaveName={handleSaveName}
            freshGame={freshGame}
            hasInvalidInput={players.O.length === 0 || hasSameName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematchClick} />
        )}
        {isWarning && <Warning handleModalClicks={handleModalClicks} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
          disableBoard={disableBoard}
        />
      </div>
      <Logs turns={gameTurns} players={players} />
    </main>
  );
}

export default App;
