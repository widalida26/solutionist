const axios = require('axios');

export function changeProfileImage(file) {
  // console.log('axios:', file);
  if (file) {
    const formData = new FormData();
    formData.append('image', file);
    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    return axios
      .patch(`${process.env.SERVER_URL}myPage/profileImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log('changeProfileImage 요청 성공, res:', res);
        return res;
      });
  }
}
