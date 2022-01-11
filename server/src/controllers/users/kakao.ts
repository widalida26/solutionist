import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import 'dotenv/config';
import axios from 'axios';
import jwtToken from '../../utils/tokenFunctions/index';

const kakao = async (req: Request, res: Response) => {
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

    console.log(555, kakaoUserInfo);
    const userInfo = kakaoUserInfo.data.kakao.account;
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

export default kakao;
