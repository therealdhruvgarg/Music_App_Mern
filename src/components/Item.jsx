import React, { useState } from 'react';
import '../App.css'; // Import your custom styles for the item

export const Item = ({ fn, item }) => {
  const [playerFlag, setPlayerFlag] = useState(false);

  const showPlayer = () => {
    fn(true, item);
  };

  return (
    <div className="card">
      <img src={item.artworkUrl100} className="card-img-top" alt="Album Artwork" />
      <div className="card-body">
        <h5 className="card-title">{item.trackName}</h5>
        <p className="card-text">{item.artistName}</p>
        <button onClick={showPlayer} className="btn btn-primary">
          Play Song
        </button>
      </div>
    </div>
  );
};
