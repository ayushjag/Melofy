import React, { useContext } from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import { PlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext)

  return (
    <>
      <Navbar />
      <div className="p-6 md:p-10 bg-gradient-to-b from-gray-900 via-black to-black min-h-screen text-white">
        {/* Featured Albums */}
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-4">🎵 Featured Charts</h1>
          <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 pb-4">
            {albumsData.map((item, index) => (
              <AlbumItem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item._id}
                image={item.image}
              />
            ))}
          </div>
        </section>

        {/* Popular Songs */}
        <section>
          <h1 className="text-3xl font-bold mb-4">🔥 Today's Biggest Hits</h1>
          <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 pb-4">
            {songsData.map((item, index) => (
              <SongItem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item._id}
                image={item.image}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default DisplayHome
