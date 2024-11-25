import React from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';

export default function StarRating({rating}) {
  const fullStar = <FaStar />;
  const halfStar = <FaStarHalfAlt />; 
  const emptyStar = <AiOutlineStar />; 

  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const stars = [
    ...Array(fullStars).fill(fullStar),
    ...Array(halfStars).fill(halfStar),
    ...Array(emptyStars).fill(emptyStar),
    ];


    return (
      <div style={{ fontSize: '20px', color: '#FFD700', display: 'flex', flexDirection: 'row' }}>
        {stars.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      </div>
    );
}
