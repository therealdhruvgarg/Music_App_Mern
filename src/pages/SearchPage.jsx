import React, { useEffect, useState } from 'react';
import { Search } from '../components/Search.jsx';
import { Items } from '../components/Items.jsx';
import { getItems } from '../Services/api-client.js';
import { Player } from '../components/Player.jsx';
import '../App.css'; // Import your custom styles for this page

export const SearchPage = () => {
  const [allItems, setItems] = useState([]);
  const [flag, setFlag] = useState(false);
  const [item, setItem] = useState(null);

  const loadItems = async () => {
    setItems(await getItems('latest Items'));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const togglePlayer = (flag, itemarg) => {
    setItem(itemarg);
    setFlag(flag);
  };

  const getName = async (Name) => {
    setItems(await getItems(Name));
  };

  return (
    <div className='search-page-container'>
      <header className='header'>
        <h1 className='spotify-heading'>
          <a href='index.html'>Spotify</a>
        </h1>
        <button className='btn btn-primary'>Login</button>
      </header>


      <Search fn={getName} />
      <Items fn={togglePlayer} allItems={allItems} />

      {flag && (
        <div className='player-container'>
          <Player fn={togglePlayer} item={item} />
        </div>
      )}
    </div>
  );
};
