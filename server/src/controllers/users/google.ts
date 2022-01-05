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
      const axiosRes = await axios({
        method: 'post',
        url: 'googleInfoURL',
      });
    } catch (error) {}
  },
};
