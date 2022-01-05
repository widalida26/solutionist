import { Request, Response } from 'express';
import cryptos from '../../crypto';
import { users } from '../../database/entity/users';
import errorGenerator from '../../error/errorGenerator';
import { getRepository } from 'typeorm';
import jwtToken from '../tokenFunctions/index';

const signout = async (req: Request, res: Response) => {
  try {
    console.log('hi signout');
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
  }
};

export default signout;
