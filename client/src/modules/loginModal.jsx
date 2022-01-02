/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const LOGIN_MODAL_ON = 'loginModal/LOGIN_MODAL_ON';
const MODAL_OFF = 'loginModal/MODAL_OFF';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const loginModalOnAction = () => ({ type: LOGIN_MODAL_ON });
export const modalOffAction = () => ({ type: MODAL_OFF });

/* 초기 상태 선언 */
const initialState = {
  isLoginModalOn: false,
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
const loginModal = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case LOGIN_MODAL_ON:
      state = { ...prevState, isLoginModalOn: true };
      break;
    case MODAL_OFF:
      state = { ...initialState };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default loginModal;
