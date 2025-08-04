// MemoContext.jsx
import React, { createContext, useState, useMemo } from 'react';

export const MemoContext = createContext();

export const MemoProvider = ({ children }) => {
  const [memos, setMemos] = useState([]);
  const [selectedSort, setSelectedSort] = useState('newest');
  const [selectedFilter, setSelectedFilter] = useState('sort-f');
  const [selectedSortedMarker, setSelectedSortedMarker] = useState(null);

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
        memos,
        setMemos,
        selectedSort,
        setSelectedSort,
        selectedFilter,
        setSelectedFilter,
        selectedSortedMarker,
        setSelectedSortedMarker,
        sortedMemos,
      }}
    >
      {children}
    </MemoContext.Provider>
  );
};
