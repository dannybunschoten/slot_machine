import React from "react";
import prisma from "../commons/db";

export const ScoreList = async () => {
  const highScores = await prisma.highScore.findMany({
    take: 10,
    orderBy: {
      score: "desc",
    },
  });
  return (
    <ol className="list-inside list-decimal marker:text-black">
      {highScores.map((score, index) => (
        <li key={index} className="list-item text-3xl">
          <span>{score.name || "Default User"}</span>
          <span className="float-end">{score.score}</span>
        </li>
      ))}
    </ol>
  );
};
