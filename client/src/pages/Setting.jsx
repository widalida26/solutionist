import * as React from 'react';
import styled from 'styled-components';
import { device } from '../styles/Breakpoints';
import { signOut } from '../api/LoginModalAPI';
// redux
import { useDispatch } from 'react-redux';
import { logoutAction } from '../modules/loginModal';

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 10px;

  /* 색상 & 폰트 */
  background-color: #000;
  font-size: 1.5rem;
  color: #fbb74a;

  &:hover {
    opacity: 0.75;
  }
  @media ${device.tablet} {
    font-size: 1rem;
  }
`;

const Setting = () => {
  // * 회원 탈퇴
  const dispatch = useDispatch();
  const onlogoutAction = () => dispatch(logoutAction());

  const handleSignOut = () => {
    signOut(onlogoutAction).catch((err) => {
      console.log('signout 에러', err);
    });
  };

  return (
    <div className="h_100 w_100 bg_main">
      <div>Setting</div>
      <StyledButton onClick={handleSignOut}>임시 회원탈퇴 버튼</StyledButton>
    </div>
  );
};

export default Setting;
