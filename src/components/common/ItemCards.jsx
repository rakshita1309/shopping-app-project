'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react';
import ItemStore from '../../stores/Items/ItemStore';
import Carousel from './Carousal';
import StarRating from './StarRating';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};


function ItemCard({ id }) {
  const [cartLoading, setCartLoading] = useState(false);
  const router = useRouter();
  const item = ItemStore.allItems[id];

  let pictures = item?.colors?.length ? item?.pictures[item.colors[0]] : item?.pictures;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '24px',
        borderRadius: '8px',
        background: '#edf2f5',
      }}
      onClick={() => {
        const path = `/item/${item.id}`;
        router.push(path);
      }}
    >
      <Carousel
        images={pictures}
        interval={60000}
      />
      <span style={{ fontWeight: '300' }}>
        {item.name.toUpperCase()}
      </span>
      <span>
      <StarRating rating={item.rating}/>
      </span>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexGrow: 1,
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          {item?.colors?.map((color) => {
            return <div key={color} style={{ width: '16px', height: '16px', background: color }} />;
          })}
        </div>
       <div>
       <span>Rs.{item.price}</span>
       </div>
      </div>
      <div
      style={{
        display: 'flex',
        justifyContent:'center'
      }}
      >
        <button 
        style={{
          border: '0.5px solid grey',
           padding: '4px', 
           width: '100%',
           borderRadius: '8px',
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();

            setCartLoading(true);

            setTimeout(() => {
              ItemStore.addItemToCart(id);
              setCartLoading(false);
            }, 1000);
          }}
        >
          { cartLoading ? <Loader /> : 'Add to cart'}
        </button>
      </div>
    </div>
  )
}


export default observer(ItemCard);