import Container from 'typedi';
import { Request, Response } from 'express';
import errorGenerator from '../../error/errorGenerator';
import { ISetsDTO } from '../../interface/ISets';
import { SetService } from '../../service/sets';

const search = async (req: Request, res: Response) => {
  try {
    res.end();
  } catch (err) {
    errorGenerator({ statusCode: 500 });
  }
};
export default search;
