import 'dotenv/config';
import { sign, verify, Secret } from 'jsonwebtoken';

const jwtToken = {
  accessToken: (data: any) => {
    return sign({ data: data }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  },
  isAuthorized: (data: any) => {
    if (!data) {
      return null;
    }
    try {
      const token = data;
      return verify(token, process.env.ACCESS_SECRET);
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
