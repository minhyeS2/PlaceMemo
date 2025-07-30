import './memo.css';
import React, { useState, useEffect } from 'react';
import SelectMarker from './SelectMarker';
import MemoTag from './MemoTag';

const Memo = ({ detail, onMemoAdded, selectedIcon, setSelectedIcon, refreshTrigger, onMemoUpdated, onMemoDeleted }) => {
  const token = localStorage.getItem('token');

  const [memoText, setMemoText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [memos, setMemos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // memos 중에서 현재 장소에 해당하는 메모 찾기
  const savedMemo = memos.find((m) => m.placeId === detail.id);

  // 메모 불러오기
  const fetchMemo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8081/memos`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('メモの取得に失敗しました');
      const data = await response.json();
      setMemos(data);
    } catch (error) {
      console.error(error);
      alert('メモ取得エラー');
    } finally {
      setLoading(false);
    }
  };

  // 새 메모 추가 핸들러
  const memoAddHandle = async () => {
    try {
      const response = await fetch('http://localhost:8081/creatememo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          memoText,
          iconUrl: selectedIcon,
          tags: selectedTags,
          placeId: detail.id,
          placeName: detail.displayName,
          placeLat: detail.Dg.location.lat,
          placeLng: detail.Dg.location.lng,
          placeAddress: detail.formattedAddress,
          placeStatus: detail.businessStatus,
        }),
      });
      const data = await response.json();
      alert(data.message);
      setMemoText('');
      onMemoAdded();
      setIsEditing(false);
      fetchMemo();
    } catch (error) {
      console.error(error);
      alert('Error');
    }
  };

  // 메모 삭제 핸들러
  const deleteMemoHandle = async (pk) => {
    console.log(pk)
    try {
      const response = await fetch(`http://localhost:8081/memo-d/${pk}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('削除に失敗しました');
      
      const data = await response.json();
      onMemoDeleted?.(pk);
      
      alert(data.message);
      fetchMemo();
    } catch (error) {
      alert('Error');
      console.error(error);
    }
  };

  // 메모 수정 핸들러
  const updateMemo = async (pk) => {
    try {
      const response = await fetch(`http://localhost:8081/memo-u/${pk}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          memoText,
          iconUrl: selectedIcon, 
          tags: selectedTags, 
          placeId: detail.id,
          // placeName: detail.displayName,
          // placeLat: detail.Dg.location.lat,
          // placeLng: detail.Dg.location.lng,
          // placeAddress: detail.formattedAddress,
          // placeStatus: detail.businessStatus,
        }),
      });

      if (!response.ok) {

        throw new Error('修正に失敗しました');
  
      } else if (response.ok) {

        const updatedMemo = await response.json(); // ← 변경된 memo 반환되도록 백엔드 설정해줘야 함
        onMemoUpdated?.(updatedMemo);
        setIsEditing(false);
        fetchMemo();
        alert('メモを修正しました');
      }
    } catch (error) {
      alert('Error');
      console.error(error);
    }
  };

  // memos 불러오기 & 저장된 메모 변경 시 상태 업데이트
  useEffect(() => {
    fetchMemo();
  }, [token, refreshTrigger]);

  // savedMemo나 memos 변경 시 상태 초기화/세팅
  useEffect(() => {
    if (loading) return; // 로딩 중에는 처리하지 않음

    if (!savedMemo) {
      // 저장된 메모 없으면 작성 모드, 상태 초기화
      setSelectedIcon('');
      setSelectedTags([]);
      setMemoText('');
      setIsEditing(true);
    } else {
      // 저장된 메모 있으면 읽기 모드 + 상태 세팅
      setSelectedIcon(savedMemo.iconUrl || '');
      setSelectedTags(savedMemo.tags || []);
      setMemoText(savedMemo.memoText || '');
      setIsEditing(false);
    }
  }, [savedMemo, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="memo-add-total">
      <div className="memo-add-title"><span>MEMO</span></div>

      {(!savedMemo || isEditing) ? (
        <>
          <SelectMarker
            detail={detail}
            selected={selectedIcon}
            onSelect={setSelectedIcon}
          />
          <MemoTag
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
          <textarea
            className="memo-content"
            value={memoText}
            onChange={(e) => setMemoText(e.target.value)}
            placeholder="メモを入力してください"
          />
          {savedMemo ? (
            <div className="memo-button-group">
              <button className="memo-btn memo-save" onClick={() => updateMemo(savedMemo.pk)}>保存</button>
              <button className="memo-btn memo-cancel" onClick={() => setIsEditing(false)}>キャンセル</button>
            </div>
          ) : (
            <button className="memo-add-btn" onClick={memoAddHandle}>保存</button>
          )}
        </>
      ) : (
        <>
          <SelectMarker selected={savedMemo.iconUrl} readOnly={true} />
          <MemoTag selectedTags={savedMemo.tags} readOnly={true} />
          <div className="memo-text-view">{savedMemo.memoText}</div>
          <div className="memo-button-group">
            <button
              className="memo-btn memo-edit"
              onClick={() => {
                setIsEditing(true);
                setMemoText(savedMemo.memoText);
                setSelectedTags(savedMemo.tags || []);
                setSelectedIcon(savedMemo.iconUrl || '');
              }}
            >
              修正
            </button>
            <button className="memo-btn memo-delete" onClick={() => deleteMemoHandle(savedMemo.pk)}>削除</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Memo;
