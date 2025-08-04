import React, { useEffect, useContext } from 'react';
import './memoList.css';
import { MemoContext } from './MemoContext';



const MemoList = ({ refreshTrigger, setIsMemoOpen, fetchDetail }) => {
  const token = sessionStorage.getItem('token');
  const { 
    memos,
    setMemos, 
    sortedMemos } = useContext(MemoContext);

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
      )}
    </div>

  );
};

export default MemoList;
