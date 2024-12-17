import { useEffect, useState } from "react";

export default function Player({
  savedName,
  symbol,
  isActive,
  onSaveName,
  freshGame,
  hasInvalidInput,
}) {
  const [isEditing, setEditing] = useState(true);
  const [playerName, setPlayerName] = useState(savedName);

  useEffect(() => {
    if (freshGame) {
      setEditing(true);
      setPlayerName(savedName);
    }
  }, [freshGame]);

  function handleEditClick() {
    setEditing((prevState) => !prevState);
    if (isEditing) {
      onSaveName(symbol, playerName);
    }
  }

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  // function handleInputBlur() {}

  let playerNameJsx = <span className="player-name">{savedName}</span>;
  if (isEditing && freshGame) {
    playerNameJsx = (
      <input
        type="text"
        required
        onChange={handlePlayerNameChange}
        //obBlur={handleInputBlur}
        value={playerName}
        className={hasInvalidInput ? "invalid" : undefined}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameJsx}
        <span className="player-symbol">{symbol}</span>
      </span>
      {freshGame && (
        <button onClick={handleEditClick} disabled={!playerName}>
          {isEditing ? "Save" : "Edit"}
        </button>
      )}
    </li>
  );
}
