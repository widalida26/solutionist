import * as React from 'react';

const Nav = () => {
  return (
    <div className="vw_full h_70 flex bg_light drop_shadow">
      <div className="font_36 mar_0_30">Solutionist</div>
      <div className="font_24 mar_0_30">만들기</div>
      <div className="font_24 mar_0_30">풀기</div>
      <div className="flex_1" />
      <div>
        <div className="flex border_bottom_half" onSubmit={() => false}>
          <input className="search_input font_18 " placeholder="Search..." />
        </div>
      </div>
      {1 ? (
        <div className="font_24 mar_0_30">
          로그인 <span className="font_14">또는 회원가입</span>
        </div>
      ) : (
        <div className="w_40 h_30 flex_col mar_0_30">
          <div className="flex_1 w_full border_top border_bottom_half" />
          <div className="flex_1 w_full border_top_half border_bottom" />
        </div>
      )}
    </div>
  );
};

export default Nav;
