import 'dotenv/config';
import { sign, verify, Secret } from 'jsonwebtoken';

const jwtToken = {
  accessToken: (data: any) => {
    const period: string = process.env.EXPIRATION_PERIOD
      ? process.env.EXPIRATION_PERIOD
      : '1h';
    console.log('ACCESS_SECRET', process.env.ACCESS_SECRET);
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
      // sameSite: 'none',
      // secure: true,
    });
  },
};

export default jwtToken;
