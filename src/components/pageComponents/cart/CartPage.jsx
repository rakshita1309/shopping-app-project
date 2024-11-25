'use client';

import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/navigation';
import ItemStore from '../../../stores/Items/ItemStore';
import CartItem from './CartItem';
import { PiEmptyDuotone } from "react-icons/pi";

function CartPage() {
  const [couponCode, setCouponCode] = useState('SAVE10');
  const [appliedDiscount, setAppliedDiscount] = useState(0.1);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  let cartItems = ItemStore.cartItems;

  if (!cartItems || cartItems.length < 1) {
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
        <span>No items added in cart</span>
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


  // Calculate discount based on coupon code
  const validCoupons = {
    SAVE10: 0.1, // 10% discount
    SAVE20: 0.2, // 20% discount
    SUMMER15: 0.15, // 15% discount
  };

  const handleApplyCoupon = () => {
    const discount = validCoupons[couponCode?.toUpperCase()];

    if (discount) {
      setAppliedDiscount(discount);
      setErrorMessage('');
    } else {
      setAppliedDiscount(0);
      setErrorMessage('Invalid coupon code.');
    }
  };


  let totalPrice = 0;
  cartItems.forEach((item) => {
    let itemPrice = ItemStore.allItems[item]?.price;

    totalPrice += itemPrice;
  });

  let discountAmount = totalPrice * appliedDiscount;
  let finalPrice = totalPrice - discountAmount;


  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '32px',
        padding: '16px',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '24px',
          flexDirection: 'column',
          padding: '16px',
          overflow: 'auto',
          maxHeight: '700px'
        }}
      >
        {
          cartItems.map((item) => {
            return <CartItem key={item} itemId={item} />
          })
        }
      </div>
      <div
        style={{
          display: 'flex',
          gap: '24px',
          flexDirection: 'column',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          flex: 1,
          maxWidth: '800px'
        }}
      >
        <span style={{ fontWeight: '500' }} >Pricing Details</span>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Total Price:</span>
          <span>Rs.{totalPrice.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'green' }}>
          <span>Discount: ({appliedDiscount * 100} %)</span>
          <span>-Rs.{discountAmount.toFixed(2)}</span>
        </div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>Final Price:</span>
          <span>Rs.{finalPrice.toFixed(2)}</span>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center'
          }}
        >
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <button
            onClick={handleApplyCoupon}
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#3498db',
              height: '40px',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Apply Coupon
          </button>
        </div>
        {errorMessage && (
          <span style={{ color: 'red', marginTop: '8px' }}>{errorMessage}</span>
        )}
        <button
          onClick={() => alert(`Proceeding to payment for $Rs.{finalPrice.toFixed(2)}`)}
          style={{
            marginTop: '16px',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>

  )
}

export default observer(CartPage);