import React from 'react'
import icon1 from '../assets/icon-1.png';
import icon2 from '../assets/icon-2.png';
import icon3 from '../assets/icon-3.png';
import icon4 from '../assets/icon-4.png';

const iconOptions = [icon1, icon2, icon3, icon4];
const SelectMarker = ( {selected, onSelect} ) => {


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
        </div>
    )
}

export default SelectMarker