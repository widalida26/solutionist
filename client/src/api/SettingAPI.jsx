const axios = require('axios');

export function changeProfileImage(file) {
  // console.log('axios:', file);

  console.log(777, file);
  if (file) {
    const formData = new FormData();
    formData.append('file', file[0]);

    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    return axios
      .patch(`${process.env.SERVER_URL}myPage/profileImage`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('changeProfileImage 요청 성공, res:', res);
        return res;
      });
  }
}
