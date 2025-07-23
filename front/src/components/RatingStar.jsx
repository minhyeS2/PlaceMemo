import './ratingStar.css';
import React from 'react'

const RatingStar = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const HalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (HalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className="star full">★</span>);
  }

  if (HalfStar) {
    stars.push(<span key="half" className="star half">☆</span>);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
  }



  return (
    <div className="star-rating">{stars}</div>
  )
}

export default RatingStar