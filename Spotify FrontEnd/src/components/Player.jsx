import React,{useContext} from 'react'
import { assets, songsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const Player = () => {

  const {track,seekBar,seekBg,playStatus,play,pause,time,previous,next,seekSong,toggleRepeat,repeat,toggleNowPlayer,showNowPlayer,audioRef, toggleMute, isMuted, volume, changeVolume} = useContext(PlayerContext)

  return track ?(
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      <div className='hidden lg:flex items-center gap-4'>
        <img className='w-12' src={track.image} alt="" />
        <div>
            <p>{track.name}</p>
            <p>{track.desc.slice(0,12)}</p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
            <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
            <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="" />

            {playStatus
            ?<img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="" />
            :<img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="" />
            }
            
            <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="" />
            <img onClick={toggleRepeat} className={`w-4 cursor-pointer ${repeat ? "green-filter" : ""}`} src={assets.loop_icon} alt="loop" />
            {/* {console.log("repeat value is: ",repeat)} */}
        </div>
        <div className='flex items-center gap-5'>
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div onClick={seekSong} ref={seekBg} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
            <hr ref={seekBar} className='h-1 border-none w-20 bg-green-800 rounded-full'/>
          </div>
          <p>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>
      <div className='hidden lg:flex items-center gap-2 opacity-75'>
        <img onClick={toggleNowPlayer} className={`w-4 cursor-pointer ${showNowPlayer ? "green-filter" : ""}`}  src={assets.plays_icon} alt="player"  />
        <img className='w-4' src={assets.mic_icon} alt="" />
        <img className='w-4' src={assets.queue_icon} alt="" />
        <img className='w-4' src={assets.speaker_icon} alt="" />
        <img onClick={toggleMute} className='w-4 cursor-pointer' src={isMuted ? assets.Mutedvolume_icon : assets.volume_icon} alt="" />
        {/* <div className='w-20 bg-slate-50 h-1 rounded'>

        </div> */}
        <Box sx={{ width: 80 }}>
      <Slider value={volume}  onChange={(e, newValue) => changeVolume(newValue)}  defaultValue={50} aria-label="Default" valueLabelDisplay="auto" 
      sx={{
        color: "#1DB954", 
        '& .MuiSlider-thumb': {
          color: "#1DB954", 
          width: 10,
        height: 10, 
        },
        '& .MuiSlider-track': {
          color: "#1DB954", 
        },
        '& .MuiSlider-rail': {
          color: "#4CAF50",
        }
      }} />
    </Box>
        <img className='w-4' src={assets.mini_player_icon} alt="" />
        <img className='w-4' src={assets.zoom_icon} alt="" />
      </div>
    </div>
  ):null
}

export default Player
