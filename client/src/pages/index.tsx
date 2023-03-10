import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [roomVal, setRoomVal] = useState('')
  const router = useRouter()
  const createRoom = () => {
    const roomId = uuidv4()
    router.push({
      pathname: '/room/[roomId]',
      query: { type: "createRoom", roomId }
    })
  }

  const handleRoomValChange = (e: any) => {
    setRoomVal(e.target.value)
  }

  const handleClick = () => {
    router.push({
      pathname: '/room/[roomId]',
      query: { type: "joinRoom", roomId: roomVal }
    })
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{display: 'flex', flexDirection: 'column'}}>
        <button onClick={createRoom}>Create room</button>
        <p>Or join existing room</p>
        <input type="text" value={roomVal} onChange={handleRoomValChange} />
        <button onClick={() => handleClick()}>Join</button>
      </main>
    </>
  )
}

export default Home
