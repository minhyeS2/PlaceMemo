import React, { useState } from 'react';
import { MemoProvider } from './components/MemoContext';
import { } from '@react-google-maps/api';

import './App.css';
import Header from './components/Header.jsx';
import Map from './components/Map.jsx';

function App() {
  const [activeMenu, setActiveMenu] = useState('search');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');


  return (
    <>
      <Header
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        nickname={nickname}
        setNickname={setNickname}
      />
      <MemoProvider>
        <Map
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setIsLoggedIn={setIsLoggedIn}
          setNickname={setNickname}
        />
      </MemoProvider>
    </>
  )
}

export default App
