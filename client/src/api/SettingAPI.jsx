const axios = require('axios');

export function changeProfileImage(file) {
  return axios
    .patch(
      `${process.env.SERVER_URL}users/profileImage`,
      {
        file,
      },
      {
        headers: {
          'Content-Type': `application/json`,
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log('changeProfileImage 요청 성공, res:', res);
      return res;
    });
}
