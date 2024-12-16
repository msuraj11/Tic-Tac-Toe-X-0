export default function GameBoard({ onSelectSquare, board, disableBoard }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex + row.length}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={rowIndex + `${colIndex}`}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={disableBoard || playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
