'use client';

import React, { useState } from 'react';

import { observer } from 'mobx-react';

import ItemStore from '../../../stores/Items/ItemStore';
import Carousel from '../../common/Carousal';
import { MdDeleteForever } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};


function WishListItems(props) {
  const [cartLoading, setCartLoading] = useState(false);
  const { itemId } = props;

  let item = ItemStore.allItems[itemId];

  let pictures = item?.colors?.length ? item?.pictures?.[item.colors[0]] : item?.pictures;

  if (!item) {
    return null;
  }

  return (
    <div
    className='wishlistItem'
      style={{
        display: 'flex',
        gap: '32px',
        position: 'relative',
        padding: '16px',
        paddingRight: '40px',
        borderRadius: '24px',
        maxWidth: '600px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        flexwrap: 'wrap',
      }}
    >
      <button
        style={{
          position: 'absolute',
          top: '4px',
          right: '0px',
          padding: '8px',
          borderRadius: '16px'
        }}
        onClick={() => {
          ItemStore.removeItemFromWishList(itemId);
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <MdDeleteForever fontSize={24} color='red' />
        </div>
      </button>
      <div
        style={{
          display: 'flex',
          gap: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flex: '1',
          }}
        >
          <Carousel images={pictures} buttonEnabled={true} />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: '1',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <span>{item?.name}</span>
          <span>Rs.{item?.price}</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            justifyContent: 'flex-start'
          }}
        >
          <button
            onClick={() => {
              setCartLoading(true);
              setTimeout(() => {
                ItemStore.addItemToCart(itemId);

                ItemStore.removeItemFromWishList(itemId);
                setCartLoading(false);
              }, 1000);
            }}
            style={{
              border: '1px solid black',
              padding: '8px',
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '16px',
              width: '200px',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '8px',
              }}
            >
              {cartLoading ? <Loader /> : <FaShoppingCart fontSize={24} />}
              <span> Move to cart</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(WishListItems);