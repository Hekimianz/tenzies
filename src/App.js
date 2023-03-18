import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice);

  function allNewDice() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(generateNewDie());
    }
    return arr;
  }

  function holdDice(id) {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      });
    });
  }
  function roll() {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      });
    });
  }

  function generateNewDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
  }

  const diceElements = dice.map((item) => {
    return (
      <Die
        handleClick={() => holdDice(item.id)}
        isHeld={item.isHeld}
        num={item.value}
        key={item.id}
        id={item.id}
      />
    );
  });

  return (
    <main>
      <div className="die--cont">{diceElements}</div>
      <button className="roll--btn" onClick={roll}>
        Roll
      </button>
    </main>
  );
}
