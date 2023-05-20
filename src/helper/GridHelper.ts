export type Grid = (string | undefined)[][];

export function initGrid(size: number): Grid {
  const rows = [];
  for (let i = 0; i < size; i++) {
    const cols = [];
    for (let j = 0; j < size; j++) {
      cols.push(undefined);
    }
    rows.push(cols);
  }
  return rows;
}
