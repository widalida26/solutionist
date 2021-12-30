import * as React from 'react';
import '../App.css';
import styled from 'styled-components';

// ! presentational 컴포넌트

const LoginContainer = styled.div`
  display: flex;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 600px;
  background-color: var(--main-color);
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 432px;
  padding: 5rem 2rem;
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
  gap: 1rem;
`;

const SignupGroup = styled.div`
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
  color: var(--dark-color);

  &:hover {
    opacity: 0.75;
  }
`;

const LoginModal = () => {
  return (
    <>
      <br />
      <LoginContainer>
        <TitleBox>
          <span>Solutionist</span>
        </TitleBox>
        <FormBox marginLeft={'10px'}>
          <InputBox>
            <label>이메일</label>
            <input></input>
            <label>비밀번호</label>
            <input></input>
          </InputBox>
          <ButtonContainer>
            <ButtonGroup>
              <StyledButton>G</StyledButton>
              <StyledButton>K</StyledButton>
            </ButtonGroup>
            <StyledButton>로그인</StyledButton>
          </ButtonContainer>
          <SignupGroup>
            <span>아직 계정이 없으신가요?</span>
            <StyledButton>회원가입 이동</StyledButton>
          </SignupGroup>
        </FormBox>
      </LoginContainer>
      {/* 삼항연산자 */}
      <br />
      <br />
      <LoginContainer>
        <FormBox marginRight={'10px'}>
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
          <SignupGroup>
            <StyledButton>회원가입</StyledButton>
            <StyledButton>로그인 이동</StyledButton>
          </SignupGroup>
        </FormBox>
        <TitleBox>
          <span>Solutionist</span>
        </TitleBox>
      </LoginContainer>
    </>
  );
};

export default LoginModal;
