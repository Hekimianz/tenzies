import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  function generateDot() {
    const dots = [];
    for (let i = 0; i < props.num; i++) {
      dots.push(<span className="die--dot"></span>);
    }
    return dots;
  }

  return (
    <div
      onClick={props.handleClick}
      style={styles}
      className={`die--die num${props.num}`}
    >
      {generateDot()}
    </div>
  );
}
