"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { z } from "zod";

const HighScoreSchema = z.object({
  id: z.number(),
  score: z.number(),
});
const HighScoresSchema = z.array(HighScoreSchema);
const NameSchema = z.string();
type HighScore = z.infer<typeof HighScoreSchema>;
type HighScores = z.infer<typeof HighScoresSchema>;
type Name = z.infer<typeof NameSchema>;

export async function getNewGame(Name: unknown) {
  const name = NameSchema.safeParse(Name);
  if (!name.success) {
    throw new Error("Invalid name");
  }

  const highScore = await prisma.highScore.create({
    data: {
      name: name.data,
      score: 10,
    },
  });

  return highScore.id;
}

export async function updateHighScores(HighScores: unknown, Name: unknown) {
  const highScores = HighScoresSchema.safeParse(HighScores);
  const name = NameSchema.safeParse(Name);
  if (!highScores.success || !name.success) {
    console.log(highScores.error, name.error);
    throw new Error("Invalid high scores");
  }
  highScores.data.forEach(async (highScore) => {
    await prisma.highScore.update({
      where: { id: highScore.id },
      data: { score: highScore.score, name: name.data },
    });
  });
  revalidatePath("/");
}
