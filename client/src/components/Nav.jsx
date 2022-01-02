import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuDropDown from './MenuDropDown';

const Nav = () => {
  const [keyword, setKeyword] = useState('');
  const [isDropDown, setIsDropDown] = useState(false);

  const handleDropDown = () => {
    if (isDropDown) setIsDropDown(false);
    else setIsDropDown(true);
  };

  return (
    <div className="vw_full h_70 flex bg_light drop_shadow sticky">
      <Link to="/">
        <div className="font_36 font_weight_100 mar_0_30">Solutionist</div>
      </Link>
      <Link to="/make">
        <div className="font_24 mar_0_30">만들기</div>
      </Link>
      <Link to="/solve">
        <div className="font_24 mar_0_30">풀기</div>
      </Link>
      <div className="flex_1" />
      <div>
        <div onSubmit={() => false}>
          <input
            className="search_input font_18 "
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
      {1 ? ( // 리덕스를 사용한다면 isLogin이 올 자리
        <div
          className="drop_down_icon w_40 h_30 flex_col mar_0_30"
          onClick={handleDropDown}
        >
          <div className="flex_1 w_full border_top border_bottom_half" />
          <div className="flex_1 w_full border_top_half border_bottom" />
        </div>
      ) : (
        <Link to="/myset">
          <div className="font_24 mar_0_30">
            로그인 <span className="font_14">또는 회원가입</span>
          </div>
        </Link>
      )}
      {isDropDown ? <MenuDropDown handleDropDown={handleDropDown} /> : ''}
    </div>
  );
};

export default Nav;
