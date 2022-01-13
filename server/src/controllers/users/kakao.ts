import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import 'dotenv/config';
import axios from 'axios';
import jwtToken from '../../utils/tokenFunctions/index';

const kakaoOauth = async (req: Request, res: Response) => {
  const { authorizationCode } = req.body;
  try {
    const resToken = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
        code: authorizationCode,
        redirect_uri: process.env.CLIENT_URI,
      },
    });
    const { access_token: accessToken } = resToken.data;
    const kakaoUserInfo = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { nickname: username, profile_image: profileImage } =
      kakaoUserInfo.data.properties;
    const { email } = kakaoUserInfo.data.kakao_account;

    const findUser = async () => {
      try {
        const info = getRepository(users);
        const user = await info.findOne({ where: { email: email } });
        return user;
      } catch (err) {
        console.log(err);
        return err;
      }
    };

    const dbUser = await findUser();
    console.log(111, dbUser);

    if (!dbUser) {
      const user = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(users)
        .values([
          {
            username: username,
            email: email,
            type: 'kakao',
            profileImage: profileImage,
          },
        ])

        .execute();
    }
    const secondFind = await findUser();
    const payload = {
      username: secondFind.username,
      email: secondFind.email,
      type: secondFind.type,
      profileImage: secondFind.profileImage,
    };
    const userString = JSON.stringify(payload);
    const accessToken2 = jwtToken.accessToken(userString);
    jwtToken.sendAccessToken(res, accessToken2);
    console.log('accessToken', accessToken2);
    return res.status(201).json({ data: payload });
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

export default kakaoOauth;
