import React from 'react';
import { Item } from './Item'; // Import your Item component

export const Items = ({ fn, allItems }) => {
  return (
    <div className='items-container'>
      {allItems.map((currentItem, index) => (
        <Item fn={fn} key={index} item={currentItem} />
      ))}
    </div>
  );
};