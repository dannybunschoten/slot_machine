"use client";

import Wheel from "./components/Wheel";
import { useEffect, useState } from "react";
import "./globals.css";
import WinningLine, {
  calculateWinningLineWorth,
  getWinningPositions,
} from "./components/Winningline";
import { ScoreBoard } from "./components/ScoreBoard";
import { Fruit } from "./commons/fruits";

const ITEMS: Fruit[] = [
  "cherries",
  "clover",
  "diamond",
  "grapes",
  "horseshoe",
  "lemon",
];
const NUMBER_OF_ITEMS_PER_WHEEL = 90;
const NUMBER_OF_WHEELS = 3;
const MIN_ROL_LENGTH = 30;
const MAX_ROL_LENGTH = 60;
const WINNINGLINES: WinningLine[] = [
  {
    positions: [
      { wheelIndex: 0, itemIndex: 0 },
      { wheelIndex: 1, itemIndex: 0 },
      { wheelIndex: 2, itemIndex: 0 },
    ],
    multiplier: 3,
  },
  {
    positions: [
      { wheelIndex: 0, itemIndex: 1 },
      { wheelIndex: 1, itemIndex: 1 },
      { wheelIndex: 2, itemIndex: 1 },
    ],
    multiplier: 5,
  },
  {
    positions: [
      { wheelIndex: 0, itemIndex: 2 },
      { wheelIndex: 1, itemIndex: 2 },
      { wheelIndex: 2, itemIndex: 2 },
    ],
    multiplier: 3,
  },
  {
    positions: [
      { wheelIndex: 0, itemIndex: 0 },
      { wheelIndex: 0, itemIndex: 1 },
      { wheelIndex: 0, itemIndex: 2 },
    ],
    multiplier: 3,
  },
  {
    positions: [
      { wheelIndex: 1, itemIndex: 0 },
      { wheelIndex: 1, itemIndex: 1 },
      { wheelIndex: 1, itemIndex: 2 },
    ],
    multiplier: 5,
  },
  {
    positions: [
      { wheelIndex: 2, itemIndex: 0 },
      { wheelIndex: 2, itemIndex: 1 },
      { wheelIndex: 2, itemIndex: 2 },
    ],
    multiplier: 3,
  },
  {
    positions: [
      { wheelIndex: 0, itemIndex: 0 },
      { wheelIndex: 1, itemIndex: 1 },
      { wheelIndex: 2, itemIndex: 2 },
    ],
    multiplier: 1,
  },
  {
    positions: [
      { wheelIndex: 2, itemIndex: 0 },
      { wheelIndex: 1, itemIndex: 1 },
      { wheelIndex: 0, itemIndex: 2 },
    ],
    multiplier: 1,
  },
];

const initializeRollWheelItems = () =>
  Array(NUMBER_OF_WHEELS).fill(["", "", ""]);
const initializeRollWheelOffsets = () => Array(NUMBER_OF_WHEELS).fill(0);

export default function Home() {
  const [rollWheelItems, setRollWheelItems] = useState(
    initializeRollWheelItems,
  );
  const [rollWheelOffsets, setRollWheelOffsets] = useState(
    initializeRollWheelOffsets,
  );
  const [points, setPoints] = useState(10);
  const isRolling = rollWheelOffsets.some((offset) => offset !== 0);
  const linesWithScores = WINNINGLINES.map((line) => ({
    line,
    score: calculateWinningLineWorth(line, rollWheelItems),
  }));

  const isWinningPosition =
    linesWithScores.some((line) => line.score !== 0) && !isRolling;

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
      const shiftArrayByOffset = (array: Fruit[], offset: number) => {
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

      const scoreCheckedWinningLines = WINNINGLINES.map((winningLine) => {
        return calculateWinningLineWorth(winningLine, shiftedRollWheels);
      });

      const additionalPoints = scoreCheckedWinningLines.reduce(
        (acc, val) => acc + val,
        0,
      );

      setRollWheelItems(shiftedRollWheels);
      setRollWheelOffsets(allZeroOffsets);
      setPoints((p) => p + additionalPoints);
    }, 5000);
  };

  return (
    <div className="h-dvh overflow-x-hidden flex flex-col justify-center bg-dark-blue-black">
      <ScoreBoard totalPoints={points} isWinningPosition={isWinningPosition} />
      <div className="flex flex-row gap-x-5 lg:gap-x-16 justify-center self-center bg-gold-trans p-4 lg:p-9 rounded border-solid border-8 border-yellow-700">
        {rollWheelItems.map((rollWheel, index) => (
          <Wheel
            key={index}
            items={rollWheel}
            offset={rollWheelOffsets[index]}
            winningPositions={getWinningPositions(
              linesWithScores
                .filter((line) => line.score !== 0)
                .map((line) => line.line),
            )}
            wheelIndex={index}
          />
        ))}
      </div>
      <button
        onClick={handleClick}
        disabled={isRolling}
        className="font-serif bg-gold-trans font-bold rounded-2xl text-5xl lg:text-8xl self-center m-4 lg:m-16 px-16 lg:px-32 py-4"
      >
        {points === 0 && !isRolling ? "Restart" : "Roll"}
      </button>
    </div>
  );
}
