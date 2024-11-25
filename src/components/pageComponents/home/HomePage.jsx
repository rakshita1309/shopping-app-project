'use client';

import React from 'react';
import { observer } from 'mobx-react';
import ItemStore from '../../../stores/Items/ItemStore';
import ItemCard from '../../common/ItemCards.jsx';

function HomePage(props) {
  let items = ItemStore.items;
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: '16px',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      <div 
      className='banner'
      style={{
        width: '100%',
        height: 'auto',
        justifyContent : 'center',
      }}>
        <img 
        style={{
          width: '80%', 
          height: '250px'
        }} 
        src='https://img.freepik.com/premium-vector/spring-sale-banner-design-with-flowers-leaves-seasonal-business-promotion-design-vector-illustration_500223-1330.jpg'
        />
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '36px',
          justifyContent: 'center',

        }}
      >
        {
          items.map((item) => {
            return (
              <ItemCard id={item.id} key={item.id} />
            )
          })
        }
      </div>
    </div>
  )
}

export default observer(HomePage);