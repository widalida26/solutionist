const axios = require('axios');

export function postLogin(state) {
  return axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      {
        userName: state.userName,
        password: state.password,
      }
      // {
      //   headers: {
      //     'Content-Type': `application/json`,
      //     authorization: tokenState,
      //   },
      //   withCredentials: true,
      // }
    )
    .then((data) => {
      // ! 수정 & 확인
      handleResponseSuccess(data.data.data);
    });
}
