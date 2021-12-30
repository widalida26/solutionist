import * as React from 'react';
import '../App.css';

// ! presentational 컴포넌트

const LoginModal = () => {
  return (
    <>
      <div className="div-flex">
        <span>Solutionist</span>
      </div>
      <div className="div-flex">
        <label>이메일</label>
        <input></input>
        <label>비밀번호</label>
        <input></input>
        <button>G</button>
        <button>K</button>
        <button>로그인</button>
        <span>아직 계정이 없으신가요?</span>
      </div>
    </>
  );
};

export default LoginModal;
