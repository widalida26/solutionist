import { Request, Response } from 'express';
import Container from 'typedi';
import { SetService } from '../../service/sets';
import errorGenerator from '../../error/errorGenerator';
import { v4 } from 'uuid';

const select = async (req: Request, res: Response) => {
  const userInfo = res.locals.userInfo;
  const userId = userInfo ? userInfo.id : null;
  // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => null 값 할당
  const solver = userInfo ? userInfo.email : v4();
  const { setId } = req.params;

  // setId가 유효하지 않을 경우
  if (!Number(setId)) {
    errorGenerator({ statusCode: 400 });
  }

  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);

  // 세트 선택
  const selectedSet = await setServiceInstance.SetSelector(Number(setId), userId);

  res.status(200).json({
    solver,
    ...selectedSet,
  });
};
export default select;
