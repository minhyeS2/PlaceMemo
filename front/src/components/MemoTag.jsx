import React, { useState } from 'react';
import './MemoTag.css';

const tags = ['#定番', '#再訪', '#記憶', '#景色良し', '#偶然', '#一人向き', '#混雑', '#不満'];

const MemoTag = ({selectedTags, setSelectedTags}) => {

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length >= 8) {
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
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default MemoTag;
