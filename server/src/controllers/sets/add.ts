import Container from 'typedi';
import { Request, Response } from 'express';
import errorGenerator from '../../error/errorGenerator';
import { ISetsDTO } from '../../interface/ISets';
import { IUsersDTO } from '../../interface/IUsers';
import { SetService } from '../../service/sets';
import { emptyObjectCk } from '../../utils/custom';

const add = async (req: Request, res: Response) => {
  // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => null 값 할당
  const userInfo: IUsersDTO = res.locals.userInfo
    ? res.locals.userInfo
    : { username: null };
  const setDTO: ISetsDTO = req.body;
  // 데이터가 누락됐을 경우
  if (emptyObjectCk(setDTO)) {
    errorGenerator({ statusCode: 400 });
  }

  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);

  // let setInfo = {};
  // if (setDTO.id) {
  //   // 문제의 생성 정보 획득 => creator, createdAt
  //   const originInfo = await setServiceInstance.SetOrigin(setDTO.id);
  //   setInfo = await setServiceInstance.setMaker(setDTO, originInfo, userInfo.id);
  // } else {
  //   // 세트 id가 있을 때 => 문제 작성
  // }
  const setInfo = await setServiceInstance.setMaker(setDTO, userInfo.id);

  // 세트 작성

  // res.status(200).json({
  //   username: userInfo.username,
  //   ...setInfo,
  // });
  res.send();
};
export default add;
