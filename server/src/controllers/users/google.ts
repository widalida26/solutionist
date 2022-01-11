import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import 'dotenv/config';
import axios from 'axios';
import jwtToken from '../../utils/tokenFunctions/index';

const google = async (req: Request, res: Response) => {
  // const googletokenURL = 'https://oauth2.googleapis.com/token';
  const googleInfoURL = 'https://www.googleapis.com/oauth2/v2/userinfo';
  console.log('client id', process.env.GOOGLE_CLIENT_ID);
  console.log('client secret', process.env.GOOGLE_CLIENT_SECRET);

  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  console.log('google client uri', process.env.CLIENT_URI);
  try {
    const tokenRes = await axios.post(
      `https://oauth2.googleapis.com/token?code=${req.body.authorizationCode}&client_id=${googleClientId}&client_secret=${googleClientSecret}&redirect_uri=${process.env.CLIENT_URI}&grant_type=authorization_code`
    );

    const { access_token: accessToken } = tokenRes.data;
    console.log('tokenRes', tokenRes);
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
        .values([{ username: username, email: email, type: 'google', profileImage }])
        .execute();

      const secondFind = await info.findOne({ where: { email: email } });
      const payload = {
        id: secondFind.id,
        username: secondFind.username,
        email: secondFind.email,
        type: secondFind.type,
        role: secondFind.role,
      };
      const userString = JSON.stringify(payload);
      const accessToken = jwtToken.accessToken(userString);
      jwtToken.sendAccessToken(res, accessToken);
      console.log('accessToken', accessToken);
      return res.status(201).json({ data: payload });
    } else {
      const payload = {
        id: findUser.id,
        username: findUser.username,
        email: findUser.email,
        type: findUser.type,
        role: findUser.role,
      };
      const userString = JSON.stringify(payload);
      const accessToken = jwtToken.accessToken(userString);
      jwtToken.sendAccessToken(res, accessToken);
      console.log('accessToken', accessToken);
      return res.status(201).json({ data: payload });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

export default google;
