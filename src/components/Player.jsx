import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  const [isEditing, setEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    setEditing((prevState) => !prevState);
  }

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameJsx = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    playerNameJsx = (
      <input
        type="text"
        required
        onChange={handlePlayerNameChange}
        value={playerName}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameJsx}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
