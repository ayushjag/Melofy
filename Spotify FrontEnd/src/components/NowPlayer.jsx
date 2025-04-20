import React,{useContext} from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { assets, songsData } from '../assets/assets'
const NowPlayer = () => {
    const {track,toggleNowPlayer} = useContext(PlayerContext)
  return track ?(
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex overflow-y-auto'>
    <div className="flex flex-col p-4 bg-[#181818] text-white rounded-lg shadow-md w-full h-full">
    {/* Sticky Playlist Name & Controls */}
    {/* Top: Playlist Name & Controls */}
  <div className="flex items-center justify-between sticky top-0 bg-[#181818] z-10 p-4 border-b border-gray-700">
    <p className="text-sm font-semibold">Daily Mix 1</p>
    <div className="flex items-center gap-3 text-gray-400">
      <p className="cursor-pointer hover:text-white">...</p>
      <p onClick={toggleNowPlayer} className="cursor-pointer hover:text-white">X</p>
    </div>
  </div>
  {/* Album Art - Positioned Below */}
    {/* Scrolling Section (Only this should scroll) */}
  <div className="flex-grow overflow-y-auto p-4">
  <div className="w-full mt-5">
    <img
      src={track.image}
      alt="Album Art"
      className="w-full h-full rounded-md"
    />
  </div>
    {/* Song Info & Progress */}
    <div className="w-full mt-4">
      <h4 className="text-sm font-semibold truncate">{track.name}</h4>
      <p className="text-xs text-gray-400 truncate">{track.desc}</p>
    </div>
    
    {/* Credits Section */}
    <div className="w-full mt-4 text-xs text-gray-400">
      <p>Credits: Written by Artist Name</p>
      <p>Produced by Producer Name</p>
      <p>© 2025 Record Label</p>
    </div>

    {/* Developer Image */}
  <div className="w-full mt-5">
    <img
      src={assets.admin}
      alt="Developer"
      className="w-full h-full rounded-md"
    />
  </div>

    {/* Developer Info */}
    <div className="text-center mt-2">
      <p className="text-sm font-semibold">Ayush Jagwan</p>
      <p className="text-xs text-gray-400">Full Stack Developer</p>
      </div>
      {/* Social Links */}
      <div className="flex gap-3 mt-2">
        <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
          <i className="fab fa-github text-xl"></i>
        </a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
          <i className="fab fa-linkedin text-xl"></i>
        </a>
        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
          <i className="fab fa-twitter text-xl"></i>
        </a>
    </div>
    </div>
</div>
    </div>
  ):null
}

export default NowPlayer
