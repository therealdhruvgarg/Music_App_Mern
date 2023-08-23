// import React from 'react';
// import "../App.css"
// export const Player = ({ fn, item }) => {
//   return (
//     <div className="player-container">
//       <button onClick={() => {
//         fn(false, null);
//       }} className="btn btn-success">Back</button>
//       <div className="song-details">
//         <img src={item?.artworkUrl100} alt="Album Artwork" className="album-artwork" />
//         <p>
//           Singer Name: {item?.artistName}
//         </p>
//       </div>

//       <audio controls className="custom-audio-controls">
//         <source src={item?.previewUrl} type="audio/mp4" />
//       </audio>
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import '../App.css';

export const Player = ({ fn, item }) => {
  const [playerFlag, setPlayerFlag] = useState(false);
  const [currentSong, setCurrentSong] = useState(null); // Track currently playing song

  const showPlayer = () => {
    if (currentSong && currentSong !== item) {
      currentSong.audio.pause(); // Pause previously playing song
    }
    setCurrentSong(item);
    setPlayerFlag(true);
  };

  useEffect(() => {
    if (currentSong) {
      currentSong.audio.addEventListener('ended', () => {
        setPlayerFlag(false); // Automatically close player when song ends
      });
    }
    return () => {
      if (currentSong) {
        currentSong.audio.removeEventListener('ended', () => {});
      }
    };
  }, [currentSong]);

  return (
    <div className="player-container">
          <button onClick={() => {
            fn(false, null);
          }} className="btn btn-success">Back</button>
          <div className="song-details">
            <img src={item?.artworkUrl100} alt="Album Artwork" className="album-artwork" />
            <p>
              Singer Name: {item?.artistName}
            </p>
          </div>
    
          <audio controls className="custom-audio-controls">
            <source src={item?.previewUrl} type="audio/mp4" />
          </audio>
        </div>
  );
};
