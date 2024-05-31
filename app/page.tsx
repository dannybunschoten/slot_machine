"use client";

import RollBar from "./components/RollBar";
import { useEffect, useState } from "react";
import "./globals.css";
import type WinningLines from "./components/WinningLines";

export default function Home() {
  const items = ["🍒", "🍓", "⭐️", "🍐", "👑", "🎩"];

  const [arr1, setArr1] = useState(["🍒", "🍓", "⭐️"]);
  const [arr2, setArr2] = useState(["⭐️", "🍐", "👑"]);
  const [arr3, setArr3] = useState(["👑", "🎩", "🍒"]);
  const [points, setPoints] = useState(10);

  const [winningLines, setWinningLines] = useState<WinningLines>({
    TlBr: false,
    BlTr: false,
    row1: false,
    row2: false,
    row3: false,
    col1: false,
    col2: false,
    col3: false,
  });

  useEffect(() => {
    const generateArray = (initialArray: string[]) => {
      let newArray = [...initialArray];
      for (let i = 0; i < 39; i++) {
        newArray.push(items[Math.floor(Math.random() * items.length)]);
      }
      return newArray;
    };

    const genArr1 = generateArray(arr1);
    const genArr2 = generateArray(arr2);
    const genArr3 = generateArray(arr3);
    setArr1([...genArr1, ...genArr1, ...genArr1, ...genArr1]);
    setArr2([...genArr2, ...genArr2, ...genArr2, ...genArr2]);
    setArr3([...genArr3, ...genArr3, ...genArr3, ...genArr3]);
  }, []);

  const [isRolling, setIsRolling] = useState(false);

  const [offSet1, setOffSet1] = useState(0);
  const [offSet2, setOffSet2] = useState(0);
  const [offSet3, setOffSet3] = useState(0);

  const [prevOffSet1, setPrevOffSet1] = useState(0);
  const [prevOffSet2, setPrevOffSet2] = useState(0);
  const [prevOffSet3, setPrevOffSet3] = useState(0);

  function handleClick() {
    if (points === 0) {
      setPoints(9);
    } else {
      setPoints((val) => val - 1);
    }

    const getOffset = () => 42 + Math.floor(Math.random() * 42);

    const off1 = getOffset();
    const off2 = getOffset();
    const off3 = getOffset();

    setOffSet1(prevOffSet1 + off1);
    setOffSet2(prevOffSet2 + off2);
    setOffSet3(prevOffSet3 + off3);

    setIsRolling(true);

    setTimeout(() => {
      setIsRolling(false);

      const newOffSet1 = (off1 + offSet1) % 42;
      const newOffSet2 = (off2 + offSet2) % 42;
      const newOffSet3 = (off3 + offSet3) % 42;

      setPrevOffSet1(newOffSet1);
      setPrevOffSet2(newOffSet2);
      setPrevOffSet3(newOffSet3);
      win(newOffSet1, newOffSet2, newOffSet3);
    }, 5002);
  }

  const win = (
    roll1Offset: number,
    roll2Offset: number,
    roll3Offset: number,
  ) => {
    setWinningLines({
      TlBr:
        arr1[roll1Offset] === arr2[roll2Offset + 1] &&
        arr2[roll2Offset + 1] === arr3[roll3Offset + 2] &&
        increasePoints(1, arr1[roll1Offset]),
      BlTr:
        arr1[roll1Offset + 2] === arr2[roll2Offset + 1] &&
        arr2[roll2Offset + 1] === arr3[roll3Offset] &&
        increasePoints(1, arr1[roll1Offset + 2]),
      row1:
        arr1[roll1Offset] === arr2[roll2Offset] &&
        arr2[roll2Offset] === arr3[roll3Offset] &&
        increasePoints(2, arr1[prevOffSet1]),
      row2:
        arr1[roll1Offset + 1] === arr2[roll2Offset + 1] &&
        arr2[roll2Offset + 1] === arr3[roll3Offset + 1] &&
        increasePoints(3, arr1[roll1Offset + 1]),
      row3:
        arr1[roll1Offset + 2] === arr2[roll2Offset + 2] &&
        arr2[roll2Offset + 2] === arr3[roll3Offset + 2] &&
        increasePoints(2, arr1[roll1Offset + 2]),
      col1:
        arr1[roll1Offset] === arr1[roll1Offset + 1] &&
        arr1[roll1Offset + 1] === arr1[roll1Offset + 2] &&
        increasePoints(2, arr1[roll1Offset]),
      col2:
        arr2[roll2Offset] === arr2[roll2Offset + 1] &&
        arr2[roll2Offset + 1] === arr2[roll2Offset + 2] &&
        increasePoints(2, arr2[roll1Offset]),
      col3:
        arr3[roll3Offset] === arr3[roll3Offset + 1] &&
        arr3[roll3Offset + 1] === arr3[roll3Offset + 2] &&
        increasePoints(2, arr3[roll3Offset]),
    });
  };

  const increasePoints = (
    multiplier: number,
    winning_char: string,
  ): boolean => {
    switch (winning_char) {
      case "🍒":
      case "🍓":
      case "🍐":
        setPoints((val) => val + multiplier * 1);
        break;
      case "👑":
      case "🎩":
      case "✨":
        setPoints((val) => val + multiplier * 3);
        break;
      case "⭐️":
        setPoints((val) => val + multiplier * 5);
        break;
      default:
        console.log("Unhandled character:", winning_char);
    }
    return true;
  };

  return (
    <div className="h-dvh flex flex-col justify-center bg-dark-blue-black">
      <div
        style={{
          animation: `${!isRolling && (winningLines.BlTr || winningLines.TlBr || winningLines.row1 || winningLines.row2 || winningLines.row3) ? "winning-animation 0.7s infinite alternate linear" : ""}`,
        }}
        className={`text-4xl lg:text-8xl font-bold  text-yellow-500 self-center m-12 bold`}
      >
        Points: {points}
      </div>
      <div className="flex flex-row justify-center self-center bg-gold-trans p-4 lg:p-9 rounded border-solid border-8 border-yellow-700">
        <RollBar
          values={arr1}
          isRolling={isRolling}
          oldOffSet={prevOffSet1}
          newOffSet={offSet1}
          rollTime="animate-roll3"
          columnNumber={1}
          winningLines={winningLines}
        />
        <RollBar
          values={arr2}
          isRolling={isRolling}
          oldOffSet={prevOffSet2}
          newOffSet={offSet2}
          rollTime="animate-roll4"
          columnNumber={2}
          winningLines={winningLines}
        />
        <RollBar
          values={arr3}
          isRolling={isRolling}
          oldOffSet={prevOffSet3}
          newOffSet={offSet3}
          rollTime="animate-roll5"
          columnNumber={3}
          winningLines={winningLines}
        />
      </div>
      <button
        onClick={handleClick}
        disabled={isRolling}
        className="font-serif bg-gold-trans font-bold rounded-2xl text-2xl lg:text-8xl self-center m-4 lg:m-16 px-16 lg:px-32 py-4"
      >
        {points === 0 && !isRolling ? "Restart" : "Rolll"}
      </button>
    </div>
  );
}
