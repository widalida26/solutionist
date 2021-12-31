import * as React from 'react';

const MenuDropDown = () => {
  return (
    <div className="w_180 bg_main absolute menu_drop_down flex_col">
      <div className="flex w_full">
        <div className="bg_dark w_40 h_40 circle"></div>
        <div className="flex_1 h_full mar_l_10">
          <div className="font_14 mar_b_5">김코딩</div>
          <div className="font_10">kimcoding@gmail.com</div>
        </div>
      </div>
      <div className="">나의 세트</div>
      <div className="">설정</div>
      <div className="">로그아웃</div>
    </div>
  );
};

export default MenuDropDown;
