import React, { useEffect, useState } from 'react';

const MemoList = ({ detail, refreshTrigger }) => {
    const token = localStorage.getItem('token');
    const placeId = detail?.id;

    const [memos, setMemos] = useState([]);

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
            console.log('Fetched memos:', data);
        } catch (error) {
            console.error(error);
            alert('メモ取得エラー');
        }
    };

    const deleteMemoHandle = async (pk) => {
        try {
            const response = await fetch(`http://localhost:8081/memos/${pk}`, {  // RESTful URL
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('削除に失敗しました');
            }

            alert('メモを削除しました');
            fetchMemo();  // 삭제 후 목록 갱신
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
            <h4>保存されたメモ</h4>
            {memos.length === 0 ? (
                <p>メモがありません。</p>
            ) : (
                <div>
                    {memos.map((memo) => (
                        <div key={memo.pk} style={{ marginBottom: '1em' }}>
                            <div>{memo.memoText}</div>
                            <div style={{ fontSize: '0.8em', color: '#555' }}>
                                {new Date(memo.createdAt).toLocaleString()}
                            </div>
                            <div>
                                <button>修正</button>
                                <button onClick={() => deleteMemoHandle(memo.pk)}>削除</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MemoList;
