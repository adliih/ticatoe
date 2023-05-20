import { Grid } from "./GridHelper";

export type WinningPlayerValue = string | undefined;

export function findWinningPlayerValue(
  grid: Grid,
  size: number
): WinningPlayerValue {
  return (
    findWinningPlayerValueRow(grid, size) ||
    findWinningPlayerValueCol(grid, size) ||
    findWinningPlayerValueDiag(grid, size)
  );
}

function findWinningPlayerValueByCoordinates(
  grid: Grid,
  coordinates: number[][]
): WinningPlayerValue {
  const valuesFound = new Set();
  for (const [row, col] of coordinates) {
    const curr = grid[row][col];
    valuesFound.add(curr);
  }

  if (valuesFound.size !== 1) {
    return undefined;
  }

  // return only  the first value of the set since at this point the valuesFound should only has 1 value
  return valuesFound.values().next().value;
}

function findWinningPlayerValueRow(
  grid: Grid,
  size: number
): WinningPlayerValue {
  // check every row
  for (let row = 0; row < size; row++) {
    // build coordinates of current row and every col inside of it
    const coordinates = [];
    for (let col = 0; col < size; col++) {
      coordinates.push([row, col]);
    }

    const result = findWinningPlayerValueByCoordinates(grid, coordinates);

    if (!!result) {
      return result;
    }
  }
}
function findWinningPlayerValueCol(
  grid: Grid,
  size: number
): WinningPlayerValue {
  // check every col
  for (let col = 0; col < size; col++) {
    // build coordinates of current col and every relevant row of it
    const coordinates = [];
    for (let row = 0; row < size; row++) {
      coordinates.push([row, col]);
    }

    const result = findWinningPlayerValueByCoordinates(grid, coordinates);

    if (!!result) {
      return result;
    }
  }
}
function findWinningPlayerValueDiag(
  grid: Grid,
  size: number
): WinningPlayerValue {
  const topLeftToBottomRightCoordinates = [];
  for (let row = 0; row < size; row++) {
    const col = row;
    topLeftToBottomRightCoordinates.push([row, col]);
  }

  const bottomLeftToTopRightCoordinates = [];
  for (let row = size - 1; row >= 0; row--) {
    const col = size - row - 1;
    bottomLeftToTopRightCoordinates.push([row, col]);
  }

  return (
    findWinningPlayerValueByCoordinates(
      grid,
      topLeftToBottomRightCoordinates
    ) ||
    findWinningPlayerValueByCoordinates(grid, bottomLeftToTopRightCoordinates)
  );
}
