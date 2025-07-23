import React, { useState } from 'react';
import './selectMarker.css';

const iconBaseUrl = window.location.origin;
const iconOptions = [
  iconBaseUrl + '/marker_icons/icon1.png',
  iconBaseUrl + '/marker_icons/icon2.png',
  iconBaseUrl + '/marker_icons/icon3.png',
  iconBaseUrl + '/marker_icons/icon4.png',
];

const SelectMarker = ({ detail, selected, onSelect }) => {
    const [selectedImgIdx, setSelectedImgIdx] = useState(null);

    const changeIconHandle = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8081/savedicon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    placeId: detail.id,
                    iconUrl: selected,
                    placeLat: detail.Dg.location.lat,
                    placeLng: detail.Dg.location.lng,
                    placeName: detail.displayName,
                    placeAddress: detail.formattedAddress,
                    placeStatus: detail.businessStatus
                })
            });

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error(error);
            alert('Error');
        }
    };

    return (
        <div className='marker-total'>
            {iconOptions.map((icon, idx) => (
                <div className='marker-icon' key={icon}>
                    <img
                        src={icon}
                        className={selectedImgIdx === idx ? 'selected' : ''}
                        onClick={() => {
                            setSelectedImgIdx(idx);
                            onSelect(icon);
                        }}
                        alt={`icon-${idx}`}
                    />
                </div>
            ))}
            <button
                className='marker-btn'
                onClick={changeIconHandle}
            >
                変更
            </button>
        </div>
    );
};

export default SelectMarker;
