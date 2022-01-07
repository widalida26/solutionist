import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import 'dotenv/config';
import axios from 'axios';
import jwtToken from '../../utils/tokenFunctions/index';

const kakao = async (req: Request, res: Response) => {
  const { authorizationCode } = req.body;
  try {
    const tokenResponse = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_Client,
        client_secret: process.env.KAKAO_Client,
        code: authorizationCode,
      },
    });
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

export default kakao;
