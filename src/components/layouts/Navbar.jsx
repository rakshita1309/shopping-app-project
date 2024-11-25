'use client';

import React from "react";
import { observer } from "mobx-react";
import { useRouter } from 'next/navigation';
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";

import ItemStore from '../../stores/Items/ItemStore';


function Navbar(props) {
  const router = useRouter();

  let cartItems = ItemStore.cartItems;
  let wishListItems = ItemStore.wishListItems;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1,
        flexWrap: 'wrap',
        gap: '20px',
        minHeight: '56px',
        alignItems: 'center',
        padding: '24px',
        marginBottom: '8px',
        boxShadow: '0 4px 12px 0 rgba(0,0,0, .05)',
      }}
    >
      <button
        onClick={() => {
          router.push('/');
        }}
      >
        <span
          style={{
            fontSize: '16px',
            fontWeight: '500',
          }}
        >Clothora</span>
      </button>
      <div
        style={{
          display: 'flex',
          gap: '16px'
        }}
      >
        <button
          onClick={() => {
            router.push('/wishlist');
          }}
        >
          <div
            style={{
              position: 'relative'
            }}

          >
            <FaRegHeart fontSize={24} />
            {wishListItems.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-14px',
                  width: '14px',
                  height: '14px',
                  border: '1px solid red',
                  color: 'white',
                  background: 'red',
                  fontSize: '8px',
                  borderRadius: '12px'
                }}
              >
                {wishListItems.length}
              </span>
            )}
          </div>
        </button>
        <button
          onClick={() => {
            router.push('/cart');
          }}
        >
          <div
            style={{
              position: 'relative'
            }}
          >
            <FaShoppingCart fontSize={24} />
            {cartItems.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-14px',
                  width: '14px',
                  height: '14px',
                  border: '1px solid red',
                  color: 'white',
                  background: 'red',
                  fontSize: '8px',
                  borderRadius: '12px'
                }}
              >
                {cartItems.length}
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}

export default observer(Navbar);