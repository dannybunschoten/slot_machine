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
    case "":
      return 0;
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
