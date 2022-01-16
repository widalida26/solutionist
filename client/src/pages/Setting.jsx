import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { device } from '../styles/Breakpoints';
import { MdEdit, MdCheck } from 'react-icons/md';
import {
  signOut,
  changeProfileImage,
  changeUsername,
  changePassword,
} from '../api/SettingAPI';
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction, updateUserInfoAction } from '../modules/loginModal';

const MainContainer = styled.div`
  /* position: relative; */
  /* height: calc(100% - 190px); */
  padding: 2rem 0;
  overflow: scroll;
`;

const SettingContainer = styled.div`
  display: grid;
  grid-template-rows: 4fr;
  grid-template-columns: 1fr 56.6% 1fr;
  grid-template-areas:
    '. one .'
    'two three .'
    'four five .'
    'six seven .';

  div:first-child {
    grid-area: one;
  }

  div:nth-child(2) {
    grid-area: two;
  }

  div:nth-child(3) {
    grid-area: three;
  }

  div:nth-child(4) {
    grid-area: four;
  }

  div:nth-child(5) {
    grid-area: five;
  }

  div:nth-child(6) {
    grid-area: six;
  }

  .grid-five {
    grid-area: five;
  }

  .grid-seven {
    grid-area: seven;
  }
`;

const Title = styled.div`
  font-size: 2.5rem;
`;

const LeftSide = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
  margin-right: 5.9%;
`;

const Blank = styled.div`
  width: 100%;
  margin: 3.7% 0;
  border-bottom: 2px solid var(--orangey-yellow);
  height: 2px;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;

const EditContainer = styled.div`
  display: flex;
`;

const ChangePwContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  p {
    font-size: 1.5rem;
  }
`;

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5%;
  > p {
    /* margin-top: 10%; */
    font-size: 1.5rem;
  }
  > span {
    font-size: 2rem;
  }
`;

const Nickname = styled.div`
  display: flex;
  > span {
    font-size: 2rem;
  }
  > svg {
    font-size: 2rem;
  }
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: var(--warm-grey);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 200px;
    height: 200px;
    outline: none;
    display: block;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    margin: 0;
    z-index: -1;
  }

  label {
    position: inherit;
    width: 200px;
    height: 200px;
    outline: none;
    display: block;
    border-radius: 50%;
    cursor: pointer;
  }

  img {
    position: inherit;
    width: 200px;
    height: 200px;
    outline: none;
    display: block;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
  font-family: GowunDodum-Regular;
  font-size: 1.5rem;
  border-bottom: 1px solid var(--warm-grey);
  ::placeholder {
    font-family: GowunDodum-Regular;
  }
`;

const PasswordContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  grid-template-areas:
    'one two'
    '. three';

  input:first-child {
    grid-area: one;
  }

  input:nth-child(2) {
    grid-area: two;
  }

  input:last-child {
    grid-area: three;
  }
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  width: fit-content;
  height: fit-content;

  /* 색상 & 폰트 */
  background-color: #000;
  font-size: 1.25rem;
  color: #fbb74a;

  &:hover {
    opacity: 0.75;
  }
  @media ${device.tablet} {
    font-size: 1rem;
  }
`;

const Setting = () => {
  const { userInfo } = useSelector((state) => ({
    userInfo: state.loginModal.userInfo,
  }));
  const { username, email, profileImage, type } = userInfo;

  console.log(type);

  // * 회원 탈퇴
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutAction = () => dispatch(logoutAction());
  const onUpdateUserInfoAction = (data) => dispatch(updateUserInfoAction(data));

  const handleSignOut = () => {
    signOut()
      .then(() => {
        console.log('회원 탈퇴 성공');
        onLogoutAction();
        navigate('/');
      })
      .catch((err) => {
        console.log('signout API 에러', err);
      });
  };

  // * 프로필 사진 변경
  const imgRef = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    console.log(file);

    // ! file을 서버에 보내기
    const sendAPICall = async () => {
      try {
        const data = await changeProfileImage(file);
        const updateUserInfo = {
          username: username,
          email: email,
          profileImage: data.data.data,
          type: type,
        };
        onUpdateUserInfoAction(updateUserInfo);
        // TODO : data(res)의 image를 userinfo state(리덕스)에 반영하기
      } catch (err) {
        console.log('changeProfileImage err:', err);
      }
    };
    sendAPICall();
  };

  // * username 변경
  const [isUsernameEdit, setIsUsernameEdit] = useState(false);
  const [isAfterUsernameEdit, setIsAfterUsernameEdit] = useState(false);
  const [afterValiNameMsg, setAfterValiNameMsg] = useState('');

  const [changeInfo, setChangeInfo] = useState({
    newUsername: '',
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const handleEditUsername = () => {
    setIsUsernameEdit(true);
    setIsAfterUsernameEdit(false);
    setValiNameMsg('');
  };

  console.log(userInfo);
  const handleSubmitNewUsername = () => {
    changeUsername(changeInfo.newUsername)
      .then((res) => {
        const updateUserInfo = {
          username: res.data.data.username,
          email: email,
          profileImage: profileImage,
          type: type,
        };
        onUpdateUserInfoAction(updateUserInfo);
        setIsAfterUsernameEdit(true);
        setAfterValiNameMsg('Username 변경이 완료되었습니다!');
      })
      .catch((err) => {
        const errCode = err.response.status || 500;
        if (errCode === 409) {
          setAfterValiNameMsg('변경 전과 같은 Username입니다.');
        } else {
          setAfterValiNameMsg('Username 변경을 실패했습니다!');
        }
        console.log('changeUsername 에러캐치', err);
      });
    setIsUsernameEdit(false);
  };

  // * 비밀번호 변경
  const handleSubmitNewPassword = () => {
    changePassword(changeInfo.password, changeInfo.newPassword)
      .then((res) => {
        console.log('changePassword 요청 성공, res:', res);
        setValiPwMsg('비밀번호 변경이 완료되었습니다! :)');
      })
      .catch((err) => {
        const errCode = err.response.status || 500;
        if (errCode === 400) {
          setValiPwMsg('변경 전 비밀번호를 잘못 입력했습니다.');
        } else if (errCode === 409) {
          setValiPwMsg('비밀번호 변경을 실패했습니다!');
          // TODO : 현재 비밀번호 불일치 에러코드 반영
        }
        console.log('changePassword 에러캐치', err);
      });
  };

  // * 유효성 검사
  const [valiInfo, setValiInfo] = useState({
    isNewUsername: false,
    isPassword: false,
    isNewPassword: false,
    isNewPasswordConfirm: false,
  });

  const [isNotDupliPw, setIsNotDupliPw] = useState(false);

  const { isNewUsername, isPassword, isNewPassword, isNewPasswordConfirm } = valiInfo;

  const [valiNameMsg, setValiNameMsg] = useState('');
  const [valiPwMsg, setValiPwMsg] = useState('');

  console.log(changeInfo, valiInfo, isNotDupliPw);

  // newUsername 유효성 검사
  const handleChangeNewUsername = useCallback(
    (e) => {
      setChangeInfo({ ...changeInfo, newUsername: e.target.value });
      if (e.target.value.length < 3 || e.target.value.length > 10) {
        setValiNameMsg('이름을 3글자 이상 10글자 이하로 입력해주세요.');
        setValiInfo({ ...valiInfo, isNewUsername: false });
      } else {
        setValiNameMsg('올바른 이름 형식입니다 :)');
        setValiInfo({ ...valiInfo, isNewUsername: true });
      }
    },
    [changeInfo]
  );

  // password 유효성 검사
  const handleChangePassword = useCallback(
    (e) => {
      setChangeInfo({ ...changeInfo, password: e.target.value });
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      if (!passwordRegex.test(passwordCurrent)) {
        setValiPwMsg(`숫자+영문자+특수문자 조합으로
          8자리 이상인 현재 비밀번호를 입력해주세요!
          `);
        setValiInfo({ ...valiInfo, isPassword: false });
      } else {
        setValiPwMsg('현재 비밀번호를 입력하셨습니다 :)');
        setValiInfo({ ...valiInfo, isPassword: true });
      }
    },
    [changeInfo]
  );

  // NewPassword 유효성 검사
  const handleChangeNewPassword = useCallback(
    (e) => {
      setChangeInfo({ ...changeInfo, newPassword: e.target.value });
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      if (!passwordRegex.test(passwordCurrent)) {
        setValiPwMsg(`숫자+영문자+특수문자 조합으로
          8자리 이상인 새 비밀번호를 입력해주세요!
          사용 가능한 특수문자는 !@#$%^*+=- 입니다.`);
        setValiInfo({ ...valiInfo, isNewPassword: false });
      } else {
        setValiPwMsg('안전한 새 비밀번호예요 :)');
        setValiInfo({ ...valiInfo, isNewPassword: true });
      }
    },
    [changeInfo]
  );

  const handleCheckDupliPw = useCallback(() => {
    if (changeInfo.password === changeInfo.newPassword) {
      setValiPwMsg('현재 비밀번호와 입력하신 새 비밀번호가 같습니다.');
      setIsNotDupliPw(false);
    } else {
      setIsNotDupliPw(true);
    }
  }, [changeInfo]);

  // newPasswordConfirm 유효성 검사
  const handleChangeNewPasswordConfirm = useCallback(
    (e) => {
      setChangeInfo({ ...changeInfo, newPasswordConfirm: e.target.value });
      const passwordConfirmCurrent = e.target.value;
      if (changeInfo.newPassword === passwordConfirmCurrent) {
        setValiPwMsg('새 비밀번호를 똑같이 입력했어요 :)');
        setValiInfo({ ...valiInfo, isNewPasswordConfirm: true });
      } else {
        setValiPwMsg('새로 입력한 비밀번호가 달라요. 다시 확인해주세요!');
        setValiInfo({ ...valiInfo, isNewPasswordConfirm: false });
      }
    },
    [changeInfo]
  );

  return (
    <MainContainer>
      <SettingContainer>
        <Title>
          설정
          <Blank />
        </Title>
        <LeftSide>개인정보 수정</LeftSide>
        <div>
          <EditContainer>
            <ImageContainer>
              <input type="file" id="upload" onChange={handleFileInput} />
              <label htmlFor="upload">
                <img
                  src={`${profileImage}`}
                  ref={imgRef}
                  onError={() => {
                    return (imgRef.current.src =
                      'https://i.pinimg.com/236x/2f/ec/a4/2feca4c9330929232091f910dbff7f87.jpg');
                  }}
                />
              </label>
            </ImageContainer>
            <PersonalInfo>
              {isUsernameEdit ? (
                <>
                  <Nickname>
                    <StyledInput
                      placeholder="새 Username 입력"
                      onChange={handleChangeNewUsername}
                    />
                    <MdCheck
                      onClick={() =>
                        !isNewUsername
                          ? setValiNameMsg('채우지 않았거나 유효하지 않은 입력이 있어요.')
                          : handleSubmitNewUsername()
                      }
                    />
                  </Nickname>
                  {valiNameMsg ? <p>{valiNameMsg}</p> : ''}
                </>
              ) : (
                <Nickname>
                  <span>{username}</span>
                  <MdEdit onClick={handleEditUsername} />
                </Nickname>
              )}
              {isAfterUsernameEdit ? (
                <p style={{ color: 'red' }}>{afterValiNameMsg}</p>
              ) : (
                ''
              )}
              <span>{email}</span>
            </PersonalInfo>
          </EditContainer>
          <Blank />
        </div>
        {type === 'google' || type === 'kakao' ? '' : <LeftSide>비밀번호 변경</LeftSide>}
        {type === 'google' || type === 'kakao' ? (
          ''
        ) : (
          <div>
            <EditContainer>
              <PasswordContainer>
                <StyledInput
                  type="password"
                  placeholder="현재 비밀번호"
                  onChange={handleChangePassword}
                />
                <StyledInput
                  onBlur={handleCheckDupliPw}
                  type="password"
                  placeholder="새 비밀번호"
                  onChange={handleChangeNewPassword}
                />
                <StyledInput
                  type="password"
                  placeholder="새 비밀번호 확인"
                  onChange={handleChangeNewPasswordConfirm}
                />
              </PasswordContainer>
            </EditContainer>
            <ChangePwContainer>
              <StyledButton
                onClick={() =>
                  !(isPassword && isNewPassword && isNewPasswordConfirm && isNotDupliPw)
                    ? setValiPwMsg('채우지 않았거나 유효하지 않은 입력이 있어요.')
                    : handleSubmitNewPassword()
                }
              >
                비밀번호 변경
              </StyledButton>
              <p>{valiPwMsg}</p>
            </ChangePwContainer>
            <Blank />
          </div>
        )}
        <LeftSide>계정 관리</LeftSide>
        {type === 'google' || type === 'kakao' ? (
          <StyledButton className="grid-five" onClick={handleSignOut}>
            회원 탈퇴
          </StyledButton>
        ) : (
          <StyledButton className="grid-seven" onClick={handleSignOut}>
            회원 탈퇴
          </StyledButton>
        )}
      </SettingContainer>
    </MainContainer>
  );
};

export default Setting;
