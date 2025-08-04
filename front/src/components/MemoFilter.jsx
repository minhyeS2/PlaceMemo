import React, { useContext } from 'react';
import { MemoContext } from './MemoContext';
import './memoFilter.css';

const iconBaseUrl = window.location.origin;
const iconOptions = [
    iconBaseUrl + '/marker_icons/icon1.png',
    iconBaseUrl + '/marker_icons/icon2.png',
    iconBaseUrl + '/marker_icons/icon3.png',
    iconBaseUrl + '/marker_icons/icon4.png',
];

const sorts = ['新しい順', '古い順'];
const tags = ['#定番', '#再訪', '#記憶', '#景色良し', '#偶然', '#一人向き', '#混雑', '#不満'];

const MemoFilter = () => {
    const token = sessionStorage.getItem('token');

    const {
        fetchMemo,
        setMemos,
        selectedSort,
        setSelectedSort,
        selectedFilter,
        setSelectedFilter,
        selectedSortedMarker,
        setSelectedSortedMarker,
    } = useContext(MemoContext);

    const sortedMemosWithMarkers = async (iconUrl) => {
        try {
            const response = await fetch(`http://localhost:8081/marker-sorted?iconUrl=${encodeURIComponent(iconUrl)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch');
            const markerData = await response.json();
            setMemos(markerData);
        } catch (error) {
            console.error(error);
            alert('メモ取得エラー');
        }
    };

    return (
        <div className="filter-total">
            <div className='filter'>
                <div
                    className={selectedFilter === 'sort-f' ? 'active-f' : 'sort-f'}
                    onClick={() => setSelectedFilter('sort-f')}
                    style={{ position: 'relative' }}
                >
                    並び順
                </div>
                <div
                    className={selectedFilter === 'markers-f' ? 'active-f' : 'markers-f'}
                    onClick={() => setSelectedFilter('markers-f')}
                >
                    マーカー
                </div>
                <div
                    className={selectedFilter === 'tags-f' ? 'active-f' : 'tags-f'}
                    onClick={() => setSelectedFilter('tags-f')}
                >
                    タグ
                </div>
            </div>
            <div className='filter-menu'>
                {selectedFilter === 'sort-f' && (
                    <div className="sort-menu">
                        {sorts.map((sort, index) => {
                            const sortValue = sort === '新しい順' ? 'newest' : 'oldest';
                            return (
                                <span
                                    key={index}
                                    className={`sort-item ${selectedSort === sortValue ? 'active-sort' : ''}`}
                                    onClick={() => setSelectedSort(sortValue)}
                                >
                                    {sort}
                                </span>
                            );
                        })}
                    </div>
                )}
                {selectedFilter === 'markers-f' && (
                    <div className='markers-menu'>
                        {iconOptions.map((icon, idx) => (
                            <img
                                key={idx}
                                src={icon}
                                alt={`marker-${idx}`}
                                className={selectedSortedMarker === icon ? 'selected' : ''}
                                onClick={() => {
                                    if (selectedSortedMarker === icon) {
                                        // 이미 선택된 마커 → 해제
                                        setSelectedSortedMarker(null);
                                        fetchMemo();
                                    } else {
                                        setSelectedSortedMarker(icon);
                                        sortedMemosWithMarkers(icon);
                                    }
                                }}
                                style={{ cursor: 'pointer' }}
                            />
                        ))}
                    </div>
                )}
                {selectedFilter === 'tags-f' && (
                    <div className="tags-menu">
                        {tags.map((tag, index) => (
                            <span key={index} className="tag-item">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemoFilter;
