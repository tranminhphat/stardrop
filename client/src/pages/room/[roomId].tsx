import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { io } from "socket.io-client";

const Room = () => {
  const router = useRouter()
  const { roomId } = router.query
  const socketRef = useRef<any>();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
      socketRef.current = io("ws://localhost:4000")
      socketRef.current.emit("create room", roomId)
    })
  }, [roomId])


  return (
    <div>Room ID: {roomId}</div>
  )
}

export default Room

