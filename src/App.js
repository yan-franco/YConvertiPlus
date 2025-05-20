import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Cambiado a react-router-dom
import Home from './home/home.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
