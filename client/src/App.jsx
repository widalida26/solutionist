import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './reset.css';
import './App.css';
import LoginModalContainer from './containers/LoginModalContainer';
import NavContainer from './containers/NavContainer';
// import Nav from './components/Nav';
import Landing from './pages/Landing';
import MySet from './pages/MySet';
import Make from './pages/Make';
import Solve from './pages/Solve';
import Setting from './pages/Setting';

const App = () => {
  return (
    <>
      <NavContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/make" element={<Make />} />
        <Route path="/solve" element={<Solve />} />
        <Route path="/myset" element={<MySet />} />
        <Route path="/solve" element={<Solve />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
      <LoginModalContainer />
    </>
  );
};

export default App;
