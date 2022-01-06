import Container from 'typedi';
import { Request, Response } from 'express';
import errorGenerator from '../../error/errorGenerator';
import { ISetsDTO } from '../../interface/ISets';
import { IUsersDTO } from '../../interface/IUsers';
import { SetService } from '../../service/sets';
import { emptyObjectCk } from '../../utils/custom';

const add = async (req: Request, res: Response) => {
  // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => 빈 객체 할당
  const userInfo: IUsersDTO = res.locals.userInfo ? res.locals.userInfo : {};
  const setDTO: ISetsDTO = req.body;

  // 누락된 데이터가 있을 경우
  if (emptyObjectCk(setDTO)) {
    errorGenerator({ statusCode: 400 });
  }

  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);

  // 세트 id가 있을 때 => 문제 수정
  if (setDTO.id) {
    // 기존 세트 삭제
    await setServiceInstance.setRemover(setDTO.id);
  }

  // 로그인된 유저가 아닌 경우 정보 null 처리
  if (emptyObjectCk(userInfo)) {
    userInfo.id = null;
    userInfo.username = null;
  }

  // 세트 작성
  const setInfo = await setServiceInstance.setMaker(userInfo.id, setDTO);

  res.status(200).json({
    username: userInfo.username,
    ...setInfo,
  });
};
export default add;
