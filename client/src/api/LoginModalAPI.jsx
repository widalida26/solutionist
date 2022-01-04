const axios = require('axios');

export function postLogin(state, setUserInfo) {
  return axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      {
        userName: state.userName,
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
      setUserInfo(res.data.data);
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
