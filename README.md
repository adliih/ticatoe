# Ticatoe

## Run The Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technical Documentation

This is a fullstack Next.js application that use websocket to run a very simple tic-tac-toe games with your friends.

The flow for the play room is something like this.

```mermaid
sequenceDiagram
  User ->> Client: Open `/play/[room-id]` page
  Client ->>  API: Call `/api/socket` api
  Client -> Socket: Established Websocket API

  loop until player/scoket count is 2
    Client ->> Socket: JOIN (roomId)
    Socket ->> Socket: Check joined socket for [room-id]
    note right of Socket: Exit process when<br> there are already > 2 socket in the room
    Socket ->> Client: to all socket: PLAYERS_UPDATED (players)
    Socket ->> Client: to another socket: ENEMY_JOINED
    Client ->> User : setIsWaiting(true)
  end

  loop
    User ->> Client: Click on grid tile
    Client ->> User : Update the grid tile
    Client ->> Socket: Send TILE_CLICK (roomId, row, col, playerValue)
    Client ->> User : setIsWaiting(false)

    Socket ->> Client: to another socket: TILE_CLICKED (row, col, playerValue)
    Client ->> User: Update the grid tile based on TILE_CLICKED event
    Client ->> User: setIsWaiting(true)
    break when found any winnning row/column/diagonal
      Client ->> User: Render win / lose page
    end
  end
```
