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
const NUMBER_OF_ITEMS_PER_WHEEL = 180;
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

    const randomOffsets = rollWheelOffsets.map((_, index) => {
      const randomOffset =
        MIN_ROL_LENGTH * (index * 0.5 + 1) +
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
    }, 4000);
  };

  return (
    <div className="flex h-dvh flex-col items-center overflow-x-hidden bg-blue p-4">
      <div className="h-[66.66%] flex-grow"></div>
      <div className="flex w-full max-w-[800px] flex-col items-center justify-center">
        <div className="flex h-[80px] w-[300px] items-center justify-center rounded-tl-xl rounded-tr-xl border-8 border-b-0 border-red bg-gold lg:w-[600px]">
          <h1
            className="text-center font-display text-[60px] tracking-wide text-white"
            style={{
              WebkitTextStroke: "5px black",
              paintOrder: "stroke fill",
              animation: isWinningPosition
                ? "winning-animation 0.7s infinite alternate linear"
                : "",
            }}
          >
            WIN
          </h1>
        </div>
        <div className="flex w-full flex-col items-center justify-center rounded-xl border-8 border-red bg-gold p-4 lg:p-10">
          <ScoreBoard
            totalPoints={points}
            isWinningPosition={isWinningPosition}
          />
          <div className="flex w-full flex-row justify-between py-4 lg:py-9">
            {rollWheelItems.map((rollWheel, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Wheel
                  items={rollWheel}
                  offset={rollWheelOffsets[index]}
                  winningPositions={getWinningPositions(
                    linesWithScores
                      .filter((line) => line.score !== 0)
                      .map((line) => line.line),
                  )}
                  wheelIndex={index}
                />
                <button
                  style={{
                    WebkitTextStroke: "4px black",
                    paintOrder: "stroke fill",
                  }}
                  className="rounded-lg border-2 border-black bg-red text-[36px] tracking-wider text-white"
                >
                  Lock
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleClick}
            disabled={isRolling}
            className="w-full rounded-lg border-2 border-black bg-red text-[36px] font-bold tracking-wider text-white transition-colors disabled:border-[#A9A9A9] disabled:bg-[#D3D3D3] disabled:text-[#D3D3D3] disabled:opacity-60"
            style={{
              WebkitTextStroke: "4px black",
              paintOrder: "stroke fill",
            }}
          >
            {points === 0 && !isRolling ? "Restart" : "Roll"}
          </button>
        </div>
      </div>
      <div className="h-[33.33%] flex-grow"></div>
    </div>
  );
}
