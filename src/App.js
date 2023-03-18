import React from "react";
import Confetti from "react-confetti";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice);
  const [tenzies, setTenzies] = React.useState(false);
  const [totalRolls, setTotalRolls] = React.useState(0);
  const [highScore, setHighScore] = React.useState(
    JSON.parse(localStorage.getItem("highScore")) || 0
  );

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allValue) {
      setTenzies(true);
    }
  }, [dice]);

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
    setTotalRolls((oldTotal) => oldTotal + 1);
  }

  function generateNewDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
  }

  function newGame() {
    setTenzies(false);
    setDice(allNewDice);
    setTotalRolls(0);
    if (totalRolls < highScore) {
      localStorage.setItem("highScore", totalRolls);
      setHighScore(totalRolls);
    }
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
      {tenzies && (
        <Confetti
          style={{
            position: "fixed",
          }}
        />
      )}
      <span className="main--rolls">Number of rolls: {totalRolls} </span>
      <span className="main--highScore">High score: {highScore} </span>
      <h1 className="main--title">Tenzies</h1>
      <p className="main--desc">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die--cont">{diceElements}</div>
      <button className="roll--btn" onClick={tenzies ? newGame : roll}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
