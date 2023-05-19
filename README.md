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
  Socket ->> Socket: Check joined socket for [room-id]
  note right of Socket: Exit process when<br> there are already > 2 socket in the room
  Socket ->> Client: Assign client to socket room with id: [room-id]
  Socket ->> Client: Give Player Value, either O or X
  Client --> Client: Waiting for Server clue to start the game
  loop
    Socket ->> Client: Broadcast to the room: TURN_CHANGE (playerId)
    Client ->> User : Change waiting state
    User ->> Client: Click on grid tile
    Client ->> Socket: Send TILE_CLICK (roomId, row, column, playerId, playerValue)
    Socket ->> Client: Broadcast to the room: TILE_CLICKED (roomId, row, column, playerValue)
    Client ->> User: Update the tile view based on TILE_CLICKED event
    break when found any winnning row/column/diagonal
      Client ->> User: Render win / lose page
    end
  end
```
