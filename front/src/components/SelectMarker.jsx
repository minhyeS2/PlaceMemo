import React from 'react'
import icon1 from '../assets/icon-1.png';
import icon2 from '../assets/icon-2.png';
import icon3 from '../assets/icon-3.png';
import icon4 from '../assets/icon-4.png';

const iconOptions = [icon1, icon2, icon3, icon4];
const SelectMarker = ( {detail, selected, onSelect} ) => {
    const token = localStorage.getItem('token');

    const changeIconHandle = async() => {
        try {
            const response = await fetch(`http://localhost:8081/icon`, {
                method: 'POST',
                                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    placeId: detail.id,
                    placeUrl: selected,
                })
            });

            const data = await response.json();
            alert(data.message);
            
        } catch (error) {
            console.error(error);
            alert('Error');
        }y
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