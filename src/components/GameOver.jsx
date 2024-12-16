import Modal from "./Modal";

export default function GameOver({ winner, onRematch }) {
  return (
    <Modal>
      <h2>Game Over</h2>
      <p>{winner ? `${winner} won!` : "It's a draw"}</p>
      <p>
        <button onClick={onRematch}>Rematch!</button>
      </p>
    </Modal>
  );
}
