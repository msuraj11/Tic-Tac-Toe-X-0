import {useEffect, useState} from 'react';

export default function Player({
  savedName,
  symbol,
  isActive,
  onSaveName,
  freshGame,
  hasInvalidInput,
  hasEmptyInputs,
  ref // starting React v19 forwardRef is not required and will be depricated in future.
}) {
  const [isEditing, setEditing] = useState(true);
  const [playerName, setPlayerName] = useState(savedName);
  const invalidClassName = hasInvalidInput ? 'invalid' : undefined;
  const spanClassName = `player-name${
    invalidClassName ? ` ${invalidClassName}` : ''
  }`;
  const readyToPlay = !hasInvalidInput && !hasEmptyInputs && isActive;

  useEffect(() => {
    if (hasInvalidInput) {
      setEditing(true);
      setPlayerName(savedName);
    }
  }, [hasInvalidInput]);

  function handleEditClick() {
    setEditing((prevState) => !prevState);
    if (isEditing) {
      onSaveName(symbol, playerName);
    }
  }

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value?.toLowerCase().trim());
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
        ref={ref}
      />
    );
  }

  return (
    <li className={readyToPlay ? 'active' : undefined}>
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
