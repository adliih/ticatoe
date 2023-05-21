"use client";

import React, { useEffect, useReducer } from "react";
import { socket } from "../socket";
import { TILE_CLICK, TILE_CLICKED } from "@/constants/SocketEvent";
import { initGrid } from "@/helper/GridHelper";
import { findWinningPlayerValue } from "@/helper/ScoreHelper";

export default function Grid({
  size,
  roomId,
  player,
  isWaiting,
  setIsWaiting,
  setWinningPlayerValue,
}) {
  const [grids, updateClickedTiles] = useReducer(
    (prevGrids, { row, col, playerValue }) => {
      const copy = [...prevGrids];
      copy[row][col] = playerValue;

      return copy;
    },
    initGrid(size)
  );

  // check for winning player every grid updates
  const checkWin = () => {
    const winningValue = findWinningPlayerValue(grids, size);
    if (!winningValue) {
      return;
    }

    setWinningPlayerValue(winningValue);
    setIsWaiting(true); // disable turn
  };

  useEffect(() => {
    checkWin();
  }, [grids]);

  useEffect(() => {
    // listening to TILE_CLICKED event
    function onTileClicked(params) {
      console.log("onTileClicked", params);
      setIsWaiting(false);
      updateClickedTiles(params);
    }

    socket.on(TILE_CLICKED, onTileClicked);

    return () => {
      socket.off(TILE_CLICKED, onTileClicked);
    };
  }, [setIsWaiting]);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
      }}
      className={`grid gap-2`}
    >
      {/* flat the 2 dimentional array */}
      {grids.flat(2).map((val, index) => (
        <Cell
          isWaiting={isWaiting}
          setIsWaiting={setIsWaiting}
          key={index}
          row={parseInt(index / size)}
          col={parseInt(index % size)}
          roomId={roomId}
          playerValue={player?.value}
          clickedValue={val}
          updateClickedTiles={updateClickedTiles}
        />
      ))}
    </div>
  );
}

function Cell({
  row,
  col,
  roomId,
  playerValue,
  isWaiting,
  setIsWaiting,
  clickedValue,
  updateClickedTiles,
}) {
  const handleClick = () => {
    socket.emit(TILE_CLICK, { roomId, row, col, playerValue });
    setIsWaiting(true);
    updateClickedTiles({ row, col, playerValue });
  };
  if (isWaiting | !!clickedValue) {
    return (
      <div className="flex w-20 h-20 items-center justify-center bg-gray-600">
        {clickedValue}
      </div>
    );
  }
  return (
    <div
      onClick={handleClick}
      className="flex w-20 h-20 items-center justify-center bg-gray-600 cursor-pointer"
    ></div>
  );
}
