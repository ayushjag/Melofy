import React, {useEffect, useState, useContext } from 'react'
import axios from "axios"
import Navbar from './Navbar'
import {  assets } from '../assets/assets'
import { songsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'
const DisplayPlaylist = () => {

  const {playWithId,songsData} = useContext(PlayerContext)
  const [playlistSongs, setPlaylistSongs] = useState([]);
  useEffect(() => { 
    const fetchPlaylist = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/playlist/get`, 
        {},
        {
          headers:{
            token:localStorage.getItem('token')
          }
        });
        console.log("token is:",localStorage.getItem('token'))
        console.log("response is:", res.data);
        console.log("Songs:", res.data.songs);
        if (res.data.success) {
          setPlaylistSongs(res.data.songs);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlaylist();
  }, []);
  return (
    <>
    <Navbar/>
      <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
  
      <div className='flex flex-col'>
                  <p>Playlists</p>
                  <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{"Playlist Name"}</h2>
                  <h4>{"Playlist description"}</h4>
                  <p className='mt-1'>
                      <img className='inline-block w-5' src={assets.spotify_logo} alt="" />
                      <b>Spotify</b>
                      . 1,323,154 likes
                      . <b>50 songs,</b>
                      about 2 hr 30 min
                  </p>
              </div>
    </div>
  {/* PLAY BUTTON OF PLAYLIST PENDING */}
     <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
            <p><b className='mr-4'>#</b>Title</p>
            <p>Album</p>
            <p className='hidden sm:block'>Date Added</p>
            <img className='m-auto w-4' src={assets.clock_icon} alt="" />
          </div>
          <hr />  
          
      {
        // songs of playlist
        
        playlistSongs.map((item, index) => (
          <div
            onClick={() => playWithId(item._id)}
            key={item._id}
            className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'
          >
            <p className='text-white'>
              <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
              <img className='inline w-10 mr-5' src={item.image} alt="" />
              {item.name}
            </p>
            <p className='text-[15px]'>{item.album || "Unknown Album"}</p>
            <p className='text-[15px] hidden sm:block'>Recently Added</p>
            <p className='text-[15px] text-center'>{item.duration}</p>
          </div>
        ))
      
    }
    {
      console.log("This is item",playlistSongs)
      // console.log("This is item Id",songsData[0]._id)
    }
    </>

  )
}

export default DisplayPlaylist
