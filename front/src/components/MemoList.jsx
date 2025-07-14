import React, { useEffect, useState } from 'react';

const MemoList = ({ detail, refreshTrigger }) => {
    const token = localStorage.getItem('token');
    const placeId = detail.id;

    const [memos, setMemos] = useState([]);

    const fetchMemo = async () => {
        try {
            const response = await fetch(`http://localhost:8081/memos?placeId=${placeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('メモの取得に失敗しました');
            }

            const data = await response.json();
            setMemos(data); // data가 메모 배열이라고 가정
            console.log('Fetched memos:', data);
        } catch (error) {
            console.error(error);
            alert('メモ取得エラー');
        }
    };

    useEffect(() => {
        if (token && placeId) {
            fetchMemo();
        }
    }, [placeId, token, refreshTrigger]);

    return (
        <div className="memo-list">
            <h4>保存されたメモ</h4>
            {memos.length === 0 ? (
                <p>メモがありません。</p>
            ) : (
                <ul>
                    {memos.map((memo, idx) => (
                        <li key={idx}>
                            <div>{memo.memoText}</div>
                            <div style={{ fontSize: '0.8em', color: '#555' }}>
                                {new Date(memo.createdAt).toLocaleString()}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MemoList;
