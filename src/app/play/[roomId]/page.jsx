"use client";

import React, { useEffect, useMemo, useState } from "react";
import { socket } from "../../../socket";
import Grid from "@/Components/Grid";
import PlayerList from "@/Components/PlayerList";
import PlayerTurnInfo from "@/Components/PlayerTurnInfo";
import WinningInfo from "@/Components/WinningInfo";
import { JOIN, ENEMY_JOINED } from "@/constants/SocketEvent";

export default function PlayRoom({ params }) {
  const { roomId } = params;
  const gridSize = 3;
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isWaiting, setIsWaiting] = useState(true);
  const [players, setPlayers] = useState([]);
  const [activePlayerIndex, setActivePlayerIndex] = useState(null);
  const [winningPlayerValue, setWinningPlayerValue] = useState(undefined);

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
  }, [players, activePlayerIndex]);

  const winner = useMemo(() => {
    return players.find(({ value }) => value == winningPlayerValue);
  }, [winningPlayerValue]);

  // socket listener
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

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on(ENEMY_JOINED, onEnemyJoined);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(ENEMY_JOINED, onEnemyJoined);
    };
  }, [roomId]);

  // Socket Connection
  useEffect(() => {
    fetch("/api/socket");
    socket.emit(JOIN, roomId);
  }, [roomId]);

  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 flex-1">
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
            setWinningPlayerValue={setWinningPlayerValue}
          />
          <WinningInfo winner={winner} />
          <PlayerTurnInfo
            isWaiting={isWaiting}
            winningPlayerValue={winningPlayerValue}
          />
        </div>
        <PlayerList
          players={players}
          setPlayers={setPlayers}
          activePlayerIndex={activePlayerIndex}
          setActivePlayerIndex={setActivePlayerIndex}
        />
      </div>
    </section>
  );
}
