import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice);

  function allNewDice() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return arr;
  }

  const diceElements = dice.map((item) => {
    return <Die num={item.value} key={item.id} />;
  });

  function roll() {
    setDice(allNewDice);
  }

  return (
    <main>
      <div className="die--cont">{diceElements}</div>
      <button className="roll--btn" onClick={roll}>
        Roll
      </button>
    </main>
  );
}
