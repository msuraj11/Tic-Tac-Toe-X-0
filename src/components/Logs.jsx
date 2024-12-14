export default function Logs({ turns }) {
  return (
    <ol id="log">
      {turns?.map((turn) => {
        const row = turn?.square?.row;
        const col = turn?.square?.col;
        return (
          <li key={`${row}${col}`}>
            {turn?.player} selected {row}, {col}
          </li>
        );
      })}
    </ol>
  );
}
