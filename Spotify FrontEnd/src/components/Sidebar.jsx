import { React, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();
  const { track, token } = useContext(PlayerContext);

  const AddToPlaylist = async () => {
    try {
      if (!track || !track._id) {
        console.warn("No track selected");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlist/add`,
        { itemId: track._id },
        {
          headers: {
            token: token
          }
        }
      );

      console.log(res.data.message);
    } catch (err) {
      console.error("Failed to add to playlist", err);
    }
  };

  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
      {/* Top Section */}
      <div className='bg-[#121212] h-[15%] rounded-lg flex flex-col justify-around'>
        <div
          onClick={() => navigate("/")}
          className='flex items-center gap-3 pl-8 py-2 cursor-pointer hover:bg-[#1a1a1a] transition'
        >
          <img className='w-6' src={assets.home_icon} alt="home" />
          <p className='font-bold'>Home</p>
        </div>
        <div className='flex items-center gap-3 pl-8 py-2 cursor-pointer hover:bg-[#1a1a1a] transition'>
  <img className='w-6' src={assets.search_icon} alt="search" />
  <p className='font-bold'>Search</p> {/* Removed mb-3 */}
</div>

      </div>

      {/* Bottom Section */}
      <div className='bg-[#121212] h-[85%] rounded-lg mt-2 overflow-y-auto'>
        <div className='p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img className='w-8' src={assets.stack_icon} alt="library" />
            <p className='font-semibold'>Your Library</p>
          </div>
          <div className='flex items-center gap-3'>
            <img
              onClick={() => navigate("/Playlist")}
              className='w-5 cursor-pointer hover:scale-110 transition'
              src={assets.arrow_icon}
              alt="arrow"
            />
            <img
              className='w-5 cursor-pointer hover:scale-110 transition'
              src={assets.plus_icon}
              alt="plus"
            />
          </div>
        </div>

        {/* Playlist Section */}
        {token ? (
          <div className='p-4 bg-[#242424] m-2 rounded-lg font-semibold flex flex-col gap-2'>
            <h1>Add this song to your Playlist</h1>
            <button
              onClick={AddToPlaylist}
              className='px-4 py-1.5 bg-white text-black text-[15px] rounded-full hover:bg-gray-200 transition mt-2'
            >
              Add to Playlist
            </button>
          </div>
        ) : (
          <div className='p-4 bg-[#242424] m-2 rounded-lg font-semibold flex flex-col gap-2'>
            <h1>Create your first playlist</h1>
            <p className='font-light'>It's easy, we'll help you</p>
            <button className='px-4 py-1.5 bg-white text-black text-[15px] rounded-full hover:bg-gray-200 transition mt-2'>
              Create playlist
            </button>
          </div>
        )}

        {/* Remove Playlist or Browse Podcasts */}
        {token ? (
          <div className='p-4 bg-[#242424] m-2 rounded-lg font-semibold flex flex-col gap-2'>
            <h1>Remove this song from your Playlist</h1>
            <button
              onClick={AddToPlaylist}
              className='px-4 py-1.5 bg-white text-black text-[15px] rounded-full hover:bg-gray-200 transition mt-2'
            >
              Remove Playlist
            </button>
          </div>
        ) : (
          <div className='p-4 bg-[#242424] m-2 rounded-lg font-semibold flex flex-col gap-2 mt-4'>
            <h1>Let's find some podcasts to follow</h1>
            <p className='font-light'>We'll keep you updated on new episodes</p>
            <button className='px-4 py-1.5 bg-white text-black text-[15px] rounded-full hover:bg-gray-200 transition mt-2'>
              Browse podcasts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
