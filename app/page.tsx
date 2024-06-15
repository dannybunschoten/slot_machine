"use client";

import Wheel from "./components/Wheel";
import { useEffect, useState } from "react";
import "./globals.css";
import WinningLine, {
  calculateWinningLineWorth,
  getWinningPositions,
} from "./components/Winningline";

const ITEMS = ["🍒", "🍓", "⭐️", "🍐", "👑", "🎩"];
const NUMBER_OF_ITEMS_PER_WHEEL = 90;
const NUMBER_OF_WHEELS = 3;
const MIN_ROL_LENGTH = 30;
const MAX_ROL_LENGTH = 60;

export default function Home() {
  const [rollWheelItems, setRollWheelItems] = useState(
    Array(NUMBER_OF_WHEELS).fill(["", "", ""]),
  );
  const [rollWheelOffsets, setRollWheelOffsets] = useState(
    Array(NUMBER_OF_WHEELS).fill(0),
  );
  const [winningLines, setWinningLines] = useState<WinningLine[]>([
    {
      positions: [
        { wheelIndex: 0, itemIndex: 0 },
        { wheelIndex: 1, itemIndex: 0 },
        { wheelIndex: 2, itemIndex: 0 },
      ],
      multiplier: 3,
      currentWorth: 0,
    },
    {
      positions: [
        { wheelIndex: 0, itemIndex: 1 },
        { wheelIndex: 1, itemIndex: 1 },
        { wheelIndex: 2, itemIndex: 1 },
      ],
      multiplier: 5,
      currentWorth: 0,
    },
    {
      positions: [
        { wheelIndex: 0, itemIndex: 2 },
        { wheelIndex: 1, itemIndex: 2 },
        { wheelIndex: 2, itemIndex: 2 },
      ],
      multiplier: 3,
      currentWorth: 0,
    },
    {
      positions: [
        { wheelIndex: 0, itemIndex: 0 },
        { wheelIndex: 0, itemIndex: 1 },
        { wheelIndex: 0, itemIndex: 2 },
      ],
      multiplier: 3,
      currentWorth: 0,
    },
    {
      positions: [
        { wheelIndex: 1, itemIndex: 0 },
        { wheelIndex: 1, itemIndex: 1 },
        { wheelIndex: 1, itemIndex: 2 },
      ],
      multiplier: 5,
      currentWorth: 0,
    },
    {
      positions: [
        { wheelIndex: 2, itemIndex: 0 },
        { wheelIndex: 2, itemIndex: 1 },
        { wheelIndex: 2, itemIndex: 2 },
      ],
      multiplier: 3,
      currentWorth: 0,
    },
    {
      positions: [
        { wheelIndex: 0, itemIndex: 0 },
        { wheelIndex: 1, itemIndex: 1 },
        { wheelIndex: 2, itemIndex: 2 },
      ],
      multiplier: 1,
      currentWorth: 0,
    },
    {
      positions: [
        { wheelIndex: 2, itemIndex: 0 },
        { wheelIndex: 1, itemIndex: 1 },
        { wheelIndex: 0, itemIndex: 2 },
      ],
      multiplier: 1,
      currentWorth: 0,
    },
  ]);
  const [points, setPoints] = useState(10);

  useEffect(() => {
    const createShuffledArray = () => {
      const shuffledArray = [];

      for (let i = 0; i < NUMBER_OF_ITEMS_PER_WHEEL; i++) {
        const index = Math.floor(Math.random() * ITEMS.length);
        const randomItem = ITEMS[index];
        shuffledArray.push(randomItem);
      }

      return shuffledArray;
    };

    const newRollWheelItems = [];
    for (let i = 0; i < NUMBER_OF_WHEELS; i++) {
      newRollWheelItems.push(createShuffledArray());
    }

    setRollWheelItems(newRollWheelItems);
  }, []);

  const handleClick = () => {
    const resetWinningLines = winningLines.map((winningLine) => {
      const newWinningLine = { ...winningLine };
      newWinningLine.currentWorth = 0;
      return newWinningLine;
    });
    setWinningLines(resetWinningLines);

    if (points === 0) {
      setPoints(10);
      return;
    }

    const randomOffsets = rollWheelOffsets.map(() => {
      const randomOffset =
        MIN_ROL_LENGTH +
        Math.floor(Math.random() * (MAX_ROL_LENGTH - MIN_ROL_LENGTH));
      return randomOffset;
    });

    setRollWheelOffsets(randomOffsets);
    setPoints(points - 1);

    setTimeout(() => {
      const shiftArrayByOffset = (array: string[], offset: number) => {
        const newArray = [...array];
        for (let i = 0; i < offset; i++) {
          newArray.push(newArray.shift()!);
        }
        return newArray;
      };

      const shiftedRollWheels = rollWheelItems.map((rollWheel, index) =>
        shiftArrayByOffset(rollWheel, randomOffsets[index]),
      );
      const allZeroOffsets = rollWheelOffsets.map(() => 0);

      const scoreCheckedWinningLines = winningLines.map((winningLine) => {
        const newWinningLine = { ...winningLine };
        newWinningLine.currentWorth = calculateWinningLineWorth(
          newWinningLine,
          shiftedRollWheels,
        );
        return newWinningLine;
      });

      const additionalPoints = scoreCheckedWinningLines
        .map((winningLine) => winningLine.currentWorth)
        .reduce((acc, val) => acc + val, 0);

      setRollWheelItems(shiftedRollWheels);
      setRollWheelOffsets(allZeroOffsets);
      setWinningLines(scoreCheckedWinningLines);
      setPoints((p) => p + additionalPoints);
    }, 5000);
  };

  return (
    <div className="h-dvh overflow-x-hidden flex flex-col justify-center bg-dark-blue-black">
      <div
        className={`text-5xl lg:text-8xl font-bold text-yellow-500 self-center m-12 bold`}
      >
        Points: {points}
      </div>
      <div className="flex flex-row gap-x-5 lg:gap-x-16 justify-center self-center bg-gold-trans p-4 lg:p-9 rounded border-solid border-8 border-yellow-700">
        {
          rollWheelItems.map((rollWheel, index) => (
          <Wheel
            key={index}
            items={rollWheel}
            offset={rollWheelOffsets[index]}
            winningPositions={getWinningPositions(winningLines)}
            wheelIndex={index}
          />
        ))}
      </div>
      <button
        onClick={handleClick}
        disabled={rollWheelOffsets.every((offset) => offset !== 0)}
        className="font-serif bg-gold-trans font-bold rounded-2xl text-5xl lg:text-8xl self-center m-4 lg:m-16 px-16 lg:px-32 py-4"
      >
        {points === 0 ? "Restart" : "Roll"}
      </button>
    </div>
  );
}
