import './searchList.css';

import React from 'react'
import RatingStar from './RatingStar.jsx';

const SearchList = ({ markers, onSelect, isSearchActive }) => {
    return (
        <>
         {isSearchActive && (
            <div className='list-total'>
                <div className='list-box'>
                    {markers.map((marker) => (
                        <div className='list-info'
                            key={marker.placeId}
                            onClick={() => {
                                console.log("Clicked: ", marker.placeId); // ✅
                                onSelect(marker.placeId);
                            }}>
                            <div className='store-name'>
                                <span>{marker.name}</span>
                            </div>
                            <div className='store-rating'>
                                <div className='rating'><span>{marker.rating !== undefined ? marker.rating : '評価なし'}</span></div>
                                <RatingStar rating={marker.rating} />
                                <div className='rating-cnt'><span>{marker.ratingCnt ? `(${marker.ratingCnt}件)` : ''}</span></div>
                            </div>
                            <div className='store-adr'>
                                <div><span>{marker.address}</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </>
    )
}

export default SearchList