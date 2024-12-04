import React from 'react'
import HomePage from './pages/HomePage';
import { Routes, Route } from "react-router-dom";
import MenuPage from './pages/MenuPage';

const App = () => {
  return (
    <div className="App ">
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/menu" Component={MenuPage} />
      </Routes>
    </div>
  );
}

export default App