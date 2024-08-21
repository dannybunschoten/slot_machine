import { Fruit } from "../commons/fruits";
import Position from "./Position";

export default interface WinningLine {
  positions: Position[];
  multiplier: number;
}

export function calculateWinningLineWorth(
  line: WinningLine,
  rollWheels: string[][],
) {
  let prevChar: string | undefined = undefined;
  for (const pos of line.positions) {
    const { wheelIndex, itemIndex } = pos;
    const currentChar = rollWheels[wheelIndex][itemIndex];
    if (prevChar !== undefined && prevChar !== currentChar) {
      return 0;
    }
    prevChar = currentChar;
  }
  if (prevChar !== undefined) {
    return calculateScore(line.multiplier, prevChar);
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
      return multiplier * 1;
    case "clover":
    case "lemon":
    case "seven":
      return multiplier * 3;
    case "diamond":
      return multiplier * 5;
    default:
      console.error(`Unhandled character: ${winning_char}`);
      return 0;
  }
}

export function getWinningPositions(winningLines: WinningLine[]) {
  const winningPositions = winningLines.flatMap(
    (winningLine) => winningLine.positions,
  );
  return winningPositions;
}
