"use client";

import React, { useEffect } from "react";
import { PLAYERS_UPDATED } from "@/constants/SocketEvent";
import { socket } from "@/socket";

export default function PlayerList({
  players,
  setPlayers,
  activePlayerIndex,
  setActivePlayerIndex,
}) {
  useEffect(() => {
    function onPlayersUpdated({ players }) {
      setPlayers(players);
      setActivePlayerIndex(players.findIndex(({ id }) => id === socket.id));
    }

    socket.on(PLAYERS_UPDATED, onPlayersUpdated);

    return () => {
      socket.off(PLAYERS_UPDATED, onPlayersUpdated);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 bg-slate-500">
      <h1 className="text-center text-xl font-semibold text-green-100 p-4">
        Player List
      </h1>
      {players.map(({ id, value }, index) => (
        <div
          className={[
            index === activePlayerIndex ? "text-green-300" : "",
            "px-3",
          ].join(" ")}
          key={id}
        >
          <div className="flex gap-2">
            <span>[{value}]</span>
            <span>{id}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
