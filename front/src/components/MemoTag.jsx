import React from 'react';
import './MemoTag.css';

const tags = ['#定番', '#再訪', '#記憶', '#景色良し', '#偶然', '#一人向き', '#混雑', '#不満'];

const MemoTag = ({ selectedTags, setSelectedTags, readOnly = false }) => {
  const toggleTag = (tag) => {
    if (readOnly) return; // 읽기 전용일 때 클릭 무시

    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length >= 5) {
        alert('タグは最大5個まで選択できます');
        return;
      }
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="tag-total">
      {tags.map((tag) => (
        <div
          key={tag}
          className={`clickable ${selectedTags.includes(tag) ? 'active' : ''}`}
          onClick={() => toggleTag(tag)}
          style={{
            cursor: readOnly ? 'default' : 'pointer',
            opacity: readOnly && !selectedTags.includes(tag) ? 0.5 : 1,
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default MemoTag;
