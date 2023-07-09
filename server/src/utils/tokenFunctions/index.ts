import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';

const jwtToken = {
  accessToken: (data: any) => {
    const period: string = process.env.EXPIRATION_PERIOD
      ? process.env.EXPIRATION_PERIOD
      : '1h';
    return sign({ data: data }, process.env.ACCESS_SECRET, { expiresIn: period });
  },
  isAuthorized: (data: any) => {
    if (!data) {
      return null;
    }
    try {
      const token = data;
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log(err);
      // return null if invalid token
      return null;
    }
  },
  sendAccessToken: (res, accessToken: any) => {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      domain: process.env.DOMAIN,
      maxAge: 1000 * 60 * 60,
    });
  },
};

export default jwtToken;
