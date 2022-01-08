import * as React from 'react';
import styled from 'styled-components';
import { device } from '../styles/Breakpoints';
import { signOut } from '../api/LoginModalAPI';
import { MdEdit } from 'react-icons/md';

// redux
import { useDispatch } from 'react-redux';
import { logoutAction } from '../modules/loginModal';

const MainContainer = styled.div`
  /* position: relative; */
  /* height: calc(100% - 190px); */
  padding: 60px 0;
  overflow: scroll;
`;

const SettingContainer = styled.div`
  display: grid;
  grid-template-rows: 4fr;
  grid-template-columns: 1fr 56.6% 1fr;
`;

const Title = styled.div`
  font-size: 3.75rem;
`;

const LeftSide = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.75rem;
  margin-right: 5.9%;
`;

const Blank = styled.div`
  width: 100%;
  margin: 5.9% 0;
  border-bottom: 2px solid var(--orangey-yellow);
  font-size: 2rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;

const EditContainer = styled.div`
  display: flex;
`;

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5%;
  > p {
    /* margin-top: 10%; */
    font-size: 1.75rem;
  }
`;

const Nickname = styled.div`
  display: flex;
  > span {
    font-size: 3rem;
  }
  > svg {
    font-size: 3rem;
  }
`;

const ImageContainer = styled.div`
  width: 250px;
  height: 250px;
  background-color: var(--warm-grey);
  border-radius: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
`;

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
  width: fit-content;

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
      console.log('signout API 에러', err);
    });
  };

  return (
    <MainContainer>
      <SettingContainer>
        <div />
        <Title>
          설정
          <Blank />
        </Title>
        <div />
        <LeftSide>개인정보 수정</LeftSide>
        <div>
          <EditContainer>
            <ImageContainer>누르면 프로필 사진 수정 가능</ImageContainer>
            <PersonalInfo>
              <Nickname>
                <span>김코딩</span>
                <MdEdit />
              </Nickname>
              <p>kimcoding@gmail.com</p>
            </PersonalInfo>
          </EditContainer>
          <Blank />
        </div>
        <div />
        <LeftSide>비밀번호 변경</LeftSide>
        <div>
          <StyledButton>비밀번호 변경</StyledButton>
          <Blank />
        </div>
        <div />
        <LeftSide>계정 관리</LeftSide>
        <StyledButton onClick={handleSignOut}>회원 탈퇴</StyledButton>
        <div />
      </SettingContainer>
    </MainContainer>
  );
};

export default Setting;
