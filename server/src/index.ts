import express from 'express'
import http from 'http'
import ws from 'ws'

const PORT = process.env.PORT || 4000
const app = express()
const server = http.createServer(app)
const wsServer = new ws.Server({ server })

wsServer.on("connection", ws => {
  ws.on("message", msg => {
    console.log("Received message: %s from client", msg);
  });
  //send immediate a feedback to the incoming connection
  ws.send(
    JSON.stringify({
      type: "connect",
      message: "Well hello there, I am a WebSocket server"
    })
  );
});

server.listen(PORT, () => console.log(`Signaling server started on port ${PORT}`))
