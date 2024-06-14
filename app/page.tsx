"use client";

import Wheel from "./components/Wheel";
import { useEffect, useState } from "react";
import "./globals.css";
import WinningLine, { Position } from "./components/Winningline";

const ITEMS = ["🍒", "🍓", "⭐️","🍐", "👑", "🎩"];
const MIN_ROL_LENGTH = 6;
const MAX_ROL_LENGTH = 20;

export default function Home() {
  const [col1, setCol1] = useState(Array<string>(3).fill(""));
  const [col2, setCol2] = useState(Array(3).fill(""));
  const [col3, setCol3] = useState(Array(3).fill(""));
  const [offset1, setOffset1] = useState(0);
  const [offset2, setOffset2] = useState(0);
  const [offset3, setOffset3] = useState(0);
  const [bottomRowWinningLine, setBottomRowWinningLine] = useState<WinningLine>(
    new WinningLine(
      [Position.BottomLeft, Position.BottomMiddle, Position.BottomRight],
      3,
    ),
  );
  const [middleRowWinningLine, setMiddleRowWinningLine] = useState<WinningLine>(
    new WinningLine(
      [Position.MiddleLeft, Position.Middle, Position.MiddleRight],
      5,
    ),
  );
  const [topRowWinningLine, setTopRowWinningLine] = useState<WinningLine>(
    new WinningLine(
      [Position.TopLeft, Position.TopMiddle, Position.TopRight],
      3,
    ),
  );
  const [points, setPoints] = useState(10);

  useEffect(() => {
    const createShuffledArray = (array: string[]) => {
      return [...array, ...array, ...array, ...array, ...array].sort(
        () => Math.random() - 0.5,
      );
    };

    setCol1(createShuffledArray(ITEMS));
    setCol2(createShuffledArray(ITEMS));
    setCol3(createShuffledArray(ITEMS));
  }, []);

  const handleClick = () => {
    bottomRowWinningLine.resetCurrentWorth();
    middleRowWinningLine.resetCurrentWorth();
    topRowWinningLine.resetCurrentWorth();

    if (points === 0) {
      setPoints(10);
    } else {
      setPoints((val) => val - 1);

      const newOffset1 =
        MIN_ROL_LENGTH +
        Math.floor(Math.random() * (MAX_ROL_LENGTH - MIN_ROL_LENGTH));
      const newOffset2 =
        MIN_ROL_LENGTH +
        Math.floor(Math.random() * (MAX_ROL_LENGTH - MIN_ROL_LENGTH));
      const newOffset3 =
        MIN_ROL_LENGTH +
        Math.floor(Math.random() * (MAX_ROL_LENGTH - MIN_ROL_LENGTH));

      setOffset1(newOffset1);
      setOffset2(newOffset2);
      setOffset3(newOffset3);

      setTimeout(() => {
        const shiftArray = (array: string[], offset: number) => {
          const newArray = [...array];
          for (let i = 0; i < offset; i++) {
            newArray.push(newArray.shift()!);
          }
          return newArray;
        };

        setCol1(shiftArray(col1, newOffset1));
        setCol2(shiftArray(col2, newOffset2));
        setCol3(shiftArray(col3, newOffset3));

        setOffset1(0);
        setOffset2(0);
        setOffset3(0);
      }, 5000);
    }
  };

  useEffect(() => {
    bottomRowWinningLine.updateCurrentWorth(col1, col2, col3);
    middleRowWinningLine.updateCurrentWorth(col1, col2, col3);
    topRowWinningLine.updateCurrentWorth(col1, col2, col3);

    setPoints((val) => val + bottomRowWinningLine.currentWorth);
    setPoints((val) => val + middleRowWinningLine.currentWorth);
    setPoints((val) => val + topRowWinningLine.currentWorth);
  }, [
    col1,
    col2,
    col3,
    bottomRowWinningLine,
    middleRowWinningLine,
    topRowWinningLine,
  ]);

  return (
    <div className="h-dvh overflow-x-hidden flex flex-col justify-center bg-dark-blue-black">
      <div
        className={`text-5xl lg:text-8xl font-bold text-yellow-500 self-center m-12 bold`}
      >
        Points: {points}
      </div>
      <div className="flex flex-row gap-x-5 lg:gap-x-16 justify-center self-center bg-gold-trans p-4 lg:p-9 rounded border-solid border-8 border-yellow-700">
        <Wheel
          items={col1}
          offset={offset1}
          winningItems={[
            bottomRowWinningLine.currentWorth !== 0,
            middleRowWinningLine.currentWorth !== 0,
            topRowWinningLine.currentWorth !== 0,
          ]}
        />
        <Wheel
          items={col2}
          offset={offset2}
          winningItems={[
            bottomRowWinningLine.currentWorth !== 0,
            middleRowWinningLine.currentWorth !== 0,
            topRowWinningLine.currentWorth !== 0,
          ]}
        />
        <Wheel
          items={col3}
          offset={offset3}
          winningItems={[
            bottomRowWinningLine.currentWorth !== 0,
            middleRowWinningLine.currentWorth !== 0,
            topRowWinningLine.currentWorth !== 0,
          ]}
        />
      </div>
      <button
        onClick={handleClick}
        disabled={offset1 !== 0 || offset2 !== 0 || offset3 !== 0}
        className="font-serif bg-gold-trans font-bold rounded-2xl text-5xl lg:text-8xl self-center m-4 lg:m-16 px-16 lg:px-32 py-4"
      >
        {points === 0 ? "Restart" : "Roll"}
      </button>
    </div>
  );
}
