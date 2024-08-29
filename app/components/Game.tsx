"use client";

import Wheel from "./Wheel";
import { useEffect, useState } from "react";
import WinningLine, {
  calculateWinningLineWorth,
  getWinningPositions,
} from "./Winningline";
import { ScoreBoard } from "./ScoreBoard";
import { Fruit } from "./../commons/fruits";
import LockButton, { lockButtonState } from "./LockButton";
import { getNewGame, updateHighScores } from "../commons/actions";

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
const initializeBoth = () => {
  const rollWheelItems = initializeRollWheelItems();
  const rollWheelOffsets = initializeRollWheelOffsets();
  return { rollWheelItems, rollWheelOffsets };
};

async function createNewHighScore(
  points: number,
  highScores: HighScore[],
  name: string,
): Promise<HighScore[]> {
  const newId = await getNewGame(name);
  return [...highScores, { id: newId, score: points }];
}

async function increaseHighScores(highScores: HighScore[], points: number) {
  const maxId = Math.max(...highScores.map((highScore) => highScore.id));
  return highScores.map((highScore) => {
    if (highScore.id === maxId) {
      return { ...highScore, score: Math.max(highScore.score, points) };
    }
    return highScore;
  });
}

type HighScore = {
  id: number;
  score: number;
};

export default function Game({ children }: { children: React.ReactNode }) {
  const [rollWheels, setRollWheels] = useState(initializeBoth());
  const [points, setPoints] = useState(10);
  const [lockedWheels, setLockedWheels] = useState<lockButtonState[]>(
    Array(NUMBER_OF_WHEELS).fill("clickable"),
  );
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [userName, setUserName] = useState("Default User");
  const isRolling = rollWheels.rollWheelOffsets.some((offset) => offset !== 0);
  const linesWithScores = WINNINGLINES.map((line) => ({
    line,
    score: calculateWinningLineWorth(line, rollWheels.rollWheelItems),
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

    setRollWheels({
      rollWheelItems: newRollWheelItems,
      rollWheelOffsets: initializeRollWheelOffsets(),
    });

    createNewHighScore(10, [], "anonymous").then((highScores) =>
      setHighScores(highScores),
    );
  }, []);

  useEffect(() => {
    updateHighScores(highScores, userName);
  }, [highScores, userName]);

  useEffect(() => {
    if (isWinningPosition && points > 0) {
      setHighScores((prevHighScores) =>
        prevHighScores.map((highScore) => {
          if (highScore.id === Math.max(...prevHighScores.map((hs) => hs.id))) {
            return { ...highScore, score: Math.max(highScore.score, points) };
          }
          return highScore;
        }),
      );
    }
  }, [points, isWinningPosition]);

  const handleClick = () => {
    if (points === 0) {
      createNewHighScore(10, highScores, userName).then((highScores) =>
        setHighScores(highScores),
      );
      setPoints(10);
      return;
    }

    const randomOffsets = rollWheels.rollWheelOffsets.map((_, index) => {
      if (lockedWheels[index] === "pressed") {
        return 0;
      }
      const randomOffset =
        MIN_ROL_LENGTH * (index * 0.5 + 1) +
        Math.floor(Math.random() * (MAX_ROL_LENGTH - MIN_ROL_LENGTH));
      return randomOffset;
    });

    const newLockedWheels = lockedWheels.map((value) =>
      value === "pressed" ? "disabledClicked" : "clickable",
    );

    setRollWheels({ ...rollWheels, rollWheelOffsets: randomOffsets });
    setPoints(points - 1);
    setLockedWheels(newLockedWheels);

    setTimeout(() => {
      const shiftArrayByOffset = (array: Fruit[], offset: number) => {
        const newArray = [...array];
        for (let i = 0; i < offset; i++) {
          newArray.push(newArray.shift()!);
        }
        return newArray;
      };

      const shiftedRollWheels = rollWheels.rollWheelItems.map(
        (rollWheel, index) =>
          shiftArrayByOffset(rollWheel, randomOffsets[index]),
      );
      const allZeroOffsets = rollWheels.rollWheelOffsets.map(() => 0);

      const scoreCheckedWinningLines = WINNINGLINES.map((winningLine) => {
        return calculateWinningLineWorth(winningLine, shiftedRollWheels);
      });

      const additionalPoints = scoreCheckedWinningLines.reduce(
        (acc, val) => acc + val,
        0,
      );

      setRollWheels({
        rollWheelItems: shiftedRollWheels,
        rollWheelOffsets: allZeroOffsets,
      });
      setPoints((p) => p + additionalPoints);
      setLockedWheels((locks) =>
        locks.map((value) => {
          if (additionalPoints > 0) {
            return "disabledNotClicked";
          }
          return value === "disabledClicked" ? "disabledNotClicked" : value;
        }),
      );
    }, 4000);
  };
  return (
    <div className="flex w-full max-w-[800px] flex-col items-center justify-center">
      <div className="flex h-[80px] w-[300px] items-center justify-center rounded-tl-xl rounded-tr-xl border-8 border-b-0 border-red bg-gold lg:w-[600px]">
        <h1
          className="text-center font-display text-[60px] tracking-wide text-white stroke-and-paint"
          style={{
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
          userName={userName}
          setUserName={setUserName}
        >
          {children}
        </ScoreBoard>
        <div className="flex w-full flex-row justify-between py-4 lg:py-9">
          {rollWheels.rollWheelItems.map((rollWheel, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Wheel
                items={rollWheel}
                offset={rollWheels.rollWheelOffsets[index]}
                winningPositions={getWinningPositions(
                  linesWithScores
                    .filter((line) => line.score !== 0)
                    .map((line) => line.line),
                )}
                wheelIndex={index}
              />
              <LockButton
                pressed={lockedWheels[index]}
                setLockedState={(status: lockButtonState) => {
                  if (isRolling) return;
                  setLockedWheels(
                    lockedWheels.map((value, i) =>
                      i === index ? status : value,
                    ),
                  );
                }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleClick}
          disabled={isRolling}
          className="w-full rounded-lg border-2 border-black text-[36px] font-bold tracking-[0.08em] text-white transition-colors stroke-and-paint disabled:border-[#A9A9A9] disabled:bg-[#D3D3D3] disabled:text-[#D3D3D3] disabled:opacity-60"
          style={{
            background: `radial-gradient(50% 50% at 50% 50%, #FF7B69 0%, #760E17 100%)`,
          }}
        >
          {points === 0 && !isRolling ? "Restart" : "Roll"}
        </button>
      </div>
    </div>
  );
}
