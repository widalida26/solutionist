import * as React from 'react';
import './reset.css';
import './App.css';
import LoginModal from './components/LoginModal';

const App = () => {
  return (
    <>
      <div>
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
