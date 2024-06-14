export enum Position {
  TopLeft,
  TopMiddle,
  TopRight,
  MiddleLeft,
  Middle,
  MiddleRight,
  BottomLeft,
  BottomMiddle,
  BottomRight,
}

export default class WinningLine {
  positions: [Position, Position, Position];
  multiplyer: number;
  currentWorth: number = 0;

  constructor(line: [Position, Position, Position], multiplier: number) {
    this.positions = line;
    this.multiplyer = multiplier;
  }

  updateCurrentWorth(col1: string[], col2: string[], col3: string[]) {
    let prevChar: string | undefined = undefined;
    let isWinningLine = true;
    for (const pos of this.positions) {
      if (!isWinningLine) {
        break;
      }
      let currentChar: string;
      switch (pos) {
        case Position.TopLeft:
          currentChar = col1[2];
          break;
        case Position.TopMiddle:
          currentChar = col2[2];
          break;
        case Position.TopRight:
          currentChar = col3[2];
          break;
        case Position.MiddleLeft:
          currentChar = col1[1];
          break;
        case Position.Middle:
          currentChar = col2[1];
          break;
        case Position.MiddleRight:
          currentChar = col3[1];
          break;
        case Position.BottomLeft:
          currentChar = col1[0];
          break;
        case Position.BottomMiddle:
          currentChar = col2[0];
          break;
        case Position.BottomRight:
          currentChar = col3[0];
          break;
        default:
          pos satisfies never;
          continue;
      }
      if (prevChar !== undefined && prevChar !== currentChar) {
        isWinningLine = false;
      }
      prevChar = currentChar;
    }
    if (isWinningLine && prevChar !== undefined) {
      this.currentWorth = WinningLine.calculateScore(this.multiplyer, prevChar);
    }
  }

  resetCurrentWorth() {
    this.currentWorth = 0;
  }

  static calculateScore(multiplier: number, winning_char: string): number {
    switch (winning_char) {
      case "🍒":
      case "🍓":
      case "🍐":
        return multiplier * 1;
      case "👑":
      case "🎩":
      case "✨":
        return multiplier * 3;
      case "⭐️":
        return multiplier * 5;
      default:
        console.log(`Unhandled character: ${winning_char}`);
        return 0;
    }
  }
}
