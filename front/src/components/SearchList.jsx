import React from 'react'

const SearchList = ({ keyword, onChangeKeyword, onSearch, markers }) => {
    return (
        <div>
            <div className='list-total'>
                <div className='search-total'>
                    <input className='search-box'
                        type='text'
                        value={keyword}
                        onChange={onChangeKeyword}
                        placeholder='キーワードを入力してください！'
                    ></input>
                    <button className='search-btn'
                        onClick={onSearch}
                    >Search</button>
                </div>
                <div className='list-box'>
                    {markers.map((marker) => (
                        <div className='list-info'
                            key={marker.placeId}
                            onClick={() => {
                                console.log("Clicked: ", marker.placeId); // ✅;
                            }}>
                            <div className='store-name'>
                                <span>{marker.name}</span>
                            </div>
                            <div className='store-star'>
                                <div><span>{marker.rating !== undefined ? marker.rating : '評価なし'}</span></div>
                                <div><span>{marker.ratingCnt ? `${marker.ratingCnt}件` : ''}</span></div>
                            </div>
                            <div className='store-adr'>
                                <div><span>{marker.address}</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchList