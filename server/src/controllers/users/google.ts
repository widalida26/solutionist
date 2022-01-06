import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import 'dotenv/config';
import axios from 'axios';
import jwtToken from '../../utils/tokenFunctions/index';

const googletokenURL = 'https://oauth2.googleapis.com/token';
const googleInfoURL = 'https://www.googleapis.com/oauth2/v2/userinfo';

module.exports = {
  googleSignin: async (req: Request, res: Response) => {
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    try {
      const tokenRes = await axios.post(googletokenURL, {
        client_id: googleClientId,
        client_secret: googleClientSecret,
        code: req.body.authorizationCode,
        redirect_uri: process.env.CLIENT_URI,
        grant_type: 'authorization_code',
      });
      const { access_token: accessToken } = tokenRes.data;
      const userInfo = await axios.get(googleInfoURL, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      const { name: username, email, picture: profileImage } = userInfo.data;
      const info = getRepository(users);
      const findUser = await info.findOne({ where: { email: email } });

      if (!findUser) {
        const user = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(users)
          .values([{ username: username, email: email, type: 'google' }])
          .execute();
      } else {
        const playload = {
          id: findUser.id,
          username: findUser.username,
          email: findUser.email,
          type: findUser.type,
        };
        const id = findUser.id;
        const accessToken = jwtToken.accessToken(playload);
        jwtToken.sendAccessToken(res, accessToken);
        return res.status(201).json({ id, username, email, profileImage });
      }
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  },
};
