import React from "react";
import "./Game.css";

function Game() {
  const [items, setItems] = React.useState(Array(9).fill(null));
  const [isX, setIsX] = React.useState(true);

  const WINNING_COMBINATIONS = function (arr) {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < combinations.length; i++) {
      const [a, b, c] = combinations[i];
      if (arr[a] && arr[a] == arr[b] && arr[a] == arr[c])
        return [arr[a], combinations[i]];
    }
    return null;
  };
  const winner = WINNING_COMBINATIONS(items);

  const handleClick = (index) => {
    const itemCopy = [...items];
    if ((winner && winner[0]) || items[index]) return;
    itemCopy[index] = isX ? "X" : "O";
    setItems(itemCopy);
    setIsX(!isX);
  };
  function isWinner(index) {
    let arr = winner ? winner[1] : [];
    let result = false;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == index) result = true;
    }
    return result;
  }

  return (
    <div className="game">
      <ul className="game__list">
        {items.map((item, i) => (
          <li
            onClick={() => handleClick(i)}
            key={i}
            className={`game__item ${isWinner(i) ? "winner" : ""}`}
          >
            {item}
          </li>
        ))}
      </ul>
      <h2>{winner ? `${winner && winner[0]} is winner` : ""}</h2>
    </div>
  );
}

export default Game;
