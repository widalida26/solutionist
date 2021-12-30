import * as React from 'react';
import './App.css';
import LoginModal from './components/LoginModal';
import Nav from './components/Nav';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <Nav />
          <LoginModal />
          <br />
          <p>Hello, dev aws!</p>
          <p>Hello, AWS!!!!!</p>
        </div>
        <div>
          <p style={{ color: 'red' }}>final test</p>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
