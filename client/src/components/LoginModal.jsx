import * as React from 'react';
import '../App.css';
import styled from 'styled-components';
import { BsGoogle } from 'react-icons/bs';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FaTimesCircle } from 'react-icons/fa';
import { useState } from 'react';

// ! presentational 컴포넌트

const LoginContainer = styled.div`
  display: flex;
  svg {
    cursor: pointer;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 80vh;
  background-color: var(--main-color);
  justify-content: center;
  align-items: center;
  span {
    font-size: x-large;
  }
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 80vh - 4;
  padding: 0 2rem;
  border-top: 2px solid var(--dark-color);
  border-bottom: 2px solid var(--dark-color);
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0px')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '0px')};
  justify-content: space-around;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  * {
    margin-bottom: 30px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  /* global color test */
  color: red;
`;

const FlexEndGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  span {
    margin-bottom: 20px;
  }
  button {
    margin-bottom: 20px;
  }
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

  /* 크기 */
  font-size: 1rem;
  width: fit-content;
  height: 2rem;

  /* 색상 */
  background-color: var(--main-color);

  &:hover {
    opacity: 0.75;
  }
`;

// 모달 컴포넌트

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div`
  background-color: white;
  width: fit-content;
  padding: 1rem;
`;

const LoginModal = () => {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(false);
  };

  return (
    <>
      <br />

      <ModalBackdrop>
        <ModalView onClick={(e) => e.stopPropagation()}>
          {toggle ? (
            <LoginContainer>
              <TitleBox>
                <span>Solutionist</span>
              </TitleBox>
              <FormBox marginLeft={'10px'}>
                <FlexEndGroup>
                  <FaTimesCircle fontSize="32px" />
                </FlexEndGroup>
                <InputBox>
                  <label style={{ color: 'red' }}>이메일</label>
                  <input></input>
                  <label>비밀번호</label>
                  <input></input>
                </InputBox>
                <ButtonContainer>
                  <ButtonGroup>
                    <BsGoogle color="red" fontSize="32px" />
                    <RiKakaoTalkFill fontSize="32px" />
                  </ButtonGroup>
                  <StyledButton>로그인</StyledButton>
                </ButtonContainer>
                <FlexEndGroup>
                  <span>아직 계정이 없으신가요?</span>
                  <StyledButton onClick={handleToggle}>회원가입 이동</StyledButton>
                </FlexEndGroup>
              </FormBox>
            </LoginContainer>
          ) : (
            <LoginContainer>
              <FormBox marginRight={'10px'}>
                <FlexEndGroup>
                  <FaTimesCircle fontSize="32px" />
                </FlexEndGroup>
                <InputBox>
                  <label>이메일</label>
                  <input></input>
                  <label>닉네임</label>
                  <input></input>
                  <label>비밀번호</label>
                  <input></input>
                  <label>비밀번호 확인</label>
                  <input></input>
                </InputBox>
                <FlexEndGroup>
                  <StyledButton>회원가입</StyledButton>
                  <StyledButton onClick={handleToggle}>로그인 이동</StyledButton>
                </FlexEndGroup>
              </FormBox>
              <TitleBox>
                <span>Solutionist</span>
              </TitleBox>
            </LoginContainer>
          )}
        </ModalView>
      </ModalBackdrop>
    </>
  );
};

export default LoginModal;
