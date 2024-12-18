import {useEffect, useState} from 'react';

export default function Player({
  savedName,
  symbol,
  isActive,
  onSaveName,
  freshGame,
  hasInvalidInput
}) {
  const [isEditing, setEditing] = useState(true);
  const [playerName, setPlayerName] = useState(savedName);
  const invalidClassName = hasInvalidInput ? 'invalid' : undefined;
  const spanClassName = invalidClassName
    ? `player-name ${invalidClassName}`
    : 'player-name';

  useEffect(() => {
    if (freshGame || hasInvalidInput) {
      setEditing(true);
      setPlayerName(savedName);
    }
  }, [freshGame, hasInvalidInput]);

  function handleEditClick() {
    setEditing((prevState) => !prevState);
    if (isEditing) {
      onSaveName(symbol, playerName);
    }
  }

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value?.toLowerCase());
  }

  let playerNameJsx = <span className={spanClassName}>{savedName}</span>;
  if (isEditing && freshGame) {
    playerNameJsx = (
      <input
        type="text"
        required
        onChange={handlePlayerNameChange}
        value={playerName}
        className={invalidClassName}
      />
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {playerNameJsx}
        <span className="player-symbol">{symbol}</span>
      </span>
      {freshGame && (
        <button onClick={handleEditClick} disabled={!playerName}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      )}
    </li>
  );
}
