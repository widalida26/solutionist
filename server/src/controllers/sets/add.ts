import Container from 'typedi';
import { Request, Response } from 'express';
import errorGenerator from '../../error/errorGenerator';
import { ISetsDTO, IProblems, IChoices } from '../../interface/ISets';
import { SetService } from '../../service/sets';

const add = async (req: Request, res: Response) => {
  const setDTO: ISetsDTO = req.body;
  //const problems: IProblems[] = setDTO['problems'];

  // 누락된 데이터가 있을 경우
  if (!setDTO) {
    errorGenerator({ statusCode: 400 });
  }

  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);

  // 세트 id가 있을 때 => 문제 수정
  if (setDTO.id) {
    // 기존 세트 삭제
    await setServiceInstance.setRemover(setDTO.id);
  }

  let userId: number = 1;

  // 세트 작성
  await setServiceInstance.setMaker(userId, setDTO);

  //const choices: IChoices[] = problems.map((problem) => {
  //   return {problem['choices']};c
  // });

  res.end();
};
export default add;
