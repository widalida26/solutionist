import { Request, Response } from 'express';
// import { users } from '../../database/entity/users';
// import { getConnection, getRepository } from 'typeorm';
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
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code: req.body.authorizationCode,
        redirect_uri: process.env.CLIENT_URL,
        grant_type: 'authorization_code',
      });
      const { access_token: accessToken } = axiosRes.data;
      const profileRes = await axios.get(googleLoginURL, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      const { name: nickname, email, picture: image } = profileRes.data;
    } catch (error) {}
  },
};
