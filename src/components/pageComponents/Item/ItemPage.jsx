'use client';

import React, { useState } from 'react';
import { observer } from 'mobx-react';

import ItemStore from '../../../stores/Items/ItemStore';
import { FaRegHeart, FaShoppingCart, FaRegStar } from "react-icons/fa";

import StarRating from '../../common/StarRating';


const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};


function ItemPage(props) {
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  let item = ItemStore.allItems[props.itemId];

  if (!item) {
    return null;
  }

  let pictures = item?.colors?.length ? item?.pictures[item.colors[0]] : item?.pictures;

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: '8px',
        flexWrap: 'wrap'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '50px',
        flexWrap: 'wrap',
        padding: '50px',
      }}
      >
        <div style={{
          display: 'flex',
          flex: 1,
          width: '60%',
          flexWrap: 'wrap',
          gap: '16px',
          minWidth: '430px',
          overflow: 'auto',
          maxHeight: '100%',
        }}
        >
          {
            pictures?.map((item) => {
              return (<img
                key={item}
                src={item}
                alt={'image'}
                style={{
                  width: '400px',
                  height: '400px',
                  display: 'block',
                }}
              />);
            })
          }
        </div>
        <div
          style={{
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'flex-start'
          }}
        >
          <div style={{ fontSize: '28px' }}>
            {item?.name.toUpperCase()}
          </div>
          <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px'
          }}
          >
            <div> 
              <StarRating rating={item.rating}/>
            </div>
            <div>{item.rating}/5</div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '24px',
            width: '100%',
          }}>
            <div style={{fontSize:'24px'}}>Rs.{item?.price}</div>
            <div style={{ color: '#ff3e6c' }}>
              Inclusive of all taxes
            </div>
          </div>
          <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap:'36px'
          }}
          >
          <div
            style={{
              display: 'flex',
              gap: '24px',
              width: '100%'
            }}
          >
            <button
              onClick={() => {
                setCartLoading(true);
                setTimeout(() => {
                  ItemStore.addItemToCart(props.itemId);
                  setCartLoading(false);
                }, 1000);
              }}
            >
              <div className='loader-container'>
                {cartLoading ? <Loader /> :
                <div
                style={{
                  display: 'flex', 
                  flexDirection: 'row', 
                  gap:'8px', 
                  border: '0.5px solid #ff3e6c', 
                  borderRadius: '8px',
                  width:'100%',
                  backgroundColor: '#ff3e6c',
                  color: 'white',
                  padding: '12px',
                  alignItems: 'center'
                }}
                >
                  <div> <FaShoppingCart fontSize={24} /></div>
                  <div style={{fontSize:'16px'}}>Add to cart</div>
                </div>
                }
              </div>
            </button>
            <button
              onClick={() => {
                setWishlistLoading(true);

                setTimeout(() => {
                  ItemStore.addItemToWishList(props.itemId);
                  setWishlistLoading(false);
                }, 1000);
              }}
            >
              <div>
                {wishlistLoading ? <Loader /> : 
                <div
                style={{
                  display: 'flex', 
                  flexDirection: 'row', 
                  gap:'8px', 
                  border: '0.5px solid grey', 
                  borderRadius: '8px',
                  width:'100%',
                  padding: '12px',
                  alignItems: 'center'
                }}
                >
                  <div><FaRegHeart fontSize={24} /></div>
                  <div style={{fontSize:'16px'}}>Add to Wishlist</div>
                </div>
                }
              </div>
            </button>
          </div>
          </div>


        </div>
      </div>

    </div>
  )
}

export default observer(ItemPage);