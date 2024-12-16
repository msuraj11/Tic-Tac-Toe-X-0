export default function Logs({ turns, players }) {
  return (
    <ol id="log">
      {turns?.map((turn) => {
        const row = turn?.square?.row;
        const col = turn?.square?.col;
        return (
          <li key={`${row}${col}`}>
            {players[turn?.player]} selected {row}, {col}
          </li>
        );
      })}
    </ol>
  );
}
