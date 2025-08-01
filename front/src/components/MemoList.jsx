import './memoList.css';

import React, { useEffect, useState } from 'react';

const MemoList = ({ detail, refreshTrigger, setIsMemoOpen, fetchDetail }) => {
  const token = localStorage.getItem('token');
  const placeId = detail?.id;

  const [memos, setMemos] = useState([]);
  const [editingPk, setEditingPk] = useState(null);
  const [editedText, setEditedText] = useState('');

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
          {memos.map((memo) => (
            <div key={memo.pk} className="memo-card"
              onClick={() => handleMemoClick(memo)}>
              {editingPk === memo.pk ? (
                <>
                  <textarea
                    className="memo-textarea"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <div className="memo-button-group">
                    <button className="memo-btn memo-save" onClick={() => updateMemo(memo.pk)}>
                      保存
                    </button>
                    <button className="memo-btn memo-cancel" onClick={cancelEditing}>
                      キャンセル
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="memo-date">
                    {new Date(memo.createdAt).toLocaleString()}
                  </div>
                  <div className='memo-marker-pname'>
                    {memo.iconUrl && (
                      <img
                        className='memo-marker'
                        src={memo.iconUrl} />
                    )}
                    <div className='memo-place-name'>{memo.placeName}</div>
                  </div>
                  <div className="memo-text">{memo.memoText}</div>
                  <div className='memo-tags'>
                    {memo.tags.join(' ')}
                  </div>
                  {/* <div className="memo-button-group">
                    <button className="memo-btn memo-edit" onClick={() => startEditing(memo)}>
                      修正
                    </button>
                    <button className="memo-btn memo-delete" onClick={() => deleteMemoHandle(memo.pk)}>
                      削除
                    </button>
                  </div> */}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default MemoList;
