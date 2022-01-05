import 'dotenv/config';
import { sign, verify, Secret } from 'jsonwebtoken';

const jwtToken = {
  accessToken: (data: any) => {
    const period = process.env.EXPIRATION_PERIOD ? process.env.EXPIRATION_PERIOD : '1h';
    console.log(period);
    return sign({ data: data }, process.env.SECRET_KEY, { expiresIn: period });
  },
  isAuthorized: (data: any) => {
    try {
      return verify({ data: data }, process.env.ACCESS_SECRET);
    } catch (err) {
      // return null if invalid token
      return null;
    }
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
