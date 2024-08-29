import React from "react";
import prisma from "../commons/db";

export const HighScoreBoard = async () => {
  const highScores = await prisma.highScore.findMany();

  return (
    <div>
      <h1 className="text-center font-display text-[60px] tracking-wide text-white stroke-and-paint">
        High Scores
      </h1>
      <ul>
        {highScores.map((score, index) => (
          <li
            key={index}
            className="flex w-full items-center justify-between text-3xl"
          >
            <span>{score.user}</span>
            <span>{score.score}</span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="mt-2 w-full overflow-hidden rounded-lg border-4 border-red bg-blue px-2 text-right font-display text-[46px] text-white shadow-none focus:outline-none"
        placeholder="Enter your name"
      ></input>
    </div>
  );
};
