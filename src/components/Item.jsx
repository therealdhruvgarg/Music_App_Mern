import React from "react";
import "../App.css"

export const Item = ({ fn, item, isActive }) => {
  const showPlayer = () => {
    fn(true, item);
  };

  return (
    <div className={`row item-container ${isActive ? 'active-item' : ''}`}>
      <div className="col-4 item-image">
        <img src={item.artworkUrl100} alt="Album Artwork" />
      </div>
      <div className="col-4 item-details">
        <p>{item.artistName}</p>
        <p>{item.trackName}</p>
      </div>
      <div className="col-4 item-play-button">
        <button onClick={showPlayer} className="btn btn-primary">
          Play Song
        </button>
      </div>
    </div>
  );
};
