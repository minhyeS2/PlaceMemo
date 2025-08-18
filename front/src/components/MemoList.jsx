import React, { useEffect, useContext } from 'react';
import './memoList.css';
import { MemoContext } from './MemoContext';



const MemoList = ({ refreshTrigger, setIsMemoOpen, fetchDetail }) => {
  const token = sessionStorage.getItem('token');
  const {
    fetchMemo,
    memos,
    sortedMemos,
    placeMemosFilter } = useContext(MemoContext);

  const handleMemoClick = (memo) => {
    fetchDetail(memo.placeId);
    setIsMemoOpen(true);
  };

  useEffect(() => {
    if (token) {
      fetchMemo();
    }

  }, [token, refreshTrigger]);

const displayMemos = placeMemosFilter
    ? memos.filter(m => m.placeId === placeMemosFilter)
    : memos;  // sortedMemos 대신 fetch된 최신 memos 사용

  return (
    <div className="memo-list">
      {displayMemos.length === 0 ? (
        <p className="memo-empty">メモがありません。</p>
      ) : (
        <div className="memo-container">
          {displayMemos.map((memo) => (
            <div key={memo.pk} className="memo-card" onClick={() => handleMemoClick(memo)}>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoList;
