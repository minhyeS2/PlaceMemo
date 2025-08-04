import './memoList.css';

import React, { useEffect, useState } from 'react';


const iconBaseUrl = window.location.origin;
const iconOptions = [
    iconBaseUrl + '/marker_icons/icon1.png',
    iconBaseUrl + '/marker_icons/icon2.png',
    iconBaseUrl + '/marker_icons/icon3.png',
    iconBaseUrl + '/marker_icons/icon4.png',
];
const sorts = ['新しい順', '古い順'];
const tags = ['#定番', '#再訪', '#記憶', '#景色良し', '#偶然', '#一人向き', '#混雑', '#不満'];


const MemoList = ({ detail, refreshTrigger, setIsMemoOpen, fetchDetail, memos, setMemos }) => {
  const token = sessionStorage.getItem('token');
  const placeId = detail?.id;

  const [selectedFilter, setSelectedFilter] = useState('sort-f');
  const [selectedSort, setSelectedSort] = useState('newest');

  const fetchMemo = async () => {
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

  const handleMemoClick = (memo) => {
    fetchDetail(memo.placeId);
    setIsMemoOpen(true);
  };

  // 메모 정렬
  const sortedMemos = [...memos].sort((a, b) => {
    if (selectedSort === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (selectedSort === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return 0; // 기본 정렬 (변경 필요시 추가)
    }
  });


  useEffect(() => {
    if (token) {
      fetchMemo();
    }
  }, [token, refreshTrigger]);

  return (
    <div className="memo-list">
      {memos.length === 0 ? (
        <p className="memo-empty">メモがありません。</p>
      ) : (
        <>
          <div className='filter'>
            <div
              className={selectedFilter === 'sort-f' ? 'active-f' : 'sort-f'}
              onClick={() => setSelectedFilter('sort-f')}
              style={{ position: 'relative' }}  // 드롭다운 위치 기준을 위해 추가
            >
              並び順
            </div>
            <div className={selectedFilter === 'markers-f' ? 'active-f' : 'markers-f'}
              onClick={() => setSelectedFilter('markers-f')}>マーカー</div>
            <div className={selectedFilter === 'tags-f' ? 'active-f' : 'tags-f'}
              onClick={() => setSelectedFilter('tags-f')}>タグ</div>
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
                {iconOptions.map((icon, index) => (
                  <img src={icon}/>
                ))}
              </div>
            )}
            {selectedFilter === 'tags-f' && (
              <div className="tags-menu">
                {tags.map((tag, index) => (
                  <span key={index} className="tag-item">{tag}</span>
                ))}
              </div>
            )}
          </div>
          <div className="memo-container">
            {sortedMemos.map((memo) => (
              <div key={memo.pk} className="memo-card" onClick={() => handleMemoClick(memo)}>
                <>
                  <div className="memo-date">
                    {new Date(memo.createdAt).toLocaleString()}
                  </div>
                  <div className='memo-marker-pname'>
                    {memo.iconUrl && (
                      <img className='memo-marker' src={memo.iconUrl} />
                    )}
                    <div className='memo-place-name'>{memo.placeName}</div>
                  </div>
                  <div className="memo-text">{memo.memoText}</div>
                  <div className='memo-tags'>
                    {memo.tags.join(' ')}
                  </div>
                </>
              </div>
            ))}
          </div>
        </>
      )}
    </div>

  );
};

export default MemoList;
