import React, { useState } from 'react';
import {  } from '@react-google-maps/api';

import './App.css';
import Header from './components/Header.jsx';
import Map from './components/Map.jsx';

function App() {
  const [activeMenu, setActiveMenu] = useState('search');

  return (
    <>
      <Header 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      <Map
         activeMenu={activeMenu}
      />
    </>
  )
}

export default App
