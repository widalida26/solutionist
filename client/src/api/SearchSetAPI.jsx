const axios = require('axios');

// * [GET: /sets/title?{검색어} [세트 검색]]
// TODO : req?, 쿠키 확인?
export function searchSets(keyword) {
  return axios.get(
    // `${process.env.SERVER_URL}sets/search/?title=${keyword}`,
    `${process.env.SERVER_URL}sets/search`,
    {
      params: keyword,
    }
    // {
    //   headers: {
    //     'Content-Type': `application/json`,
    //   },
    //   withCredentials: true,
    // }
  );
}

// * [DELETE: /collections/{collectionId} [세트 삭제]]
// TODO : 배열로 변경, req?, 쿠키 확인?
export function deleteSets(state) {
  return axios.delete(
    `${process.env.SERVER_URL}sets/delete/${state.collectionId}`,
    {
      collectionId: state.collectionId,
    }
    // {
    //   headers: {
    //     'Content-Type': `application/json`,
    //   },
    //   withCredentials: true,
    // }
  );
}

// * [GET: /sets/{setId} [세트 선택]] : 세트 선택의 용도? 세트 정보 받기?
// TODO : 배열로 변경, req?, 쿠키 확인?
export function selectSets(state) {
  return axios.get(
    `${process.env.SERVER_URL}sets/select/${state.setId}`,
    {
      setId: state.setId,
    }
    // {
    //   headers: {
    //     'Content-Type': `application/json`,
    //   },
    //   withCredentials: true,
    // }
  );
}

// * [GET: /collections [내가 만든 세트]]
// TODO : req?, 쿠키 확인?
export function getMySetsMade() {
  return axios.get(
    `${process.env.SERVER_URL}collections/something`,
    {
      // ? nothing
    }
    // {
    //   headers: {
    //     'Content-Type': `application/json`,
    //   },
    //   withCredentials: true,
    // }
  );
}

// * [GET: /solveRecords [내가 푼 세트]]
// TODO : req?, 쿠키 확인?
export function getMySetsSolved() {
  return axios.get(
    `${process.env.SERVER_URL}collections/something`,
    {
      // ? nothing
    }
    // {
    //   headers: {
    //     'Content-Type': `application/json`,
    //   },
    //   withCredentials: true,
    // }
  );
}
