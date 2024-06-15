import Position from "./Position";

export default interface WinningLine {
  positions: Position[];
  multiplier: number;
  currentWorth: number;
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
  winning_char: string,
): number {
  switch (winning_char) {
    case "🍒":
    case "🍓":
    case "🍐":
      return multiplier * 1;
    case "👑":
    case "🎩":
      return multiplier * 3;
    case "⭐️":
      return multiplier * 5;
    default:
      console.error(`Unhandled character: ${winning_char}`);
      return 0;
  }
}

export function getWinningPositions(lines: WinningLine[]) {
  const winningLines = lines.filter((line) => line.currentWorth);
  const winningPositions = winningLines.flatMap(
    (winningLine) => winningLine.positions,
  );
  return winningPositions;
}
