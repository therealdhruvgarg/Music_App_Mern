import React from 'react';
import "../App.css"
export const Player = ({ fn, item }) => {
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
