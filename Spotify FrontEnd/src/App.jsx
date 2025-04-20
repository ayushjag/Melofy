import React,{useContext} from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
import NowPlayer from './components/NowPlayer'
const App = () => {
  const {audioRef,track,songsData,showNowPlayer} = useContext(PlayerContext)
  return (
    <div className='h-screen bg-black'>
    {Array.isArray(songsData) && songsData.length !== 0 ? (
  <>
    <div className='h-[90%] flex'>
      <Sidebar />
      <Display />
      {showNowPlayer && <NowPlayer />}
    </div>
  </>
) : null}

      
      <Player/>
      <audio ref={audioRef} src={track?track.file:""} preload='auto'></audio>
    </div>
  )
}

export default App
