import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 4000
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
})

type Room = {
  [key: string]: any
}

const rooms: Room = {}

io.on("connection", socket => {
  socket.on("message", msg => {
    console.log("Received message: %s from client", msg);
  });
  //send immediate a feedback to the incoming connection
  socket.send(
    JSON.stringify({
      type: "connect",
      message: "Well hello there, I am a WebSocket server"
    })
  );

  socket.on("create room", roomId => {
    rooms[roomId] = [socket.id]
    console.log(`User with socket ID: ${socket.id} created room succesfully with room ID ${roomId}`)
    console.log("Total rooms: " + Object.keys(rooms).length)
  })

  socket.on("join room", roomId => {
    if (rooms[roomId]) {
      rooms[roomId].push(socket.id)
      console.log(`User with socket ID: ${socket.id} joined room succesfully with room ID ${roomId}`)
      socket.send(
        JSON.stringify({
          type: "joinRoom",
          message: "Join room succesfully"
        })
      )
    } else {
      console.log(`User with socket ID: ${socket.id} joined room unsuccesfully. room ID ${roomId} does not exist`)
      socket.send(
        JSON.stringify({
          type: "joinRoom",
          message: "Join room unsuccesfully, room does not exist"
        })
      )
    }
  })
});

server.listen(PORT, () => console.log(`Signaling server started on port ${PORT}`))
