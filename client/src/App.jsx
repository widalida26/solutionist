import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginModalContainer from './containers/LoginModalContainer';
import Nav from './components/Nav';
import Landing from './pages/Landing';
import MySet from './pages/MySet';
import Make from './pages/Make';
import Solve from './pages/Solve';

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/make" element={<Make />} />
        <Route path="/solve" element={<Solve />} />
      </Routes>
      <LoginModalContainer />
    </>
  );
};

export default App;
