import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { logout } from '../api/SettingAPI';

// redux
import { useSelector } from 'react-redux';

const FadeIn = keyframes`
from {
  opacity: 0;
  transform: translateY(-5px);
}
to {
  opacity: 1;
}`;

const DropDownContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 10px;
  padding: 25px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid var(--warm-grey);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${FadeIn} 0.5s ease;
  div {
    font-family: 'GowunDodum-Regular', sans-serif;
  }
`;

const ImageContainer = styled.div`
  width: 120px;
  height: 120px;
  background-color: var(--warm-grey);
  border-radius: 50%;

  img {
    position: inherit;
    width: 120px;
    height: 120px;
    outline: none;
    display: block;
    border-radius: 50%;
  }
`;
const Username = styled.div`
  font-size: 1.25rem;
  margin-top: 20px;
`;
const Email = styled.div`
  width: 208px;
  font-size: 1rem;
  margin-top: 5px;
  padding-bottom: 15px;
  text-align: center;
  border-bottom: 1px solid var(--warm-grey);
`;

const MySetMenu = styled.div`
  margin-top: 25px;
  font-size: 1.5rem;
`;
const SettingMenu = styled.div`
  margin-top: 25px;
  font-size: 1.5rem;
`;
const LogoutMenu = styled.div`
  margin-top: 25px;
  font-size: 1.5rem;
`;

const handleLogout = () => {
  logout()
    .then(() => {
      console.log('로그아웃 성공');
    })
    .catch((err) => {
      console.log('logout API 에러캐치', err);
    });
};

const MenuDropDown = ({ handleDropDown, onlogoutAction }) => {
  const { userInfo } = useSelector((state) => ({
    userInfo: state.loginModal.userInfo,
  }));
  const { email, username, profileImage } = userInfo;

  // * 프로필 기본 이미지 적용 useRef
  const imgRef = useRef(null);

  return (
    <DropDownContainer>
      <ImageContainer>
        <img
          src={`${profileImage}`}
          ref={imgRef}
          onError={() => {
            return (imgRef.current.src =
              'https://i.pinimg.com/236x/2f/ec/a4/2feca4c9330929232091f910dbff7f87.jpg');
          }}
        />
      </ImageContainer>
      <Username>{username}</Username>
      <Email>{email}</Email>
      <Link to="/myset" onClick={handleDropDown}>
        <MySetMenu>나의 세트</MySetMenu>
      </Link>
      <Link to="/setting" onClick={handleDropDown}>
        <SettingMenu>프로필 설정</SettingMenu>
      </Link>
      <Link to="/">
        <LogoutMenu
          onClick={() => {
            handleDropDown();
            handleLogout();
            onlogoutAction();
          }}
        >
          로그아웃
        </LogoutMenu>
      </Link>
    </DropDownContainer>
  );
};

export default MenuDropDown;
