import React from 'react';
import '../App.css';
import styled, { keyframes } from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FaTimesCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';

// * 프리젠테이셔널 컴포넌트

const ModalContainer = styled.div`
  display: flex;
  width: 42.3vw;
  height: 59.4vh;
  padding: 7.2vh 5.3vw;
  border-radius: 10px;
  border: solid 1px #707070;
  background-color: #fff;
  svg {
    cursor: pointer;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 23.4%;
  justify-content: center;
  align-items: center;
  span {
    font-family: SegoeUI;
    font-size: 1.5rem;
  }
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 66%;
  padding-left: 5.3%;
  border-left: 2px solid var(--dark-color);
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0px')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '0px')};
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10.7%;
  * {
    margin-bottom: 10px;
  }
  label {
    font-family: Righteous;
    font-size: 1.5rem;
  }
  input {
    font-family: GowunDodum;
    font-size: 1.66rem;
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
`;

const FlexEndGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  span {
    font-family: esamanru;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const IconBorder = styled.div`
  border-radius: 10px;
  border: solid 2px #000;
`;

const BetweenDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
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

  /* 크기 */
  font-size: 1rem;
  width: fit-content;
  height: 100%;

  /* 색상 & 폰트 */
  background-color: #000;
  font-family: Righteous;
  font-size: 1.5rem;
  color: #fbb74a;

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
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div`
  background-color: white;
  width: fit-content;
  border-radius: 10px;
`;

// keyframes 애니메이션

const boxFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledWrapper = styled.div`
  animation: ${boxFade} 1s normal;
`;

const LoginModal = ({ isLoginModalOn, onLoginModalOnAction, onModalOffAction }) => {
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  // * 임시 코드 : 새로고침 모달 켜기
  useEffect(() => {
    onLoginModalOnAction();
  }, [isLoginModalOn]);

  // 사라지는 애니메이션
  // react-transition-group의 <Transition> 실패 https://velog.io/@sae1013/REACT-%EB%AA%A8%EB%8B%AC-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98CSS
  // setTimeout 실패 https://agal.tistory.com/170

  return (
    <>
      <br />
      <StyledButton onClick={onLoginModalOnAction}>임시 모달ON 버튼</StyledButton>
      {isLoginModalOn ? (
        <StyledWrapper>
          <ModalBackdrop onClick={onModalOffAction}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              {toggle ? (
                <ModalContainer>
                  <TitleBox>
                    <span>Solutionist</span>
                  </TitleBox>
                  <FormBox marginLeft={'5.3%'}>
                    <FlexEndGroup>
                      <FaTimesCircle onClick={onModalOffAction} fontSize="1.75rem" />
                    </FlexEndGroup>
                    <InputBox>
                      <label>Email</label>
                      <input placeholder="kimcoding@gmail.com"></input>
                    </InputBox>
                    <InputBox>
                      <label>Password</label>
                      <input type={'password'} placeholder="**********"></input>
                    </InputBox>
                    <BetweenDiv>
                      <ButtonContainer>
                        <ButtonGroup>
                          <IconBorder>
                            <FcGoogle fontSize="3rem" />
                          </IconBorder>
                          <IconBorder>
                            <RiKakaoTalkFill fontSize="3rem" />
                          </IconBorder>
                        </ButtonGroup>
                        <StyledButton>LOGIN</StyledButton>
                      </ButtonContainer>
                      <FlexEndGroup onClick={handleToggle}>
                        <span>아직 계정이 없으신가요?</span>
                      </FlexEndGroup>
                    </BetweenDiv>
                  </FormBox>
                </ModalContainer>
              ) : (
                <ModalContainer>
                  <FormBox marginRight={'10px'}>
                    <FlexEndGroup>
                      <FaTimesCircle onClick={onModalOffAction} fontSize="32px" />
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
                </ModalContainer>
              )}
            </ModalView>
          </ModalBackdrop>
        </StyledWrapper>
      ) : (
        ''
      )}
    </>
  );
};

export default LoginModal;
