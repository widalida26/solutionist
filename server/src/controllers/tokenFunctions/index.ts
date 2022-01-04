import 'dotenv/config';
import { sign, verify, Secret } from 'jsonwebtoken';

const jwtToken = {
  accessToken: (data: any) => {
    return sign({ data: data }, process.env.SECRET_KEY, { expiresIn: '1h' });
  },
  refreshToken: (data: any) => {
    return sign({ data: data }, process.env.SECRET_KEY, { expiresIn: '1d' });
  },
  isAuthorized: (data: any) => {
    const authorization = data;
    if (!authorization) {
      return null;
    }
    const token = authorization.split(' ')[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      // return null if invalid token
      return null;
    }
  },
  sendRefreshToken: (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
  },
  sendAccessToken: (res, accessToken) => {
    return res.status(200).json({ data: { accessToken }, message: 'ok' });
  },
};

export default jwtToken;
