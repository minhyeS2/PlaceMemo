import './memo.css';

import React, { useState } from 'react';
import SelectMarker from './SelectMarker';
import MemoTag from './MemoTag';

const Memo = ({ detail, onMemoAdded, selectedIcon, setSelectedIcon }) => {
    const token = localStorage.getItem('token');

    const [memoText, setMemoText] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const memoHandle = async () => {
        try {
            const response = await fetch('http://localhost:8081/creatememo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    memoText: memoText,
                    tags : selectedTags,
                    placeId: detail.id,
                    placeName: detail.displayName,
                    iconUrl : selectedIcon,
                    placeLat: detail.Dg.location.lat,
                    placeLng: detail.Dg.location.lng,
                    placeAddress: detail.formattedAddress,
                    placeStatus: detail.businessStatus
                })
            });
            const data = await response.json();
            alert(data.message);
            setMemoText('');
            onMemoAdded();

        } catch (error) {
            console.error(error);
            alert('Error');
        }
    };




    return (
        <div className="memo-add-total">
            <div className="memo-add-title"><span>MEMO</span></div>

            <SelectMarker
                detail={detail}
                onSelect={setSelectedIcon}
            />
            <MemoTag 
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />
            <textarea
                className="memo-content"
                value={memoText}
                onChange={(e) => setMemoText(e.target.value)}
                placeholder="メモを入力してください"
            />

            <button className="memo-add-btn" onClick={memoHandle}>
                保存
            </button>
        </div>
    )
}

export default Memo