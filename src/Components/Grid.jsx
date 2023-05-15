"use client";

import React, { useMemo } from "react";

export default function Grid({ size }) {
  const grids = useMemo(() => {
    return times(size).flatMap((_, row) => {
      return times(size).map((_, col) => {
        return { row, col };
      });
    });
  }, [size]);
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr));`,
      }}
      className={`grid gap-4`}
    >
      {grids.map(({ row, col }, index) => (
        <Cell key={index} row={row} column={col} />
      ))}
    </div>
  );
}

function Cell({ row, column }) {
  const handleClick = () => {
    alert(`clicked: ${JSON.stringify({ row, column })}`);
  };
  return (
    <button onClick={handleClick} className="p-10 bg-gray-600 cursor-pointer">
      {row} | {column}
    </button>
  );
}

function times(x) {
  return [...Array(x)];
}
