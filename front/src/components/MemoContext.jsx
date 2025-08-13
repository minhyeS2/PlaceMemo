// MemoContext.jsx
import React, { createContext, useState, useMemo } from 'react';

export const MemoContext = createContext();

export const MemoProvider = ({ children }) => {
    const [memos, setMemos] = useState([]);
    const [selectedSort, setSelectedSort] = useState('newest');
    const [selectedFilter, setSelectedFilter] = useState('sort-f');
    const [selectedSortedMarker, setSelectedSortedMarker] = useState(null);
    const [selectedSortedTags, setSelectedSortedTags] = useState([]);
    const [placeMemosFilter, setPlaceMemosFilter] = useState(null);

    const fetchMemo = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8081/memos`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('メモの取得に失敗しました');
            }

            const data = await response.json();
            setMemos(data);
        } catch (error) {
            console.error(error);
            alert('メモ取得エラー');
        }
    };

    const fetchMemoByPlaceId = async (placeId) => {
        const token = sessionStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8081/memos/place/${placeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('メモの取得に失敗しました');
            }

            const data = await response.json();
            setMemos(data);
            setPlaceMemosFilter(placeId);

        } catch (error) {
            console.error(error);
            alert('メモ取得エラー');
        }


    };



    const sortedMemos = useMemo(() => {
        return [...memos].sort((a, b) => {
            if (selectedSort === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (selectedSort === 'oldest') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else {
                return 0;
            }
        });
    }, [memos, selectedSort]);

    return (
        <MemoContext.Provider
            value={{
                fetchMemo,
                memos, setMemos,
                selectedSort, setSelectedSort,
                sortedMemos, 
                selectedFilter, setSelectedFilter, 
                selectedSortedMarker, setSelectedSortedMarker,
                selectedSortedTags, setSelectedSortedTags,
                fetchMemoByPlaceId,
                placeMemosFilter, setPlaceMemosFilter
            }}
        >
            {children}
        </MemoContext.Provider>
    );
};
