import './memoList.css';

import React, { useEffect, useState } from 'react';

const MemoList = ({ detail, refreshTrigger }) => {
    const token = localStorage.getItem('token');
    const placeId = detail?.id;

    const [memos, setMemos] = useState([]);
    const [editingPk, setEditingPk] = useState(null);
    const [editedText, setEditedText] = useState('');

    const fetchMemo = async () => {
        try {
            const response = await fetch(`http://localhost:8081/memos?placeId=${placeId}`, {
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

    const deleteMemoHandle = async (pk) => {
        try {
            const response = await fetch(`http://localhost:8081/memo-d/${pk}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('削除に失敗しました');

            const data = await response.json();
            alert(data.message);
            fetchMemo();
        } catch (error) {
            alert('Error');
            console.error(error);
        }
    };

    const startEditing = (memo) => {
        setEditingPk(memo.pk);
        setEditedText(memo.memoText);
    };

    const cancelEditing = () => {
        setEditingPk(null);
        setEditedText('');
    };

    const updateMemo = async (pk) => {
        try {
            const response = await fetch(`http://localhost:8081/memo-u/${pk}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    memoText: editedText,
                }),
            });

            if (!response.ok) throw new Error('修正に失敗しました');

            alert('メモを修正しました');
            setEditingPk(null);
            setEditedText('');
            fetchMemo();
        } catch (error) {
            alert('Error');
            console.error(error);
        }
    };

    useEffect(() => {
        if (token && placeId) {
            fetchMemo();
        }
    }, [placeId, token, refreshTrigger]);

    return (
<div className="memo-list">
  <h4 className="memo-title">SAVED MEMO</h4>
  {memos.length === 0 ? (
    <p className="memo-empty">メモがありません。</p>
  ) : (
    <div className="memo-container">
      {memos.map((memo) => (
        <div key={memo.pk} className="memo-card">
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
              <div className="memo-text">{memo.memoText}</div>
              <div className="memo-date">
                {new Date(memo.createdAt).toLocaleString()}
              </div>
              <div className="memo-button-group">
                <button className="memo-btn memo-edit" onClick={() => startEditing(memo)}>
                  修正
                </button>
                <button className="memo-btn memo-delete" onClick={() => deleteMemoHandle(memo.pk)}>
                  削除
                </button>
              </div>
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
