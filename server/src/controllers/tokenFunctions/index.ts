import 'dotenv/config';
import { sign, verify, Secret } from 'jsonwebtoken';

const jwtToken = {
  accessToken: (data: any) => {
    const period = process.env.EXPIRATION_PERIOD ? process.env.EXPIRATION_PERIOD : '1h';
    return sign({ data: data }, process.env.ACCESS_SECRET, { expiresIn: period });
  },
  isAuthorized: (data: string) => {
    return verify(data, process.env.ACCESS_SECRET);
  },
  sendAccessToken: (res, accessToken: any) => {
    res.cookie(
      'accessToken',
      { accessToken: accessToken },
      {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      }
    );
  },
};

export default jwtToken;
