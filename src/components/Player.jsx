import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onSaveName,
  disableEdit,
}) {
  const [isEditing, setEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    setEditing((prevState) => !prevState);
    if (isEditing) {
      onSaveName(symbol, playerName);
    }
  }

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  function handleEventOut() {
    onSaveName(symbol, playerName);
  }

  let playerNameJsx = <span className="player-name">{playerName}</span>;
  if (isEditing && !disableEdit) {
    playerNameJsx = (
      <input
        type="text"
        required
        onChange={handlePlayerNameChange}
        onBlur={handleEventOut}
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
      {!disableEdit && (
        <button onMouseLeave={handleEventOut} onClick={handleEditClick}>
          {isEditing ? "Save" : "Edit"}
        </button>
      )}
    </li>
  );
}
