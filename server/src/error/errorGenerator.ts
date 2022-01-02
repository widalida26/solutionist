const ERROR_TYPES = {
  400: 'insufficient information',
  401: 'invalid user',
  409: 'duplicate information',
  500: 'err',
} as const;
type ERROR_TYPES = typeof ERROR_TYPES[keyof typeof ERROR_TYPES];

interface ErrorWithStatusCode extends Error {
  statusCode?: number;
}

const errorGenerator = ({
  msg = '',
  statusCode = 500,
}: {
  msg?: string;
  statusCode: number;
}): void => {
  const err: ErrorWithStatusCode = new Error(msg || ERROR_TYPES[statusCode]);
  err.statusCode = statusCode;
  throw err;
};

export default errorGenerator;
