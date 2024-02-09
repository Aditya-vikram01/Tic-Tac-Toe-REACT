import { useState } from "react";

export function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, seteIsEditing] = useState(false);

  function onClickHandler() {
    seteIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function inputClickHandler(event) {
    setPlayerName(event.target.value);
  }

  let NameHolder = <span className='player-name'>{playerName}</span>;
  let btnCaption = isEditing ? "Save" : "Edit";
  if (isEditing) {
    NameHolder = (
      <input
        type='text'
        required
        value={playerName}
        placeholder='Enter Name'
        onChange={inputClickHandler}
      />
    );
  }

  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className='player'>
          {NameHolder}
          <span className='player-symbol'>{symbol}</span>
        </span>
        <button onClick={onClickHandler}>{btnCaption}</button>
      </li>
    </>
  );
}
