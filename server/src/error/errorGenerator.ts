const HTTP_STATUS_MESSAGES = {
  400: 'insufficient information',
  401: 'invalid user',
  409: 'duplicate information',
  500: 'internal Server Error',
};

//interface 이용해 Error 객체에 statusCode key 추가
export interface ErrorWithStatusCode extends Error {
  statusCode?: number;
}

const errorGenerator = ({
  msg = '',
  statusCode = 500,
}: {
  msg?: string;
  statusCode: number;
}): void => {
  //인자로 들어오는 메세지와 상태 코드를 매핑
  const err: ErrorWithStatusCode = new Error(msg || HTTP_STATUS_MESSAGES[statusCode]);
  err.statusCode = statusCode;
  throw err;
};

export default errorGenerator;
