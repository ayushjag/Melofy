import React,{useContext, useEffect, useRef} from 'react'
import {Route, Routes,useLocation,Navigate} from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
// import { albumsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'
import Login from './Login'
import Lyrics from './Lyrics'
import SignUp from './SignUp'
import ContactUs from './ContactUs'
import DisplayPlaylist from './DisplayPlaylist'

const Display = () => {
  // const isAuthenticated = localStorage.getItem("token")
  const isAuthenticated = true
  const {albumsData} = useContext(PlayerContext)
  const displayRef = useRef()
  const location = useLocation()
  // console.log(location)
  const isAlbum = location.pathname.includes("album")
  const isContact = location.pathname.includes("Contact")
  // console.log(isAlbum)
  // const albumId = isAlbum ?location.pathname.slice(-1):""
  const albumId = isAlbum ? location.pathname.split('/').pop():"";
  // console.log(albumId)
  // const bgColor = albumsData[Number(albumId)].bgColor
  const bgColor = isAlbum && albumsData.length>0 ? albumsData.find((x)=>(x._id==albumId)).bgColour:"#121212";
  // console.log(bgColor)

  useEffect(()=>{
    if(isAlbum){
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
    }
    else if(isContact){
      displayRef.current.style.backgroundSize = "cover";  
    displayRef.current.style.backgroundRepeat = "no-repeat";
    displayRef.current.style.backgroundPosition = "center";
    displayRef.current.style.opacity = "0.75"; 
    }
    else{
      displayRef.current.style.background = `#121212`
    }
  })

  return (
    <div ref={displayRef} className='relative w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w[75%] lg:ml-0'>
      {/* BEFORE DISPLAY */}
      {
        albumsData.length>0
        ?
        <Routes>
            <Route path='/' element={<DisplayHome/>}/>
            {/* <Route path="/*" element={isAuthenticated ? <DisplayHome /> : <Navigate to="/Login"/>}/> */}
            <Route path='/Login' element={<Login/>}/>
            <Route path='/SignUp' element={<SignUp/>}/>
            <Route path='/Lyrics' element={<Lyrics/>}/>
            <Route path='/Contact' element={<ContactUs/>}/>
            <Route path='/Playlist' element={<DisplayPlaylist/>}/>
            <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find((x)=>(x._id==albumId))}/>}/>
        </Routes>
        : null 
        }
      {/* AFTER DISPLAY */}
    </div>
  )  
}
// APP->Display->DisplayHome->Navbar
export default Display