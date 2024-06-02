export default class WinningLines {
  TlBr: undefined | string = undefined;
  BlTr: undefined | string = undefined;
  row1: undefined | string = undefined;
  row2: undefined | string = undefined;
  row3: undefined | string = undefined;
  col1: undefined | string = undefined;
  col2: undefined | string = undefined;
  col3: undefined | string = undefined;

  calculateNewWinningLines(
    roll1Offset: number,
    roll2Offset: number,
    roll3Offset: number,
    arr1: string[],
    arr2: string[],
    arr3: string[],
  ): void {
    this.TlBr =
      arr1[roll1Offset] === arr2[roll2Offset + 1] &&
      arr2[roll2Offset + 1] === arr3[roll3Offset + 2]
        ? arr1[roll1Offset]
        : undefined;
    this.BlTr =
      arr1[roll1Offset + 2] === arr2[roll2Offset + 1] &&
      arr2[roll2Offset + 1] === arr3[roll3Offset]
        ? arr1[roll1Offset + 2]
        : undefined;
    this.row1 =
      arr1[roll1Offset] === arr2[roll2Offset] &&
      arr2[roll2Offset] === arr3[roll3Offset]
        ? arr1[roll1Offset]
        : undefined;
    this.row2 =
      arr1[roll1Offset + 1] === arr2[roll2Offset + 1] &&
      arr2[roll2Offset + 1] === arr3[roll3Offset + 1]
        ? arr1[roll1Offset + 1]
        : undefined;
    this.row3 =
      arr1[roll1Offset + 2] === arr2[roll2Offset + 2] &&
      arr2[roll2Offset + 2] === arr3[roll3Offset + 2]
        ? arr1[roll1Offset + 2]
        : undefined;
    this.col1 =
      arr1[roll1Offset] === arr1[roll1Offset + 1] &&
      arr1[roll1Offset + 1] === arr1[roll1Offset + 2]
        ? arr1[roll1Offset]
        : undefined;
    this.col2 =
      arr2[roll2Offset] === arr2[roll2Offset + 1] &&
      arr2[roll2Offset + 1] === arr2[roll2Offset + 2]
        ? arr2[roll1Offset]
        : undefined;
    this.col3 =
      arr3[roll3Offset] === arr3[roll3Offset + 1] &&
      arr3[roll3Offset + 1] === arr3[roll3Offset + 2]
        ? arr3[roll3Offset]
        : undefined;
  }

  increasePoints(): number {
    let points = 0;
    for (const key in this) {
      if (this.hasOwnProperty(key) && typeof this[key] === "string") {
        switch (key) {
          case "TlBr":
          case "BlTr":
            points += this.increasePointsPerRow(1, this[key] as string);
            break;
          case "row1":
          case "row3":
          case "col1":
          case "col2":
          case "col3":
            points += this.increasePointsPerRow(2, this[key] as string);
            break;
          case "row2":
            points += this.increasePointsPerRow(3, this[key] as string);
            break;
        }
      }
    }
    return points;
  }

  increasePointsPerRow(multiplier: number, winning_char: string): number {
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
        console.log(`Unhandled character: '${winning_char}'`);
        return 0;
    }
  }
}
