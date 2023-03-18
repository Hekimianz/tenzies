import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div onClick={props.handleClick} style={styles} className="die--die">
      {props.num}
    </div>
  );
}
