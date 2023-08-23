import React from 'react';
import { Item } from './Item'; // Import your Item component

export const Items = ({ fn, allItems }) => {
  if (allItems.length === 0) {
    return (
      <div className='no-items-found'>
    
        <p>No items found.</p>
      </div>
    );
  }

  return (
    <div className='items-container'>
      {allItems.map((currentItem, index) => (
        <Item fn={fn} key={index} item={currentItem} />
      ))}
    </div>
  );
};
