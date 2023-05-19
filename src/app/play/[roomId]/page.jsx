"use client";

import React, { useEffect, useMemo, useReducer, useState } from "react";
import { socket } from "../../../socket";
import Grid from "@/Components/Grid";
import PlayerturnInfo from "@/Components/PlayerturnInfo";
import { JOIN, PLAYERS_UPDATED, ENEMY_JOINED } from "@/constants/SocketEvent";

export default function PlayRoom({ params }) {
  const { roomId } = params;
  const gridSize = 4;
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isWaiting, setIsWaiting] = useState(true);
  const [players, setPlayers] = useState([]);
  const [activePlayerIndex, setActivePlayerIndex] = useState(null);

  const player = useMemo(() => {
    console.log("Trying to update active player", {
      players,
      activePlayerIndex,
    });
    if (activePlayerIndex < 0) {
      console.warn("Invalid activePlayerIndex");
      return;
    }
    return players[activePlayerIndex];
  }, [activePlayerIndex]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onEnemyJoined() {
      setIsWaiting(false);
    }

    function onPlayersUpdated({ players }) {
      setPlayers(players);
      setActivePlayerIndex(players.findIndex(({ id }) => id === socket.id));
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on(PLAYERS_UPDATED, onPlayersUpdated);
    socket.on(ENEMY_JOINED, onEnemyJoined);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(PLAYERS_UPDATED, onPlayersUpdated);
      socket.off(ENEMY_JOINED, onEnemyJoined);
    };
  }, []);

  useEffect(() => {
    fetch("/api/socket");
    socket.emit(JOIN, roomId);
  }, []);

  return (
    <section>
      <div className="flex justify-center gap-4 mt-10 flex-1">
        <div className="flex flex-col gap-4 items-center">
          <h1>
            Connection Status: {isConnected ? `Connected ` : "Disconnected"}
          </h1>
          <Grid
            size={gridSize}
            roomId={roomId}
            player={player}
            isWaiting={isWaiting}
            setIsWaiting={setIsWaiting}
          />
          <PlayerturnInfo isWaiting={isWaiting} />
        </div>
        <PlayerList players={players} activePlayerIndex={activePlayerIndex} />
      </div>
    </section>
  );
}

function PlayerList({ players, activePlayerIndex }) {
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
            <span>{value}</span>
            <span>{id}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
