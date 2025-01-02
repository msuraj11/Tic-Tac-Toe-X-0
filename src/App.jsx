import {useEffect, useRef, useState} from 'react';
import GameBoard from './components/GameBoard';
import Logs from './components/Logs';
import Player from './components/Player';
import GameOver from './components/GameOver';
import Warning from './components/Warning';
import {derivedActivePlayer, deriveGameBoard, deriveWinner} from './helpers';
import {X, O, INIT_PLAYERS} from './constants';

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(INIT_PLAYERS);
  const [isWarning, toggleIsWarning] = useState(false);
  const [boardSize, setBoardSize] = useState(3);
  const inputRef = useRef(null);

  useEffect(() => {
    toggleIsWarning(true);
  }, []);

  const activePlayer = derivedActivePlayer(gameTurns);
  const freshGame = gameTurns.length === 0;
  const gameBoard = deriveGameBoard(gameTurns, freshGame, boardSize);
  const winner = deriveWinner(gameBoard, players, boardSize);
  const hasDraw = gameTurns.length === 9 && !winner;
  const hasSameName = players.X === players.O;
  const hasEmptyInputs = Object.values(players).some(
    (player) => player?.length === 0
  );
  const disableBoard = isWarning || hasEmptyInputs || hasSameName;

  function handleGameBoardChoice(event) {
    setBoardSize(Number(event?.target?.name));
    toggleIsWarning(false);
    inputRef?.current?.focus();
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns
      ];
      return updatedTurns;
    });
  }

  function handleRematchClick() {
    setGameTurns([]);
    setPlayers(INIT_PLAYERS);
    toggleIsWarning(true);
  }

  function handleModalClicks(event) {
    if (event?.target?.name === 'yes') {
      handleRematchClick();
    }
    toggleIsWarning((prevState) => !prevState);
  }

  function handleSaveName(symbol, playerName) {
    setPlayers((prevState) => ({
      ...prevState,
      [symbol]: playerName
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
      <div
        id="game-container"
        className={`${boardSize === 5 ? 'xl' : 'l'}-width`}
      >
        <ol id="players" className="highlight-player">
          <Player
            symbol={X}
            savedName={players.X}
            isActive={activePlayer === X}
            onSaveName={handleSaveName}
            freshGame={freshGame}
            hasInvalidInput={players.X.length === 0 || hasSameName}
            hasEmptyInputs={hasEmptyInputs}
            ref={inputRef}
          />
          <Player
            symbol={O}
            savedName={players.O}
            isActive={activePlayer === O}
            onSaveName={handleSaveName}
            freshGame={freshGame}
            hasInvalidInput={players.O.length === 0 || hasSameName}
            hasEmptyInputs={hasEmptyInputs}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematchClick} />
        )}
        {isWarning && (
          <Warning
            handleModalClicks={handleModalClicks}
            freshGame={freshGame}
            handleGameBoardChoice={handleGameBoardChoice}
          />
        )}
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
