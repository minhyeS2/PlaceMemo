import './searchBox.css';
import React from 'react'

const SerachBox = ({keyword, onChangeKeyword, onSearch}) => {
  return (
                <div className='search-total'>
                <div className='search-input'>
                    <input
                        type='text'
                        value={keyword}
                        onChange={onChangeKeyword}
                        placeholder='キーワードを入力してください！'
                    ></input>
                </div>
                <button className='search-btn'
                    onClick={onSearch}
                >Search</button>
            </div>
  )
}

export default SerachBox