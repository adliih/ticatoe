export type ClickedTiles = {
  [row in number]: {
    [col in number]: string;
  };
};

export function findWinningPlayerValue(
  clickedTiles: ClickedTiles
): string | undefined {
  return (
    findWinningPlayerValueRow(clickedTiles) ||
    findWinningPlayerValueCol(clickedTiles) ||
    findWinningPlayerValueDiag(clickedTiles)
  );
}

function findWinningPlayerValueRow(
  clickedTiles: ClickedTiles
): string | undefined {
  return;
}
function findWinningPlayerValueCol(
  clickedTiles: ClickedTiles
): string | undefined {
  return;
}
function findWinningPlayerValueDiag(
  clickedTiles: ClickedTiles
): string | undefined {
  return;
}
