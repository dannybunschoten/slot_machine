import { Position } from "postcss";

export default class WinningLine {
  positions: Position[];
  multiplyer: number;
  currentWorth: number = 0;

  constructor(
    positions: Position[],
    multiplyer: number,
  ) {
    if (positions.length === 3) {
      this.positions = positions;
      this.multiplyer = multiplyer;
    } else {
      throw new Error(`position array passed of length ${positions.length}, where only length 3 is allowed}`);
    }
  }

  updateCurrentWorth(arr1: string[], arr2: string, arr3: string) { 
    const char: string | undefined = undefined; 
    for (const pos in this.positions) {
      
      switch (pos) {
        case Position.TopLeft:
          
      }
    }
  }
}
