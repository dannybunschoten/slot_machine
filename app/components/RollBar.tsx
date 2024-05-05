import React, { useState, useEffect } from "react";
import WinningLines from "./WinningLines";
import "../globals.css";

export default function RollBar({
  values,
  isRolling,
  oldOffSet,
  newOffSet,
  rollTime,
  columnNumber,
  winningLines,
}: {
  values: string[];
  isRolling: boolean;
  oldOffSet: number;
  newOffSet: number;
  rollTime: string;
  columnNumber: number;
  winningLines: WinningLines;
}) {
  const [charHeight, setCharHeight] = useState(0);

  useEffect(() => {
    setCharHeight(window.matchMedia("(min-width: 1024px)").matches ? 6 : 2.5);
  }, []);

  function displayAsBlinking(index: number) {
    if (columnNumber === 1) {
      return (
        winningLines.col1 ||
        (index === oldOffSet && (winningLines.row1 || winningLines.TlBr)) ||
        (index - 1 === oldOffSet && winningLines.row2) ||
        (index - 2 === oldOffSet && (winningLines.row3 || winningLines.BlTr))
      );
    } else if (columnNumber === 2) {
      return (
        winningLines.col2 ||
        (index === oldOffSet && winningLines.row1) ||
        (index - 1 === oldOffSet &&
          (winningLines.row2 || winningLines.BlTr || winningLines.TlBr)) ||
        (index - 2 === oldOffSet && winningLines.row3)
      );
    } else {
      return (
        winningLines.col3 ||
        (index === oldOffSet && (winningLines.row1 || winningLines.BlTr)) ||
        (index - 1 === oldOffSet && winningLines.row2) ||
        (index - 2 === oldOffSet && (winningLines.row3 || winningLines.TlBr))
      );
    }
  }

  return (
    <div
      className={`bg-black rounded m-3 lg:m-5 p-2 lg:p-2 h-36 lg:h-80 overflow-hidden text-clip border-solid border-2 lg:border-8 border-yellow-700`}
    >
      <div
        className={`text-4xl lg:text-8xl text-center leading-[2.5rem] lg:leading-[6rem] text-white ${isRolling ? rollTime : ""}`}
        style={
          {
            "--translate-y-from": `-${oldOffSet * charHeight}rem`,
            "--translate-y": `-${newOffSet * charHeight}rem`,
            transform: `translateY(-${oldOffSet * charHeight}rem)`,
          } as React.CSSProperties
        }
      >
        {values.map((txt, index) => (
          <div
            key={index}
            style={{
              animation: `${!isRolling && displayAsBlinking(index) ? "winning-animation 0.7s infinite alternate linear" : ""}`,
            }}
          >
            {txt}
          </div>
        ))}
      </div>
    </div>
  );
}
