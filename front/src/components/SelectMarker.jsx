import React from 'react'

const iconBaseUrl = window.location.origin; // 현재 로컬 주소
const iconOptions = [
  iconBaseUrl + '/marker_icons/icon1.png',
  iconBaseUrl + '/marker_icons/icon2.png',
  iconBaseUrl + '/marker_icons/icon3.png',
  iconBaseUrl + '/marker_icons/icon4.png',
];

const SelectMarker = ( {detail, selected, onSelect} ) => {
    console.log(detail);


    const changeIconHandle = async() => {
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
        <div>
            {iconOptions.map((icon) => (
                <div key={icon}>
                    <img
                        src={icon}
                        style={{
                            width: "40px",
                            border: selected === icon ? "2px solid blue" : "1px solid gray",
                            cursor: "pointer"}}
                        onClick={() => onSelect(icon)}
                    />
                </div>
            ))}
            <button onClick={() => changeIconHandle()}>変更</button>
        </div>
    )
}

export default SelectMarker