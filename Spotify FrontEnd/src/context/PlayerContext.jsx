import { createContext, useEffect, useRef, useState} from "react";
// import { songsData } from "../assets/assets";
import axios from 'axios'

export const PlayerContext = createContext();

const PlayerContextProvider = (props)=>{

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const volumeBar = useRef();


    //const url = "http://localhost:4000";
    

    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [songsData,setSongsData] = useState([])
    const [albumsData, setAlbumsData] = useState([])
    const [track,setTrack] = useState(null)
    const [playStatus,setPlaystatus] = useState(false)
    const [token, setToken] = useState("")
    const [showNowPlayer, setShowNowPlayer] = useState(() => {
        return JSON.parse(localStorage.getItem("showNowPlayer")) || false;
    });
    const [repeat, setRepeat] = useState(
        () => JSON.parse(localStorage.getItem("repeatMode")) || false
      );

    const [time,setTime] = useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })
    const changeVolume = (newVolume) => {
        setVolume(newVolume);
        audioRef.current.volume = newVolume / 100; // Convert 0-100 scale to 0-1 for audio element
      };
    const toggleMute = () => {
        setIsMuted(!isMuted);
        audioRef.current.muted = !audioRef.current.muted;
    };

    
    const play = ()=>{
        audioRef.current.play();
        setPlaystatus(true)
    }

    const pause = ()=>{
        audioRef.current.pause();
        setPlaystatus(false)
    }

    const playWithId = async (id)=>{
        // await setTrack(songsData[id]);
        // await audioRef.current.play();
        // setPlaystatus(true)
        await songsData.map((item)=>{
            if(id===item._id){
                setTrack(item);
            }
        })
        await audioRef.current.play();
        setPlaystatus(true);
    }
    
    const previous = async()=>{
        // if(track.id>0){
        //     await setTrack(songsData[track.id-1]);
        //     await audioRef.current.play();
        //     setPlaystatus(true)
        // }
        songsData.map(async(item,index)=>{
            if(track._id===item._id && index>0)
            {
                await setTrack(songsData[index-1])
                await audioRef.current.play();
                setPlaystatus(true)
            }
        })
    }

    const next = async()=>{
        // if(track.id<songsData.length-1){
        //     await setTrack(songsData[track.id+1]);
        //     await audioRef.current.play();
        //     setPlaystatus(true)
        // }
        songsData.map(async(item,index)=>{
            if(track._id===item._id && index<songsData.length)
            {
                await setTrack(songsData[index+1])
                await audioRef.current.play();
                setPlaystatus(true)
            }
        })
    }

    const seekSong = async(e) =>{
        // console.log(e)
        audioRef.current.currentTime = ((e.nativeEvent.offsetX/seekBg.current.offsetWidth)*audioRef.current.duration)
    }

    const getSongsData = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/song/list`);
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0])
        } catch (error) {
            
        }
    }

    const getAlbumsData = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/album/list`);
            setAlbumsData(response.data.albums)
        } catch (error) {
            
        }
    }

    const toggleRepeat = () => {
        setRepeat((prev) => {
          const newState = !prev;
          localStorage.setItem("repeatMode", JSON.stringify(newState)); // Save state
        //   console.log("value changes",prev)
          return newState;
        });
      };
    
    // Function to toggle NowPlayer visibility
  const toggleNowPlayer = () => {
    setShowNowPlayer((prev) => {
        const newState = !prev;
        localStorage.setItem("showNowPlayer", JSON.stringify(newState)); // Persist value
        return newState;
    });
  };

    useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate = ()=>{
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%"
                setTime({
                    currentTime:{
                        second:Math.floor(audioRef.current.currentTime%60),
                        minute:Math.floor(audioRef.current.currentTime/60)
                    },
                    totalTime:{
                        second:Math.floor(audioRef.current.duration%60),
                        minute:Math.floor(audioRef.current.duration/60)
                    }
                })
            }
        },1000)
    },[audioRef])

    useEffect(()=>{
        getSongsData();
        getAlbumsData();
    },[]);

    useEffect(()=>{
        const handleSongEnd = async ()=>{
            if(repeat){
                await audioRef.current.play();
            }
        }
        const audioElement = audioRef.current;
        if(audioElement)
        {
            audioElement.addEventListener("ended",handleSongEnd)
        }

        return ()=>{
            if(audioElement)
            {
                audioElement.removeEventListener("ended",handleSongEnd)
            }
        }
    },[repeat]);
    
    useEffect(() => {
    }, [showNowPlayer]);

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,setTrack,
        playStatus,setPlaystatus,
        time,setTime,
        play,pause,
        playWithId,
        previous,next,
        seekSong,
        songsData,
        albumsData,
        toggleRepeat,
        repeat,
        showNowPlayer,
        toggleNowPlayer,
        volume, setVolume, isMuted, toggleMute, changeVolume,
        volumeBar,
    
        token,
        setToken
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider