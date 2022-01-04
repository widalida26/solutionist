const axios = require('axios');

export function postLogin(state, setUserInfoWithImage) {
  return axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      {
        username: state.username,
        password: state.password,
      },
      {
        headers: {
          'Content-Type': `application/json`,
          // authorization: tokenState,
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      // ! 수정 & 확인
      // handleResponseSuccess(data.data.data);
      setUserInfoWithImage(res.data.data);
      getAuth();
      // return res.data.data;
    });
}

function getAuth() {
  return axios
    .get(`${process.env.REACT_APP_SERVER_URL}/auth`, {
      headers: {
        'Content-Type': `application/json`,
        // authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      withCredentials: true,
    })
    .then(() => {
      // setTokenState(sessionStorage.getItem('token'));
      // setIsLogin(true);
      // setUserInfo(res.data.data.userInfo);
      // if (location.pathname === '/login') {
      // useLocation으로 로그인 할때만 변경
      // navigate('/');
      // }
      onloginAction();
    })
    .catch(console.log('getAuth error'));
}

export function signUp(state) {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
      email: state.email,
      username: state.username,
      password: state.password,
    })
    .then(() => console.log('회원가입 성공')); // 회원가입 버튼 클릭시 모달 열기
}
