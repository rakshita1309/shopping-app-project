'use client';

import React from 'react';
import { observer } from 'mobx-react';

import ItemStore from '../../../stores/Items/ItemStore';
import WishListItem from './WishListItem';
import { useRouter } from 'next/navigation';
import { PiEmptyDuotone } from "react-icons/pi";

function WishListPage() {
  const router = useRouter();
  let wishListItems = ItemStore.wishListItems;


  if (!wishListItems || wishListItems.length < 1) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '24px',
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}
      >
        <PiEmptyDuotone fontSize={72} />
        <span>No items added in wishlist</span>
        <button
          onClick={() => {
            router.push('/');
          }}
          style={{
            border: '1px solid black',
            padding: '8px',
            borderRadius: '24px',
            backgroundColor: 'lightGray',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              fontWeight: '500',
            }}
          >Explore items</span>
        </button>
      </div>
    )
  }


  return (
    <div
      style={{
        padding: '16px',
        gap: '16px',
        maxHeight: '800px',
        display: 'flex',
        gap: '24px',
        flexwrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {
        wishListItems.map((item) => {
          return <WishListItem key={item} itemId={item} />
        })
      }
    </div>
  )
}

export default observer(WishListPage);