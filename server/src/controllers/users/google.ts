import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository } from 'typeorm';
import 'dotenv/config';
import axios from 'axios';

const googleLoginURL = 'https://accounts.google.com/o/oauth2/token';
const googleInfoURL = 'https://www.googleapis.com/oauth2/v3/userinfo';

module.exports = {
  googleSignin: async (req: Request, res: Response) => {
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    try {
      const axiosRes = await axios.post(googleInfoURL, {
        client_id: googleClientId,
        client_secret: googleClientSecret,
        code: req.body.authorizationCode,
        redirect_uri: process.env.CLIENT_URL,
        grant_type: 'authorization_code',
      });
      const { access_token: accessToken } = axiosRes.data;
      const userInfo = await axios.get(googleLoginURL, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      const { name: username, email, picture: profileImage } = userInfo.data;
      const info = getRepository(users);
      const findUser = await info.findOne({ where: { email: email } });
    } catch (error) {}
  },
};
