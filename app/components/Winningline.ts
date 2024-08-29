import { never } from "zod";
import { Fruit } from "../commons/fruits";
import Position from "./Position";

export default interface WinningLine {
  positions: Position[];
  multiplier: number;
}

export function calculateWinningLineWorth(
  line: WinningLine,
  rollWheels: Fruit[][],
  multiplier: number,
) {
  let prevChar: Fruit | undefined = undefined;
  for (const pos of line.positions) {
    const { wheelIndex, itemIndex } = pos;
    const currentChar = rollWheels[wheelIndex][itemIndex];
    if (prevChar !== undefined && prevChar !== currentChar) {
      return 0;
    }
    prevChar = currentChar;
  }
  if (prevChar !== undefined) {
    return calculateScore(line.multiplier, prevChar) * multiplier;
  }
  console.error("prevChar was undefined");
  return 0;
}

export function calculateScore(
  multiplier: number,
  winning_char: Fruit,
): number {
  switch (winning_char) {
    case "cherries":
    case "watermelon":
    case "grapes":
    case "horseshoe":
    case "orange":
      return multiplier * 3;
    case "clover":
    case "lemon":
    case "seven":
      return multiplier * 5;
    case "diamond":
      return multiplier * 10;
    default:
      console.error(`Unhandled character: ${winning_char}`);
      // add compiler error if we forget to handle a case
      never;
      return 0;
  }
}

export function getWinningPositions(winningLines: WinningLine[]) {
  const winningPositions = winningLines.flatMap(
    (winningLine) => winningLine.positions,
  );
  return winningPositions;
}
