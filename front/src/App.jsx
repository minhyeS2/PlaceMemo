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
  const [savedMarkers, setSavedMarkers] = useState([]);


  return (
    <>
      <Header
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        nickname={nickname}
        setNickname={setNickname}
        setSavedMarkers={setSavedMarkers}
      />
      <MemoProvider>
        <Map
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setIsLoggedIn={setIsLoggedIn}
          setNickname={setNickname}
          savedMarkers={savedMarkers}
          setSavedMarkers={setSavedMarkers}
        />
      </MemoProvider>
    </>
  )
}

export default App
