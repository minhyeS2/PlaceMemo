import './searchBox.css';
import React from 'react';

const SearchBox = ({ keyword, onChangeKeyword, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출로 인한 새로고침 방지
    onSearch();
  };

  return (
    <form className='search-total' onSubmit={handleSubmit}>
      <div className='search-input'>
        <input
          type='text'
          value={keyword}
          onChange={onChangeKeyword}
          placeholder='キーワードを入力してください！'
        />
      </div>
      <button className='search-btn' type='submit'>Search</button>
    </form>
  );
};

export default SearchBox;
