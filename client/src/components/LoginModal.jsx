import * as React from 'react';
import '../App.css';

// ! presentational 컴포넌트

const LoginModal = () => {
  return (
    <>
      <div className="flex">
        <div className="flex flex_dir_col wid150 hei600 bg_main flex_center">
          <span>Solutionist</span>
        </div>
        <div className="flex flex_dir_col wid300 hei432 pad_5rem_2rem border mar_le10 flex_around">
          <div className="flex flex_dir_col info_box">
            <label>이메일</label>
            <input></input>
            <label>비밀번호</label>
            <input></input>
          </div>
          <div className="flex flex_between">
            <div className="flex gap1">
              <button>G</button>
              <button>K</button>
            </div>
            <button>로그인</button>
          </div>
          <span className="flex flex_end">아직 계정이 없으신가요?</span>
        </div>
      </div>
      <br />
      <br />
      <div className="flex">
        <div className="flex flex_dir_col wid300 hei432 pad_5rem_2rem border mar_ri10 flex_around">
          <label>이메일</label>
          <input></input>
          <label>닉네임</label>
          <input></input>
          <label>비밀번호</label>
          <input></input>
          <label>비밀번호 확인</label>
          <input></input>
          <div className="flex flex_end">
            <button>회원가입</button>
          </div>
        </div>
        <div className="flex flex_dir_col wid150 hei600 bg_main flex_center">
          <span>Solutionist</span>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
