import * as React from 'react';
import './App.css';
import LoginModal from './components/LoginModal';
import Nav from './components/Nav';

const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
