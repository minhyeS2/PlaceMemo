import React from 'react';
import './selectMarker.css';

const iconBaseUrl = window.location.origin;
const iconOptions = [
    iconBaseUrl + '/marker_icons/icon1.png',
    iconBaseUrl + '/marker_icons/icon2.png',
    iconBaseUrl + '/marker_icons/icon3.png',
    iconBaseUrl + '/marker_icons/icon4.png',
];

const SelectMarker = ({ onSelect, selected, readOnly = false }) => {
    return (
        <div className='marker-total'>
            {iconOptions.map((icon, idx) => (
                <div className='marker-icon' key={icon}>
                    <img
                        src={icon}
                        className={selected === icon ? 'selected' : ''}
                        onClick={() => {
                            console.log('아이콘 클릭:', icon);
                            if (readOnly) return;
                            if (selected === icon) {
                                onSelect(null);
                            } else {
                                onSelect(icon);
                            }
                        }}
                        style={{
                            cursor: readOnly ? 'default' : 'pointer',
                            opacity: readOnly && selected !== icon ? 0.4 : 1,
                        }}
                        alt={`icon-${idx}`}
                    />
                </div>
            ))}
        </div>
    );
};


export default SelectMarker;
