"use client";

import React, { useEffect, useMemo, useReducer } from "react";
import { socket } from "../socket";
import { TILE_CLICK, TILE_CLICKED } from "@/constants/SocketEvent";

export default function Grid({
  size,
  roomId,
  player,
  isWaiting,
  setIsWaiting,
}) {
  const [clickedTiles, updateClickedTiles] = useReducer(
    (prevClickedTiles, { row, col, playerValue }) => {
      const copy = {
        ...prevClickedTiles,
      };
      if (row in copy) {
        copy[row] = {
          ...copy[row],
          [col]: playerValue,
        };
      } else {
        copy[row] = {
          [col]: playerValue,
        };
      }

      console.log("updateClickedTiles", copy);

      return copy;
    },
    {}
  );

  const grids = useMemo(() => {
    return times(size).flatMap((_, row) => {
      return times(size).map((_, col) => {
        return { row, col };
      });
    });
  }, [size, player]);

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
  }, [socket]);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
      }}
      className={`grid gap-4`}
    >
      {grids.map(({ row, col }, index) => (
        <Cell
          isWaiting={isWaiting}
          setIsWaiting={setIsWaiting}
          key={index}
          row={row}
          col={col}
          roomId={roomId}
          playerValue={player?.value}
          clickedValue={clickedTiles?.[row]?.[col]}
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

function times(x) {
  return [...Array(x)];
}
