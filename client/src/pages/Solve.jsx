import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { FaCaretSquareLeft, FaCaretSquareRight } from 'react-icons/fa';
import CheckIcon from '../icons/Check';
import OIcon from '../icons/O';
import XIcon from '../icons/X';

const SolveContainer = styled.div`
  position: relative;
  height: calc(100% - 190px);
  padding: 60px 0;
  overflow: scroll;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  width: 56.6%;
  margin: 0 0 0 21.7%;
  line-height: 120%;
  font-size: 3.75rem;
  font-family: 'GongGothicMedium', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
`;
const Desc = styled.div`
  display: flex;
  align-items: center;
  width: 56.6%;

  margin: 30px 21.7% 0;
  line-height: 120%;
  font-size: 2rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
`;
const Blank = styled.div`
  width: 56.6%;
  height: 2rem;
  margin: 0 21.7%;
  border-bottom: 2px solid var(--orangey-yellow);
  font-size: 2rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;
const ProblemNum = styled.div`
  text-align: end;
  margin-right: 1rem;
  color: ${(props) => props.color};
  font-size: 12rem;
  opacity: 0.5;
`;
const ProblemContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 56.6% 1fr;
`;
const Problem = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 3fr 1fr;
  grid-template-areas:
    'question .'
    'list list-count'
    'explanation explanation';
`;
const ProblemOx = styled.div`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'question question'
    'list list'
    'stat stat'
    'explanation explanation';
`;
const Question = styled.div`
  display: flex;
  align-items: center;
  grid-area: question;
  margin: 2rem 0 1rem 1rem;
  line-height: 120%;
  word-wrap: break-word;
  word-break: break-word;
  font-size: 2.5rem;
  font-family: 'GongGothicMedium', sans-serif;
`;
const ListContainer = styled.ol`
  grid-area: list;
`;
const List = styled.li`
  display: flex;
  margin-top: 1rem;
  margin-left: 1rem;
  align-items: center;
  border-bottom: 1px solid var(--warm-grey);
  color: var(--warm-grey);
`;
const ListNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 3.5rem;
  align-self: end;
  font-size: 2rem;
`;
const ListContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 40px;
  margin: 0.5rem 0 0.5rem 1rem;
  color: black;
  font-size: 1.75rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;
const ListCheck = styled.div`
  display: flex;
  width: 2rem;
  height: 3.5rem;
  margin-right: 0.5rem;
  align-self: end;
  svg {
    margin-bottom: 0.5rem;
    align-self: end;
    /* :hover {
    svg {
      fill: var(--vibrant-green);
    }
  } */
  }
`;
const OxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;
const OxCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 12rem;
  margin: 0 4.2%;
  padding: 8%;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  svg {
    height: 100%;
    width: 100%;
    /* :hover {
      fill: var(--orangey-yellow);
    } */
  }
`;
const ExplanationContainer = styled.div`
  grid-area: explanation;
  margin-top: 2.5rem;
  border-bottom: 2px solid var(--orangey-yellow);
`;
const Explanation = styled.div`
  height: 67px;
  width: calc(100% - 6rem - 2px);
  margin: 0 1rem 2.5rem;
  padding: 1rem 2rem;
  border: 1px solid var(--warm-grey);
  border-radius: 10px;
  background-color: white;
  color: var(--warm-grey);
  font-size: 1.5rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
`;
const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChartContainerOx = styled.div`
  grid-area: stat;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  div:first-child {
    justify-content: flex-end;
  }
`;
const Chart = styled.div`
  display: flex;
  align-items: flex-end;
  flex: 1;
  margin-left: 1rem;
`;
const ChartBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: ${(props) => props.width};
  height: 2rem;
  background-color: ${(props) => props.color};
  margin-bottom: 0.5rem;
`;
const ChartNum = styled.div`
  display: ${(props) => props.display};
  margin: ${(props) => props.margin};
  color: black;
`;
const AnswerRate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0 1rem 0;
  line-height: 120%;
  font-size: 2rem;
`;
const ChartOx = styled.div`
  display: flex;
  margin: 0 4.2%;
  flex: 1;
`;
const ChartBoxOx = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => props.width};
  height: 2.5rem;
  background-color: ${(props) => [props.color]};
`;
const ChartNumOx = styled.div`
  display: ${(props) => props.display};
  align-items: center;
  margin: 0 1rem;
`;
const Button = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 56.6% 1fr;
  color: var(--warm-grey);
  font-size: 5rem;
  opacity: 0.5;
  * {
    margin: 1rem;
    :hover {
      color: black;
    }
  }
  svg:first-child {
    justify-self: end;
  }
  svg:last-child {
    justify-self: start;
  }
`;

const Solve = () => {
  const dummy = {
    userId: 'aaa', // 로그인이 되지 않은 경우 임의의 유저 아이디
    setId: 1,
    userName: 'kimcoding',
    title: '아주 쉬운 문제들이지만 제목만큼은 정말 긴',
    description: '정말 쉽습니다만 이름이 정말 정말 정말 정말 정말 정말 정말 길답니다.',
    solvedUserNumber: 100,
    createdAt: '21-12-18 22:51:20',
    problems: [
      {
        id: 1,
        index: 1, // 문제 번호 => 1번 문제
        question: '다음 중 알파벳이 아닌 것은?',
        answer: 1, // 문제 정답
        explanation: 'A랑 B의 차이를 잘 보십시오',
        isOX: false,
        choices: [
          {
            id: 1,
            problemId: 1,
            index: 1, // 보기 번호 => 1번 보기
            content: 'A',
            selectionRate: 10, // 문제 1번에서 보기 1번을 고른 사람은 10%
          },
          {
            id: 2,
            problemId: 1,
            index: 2, // 보기 번호 => 2번 보기
            content: 'B',
            selectionRate: 10, // 문제 1번에서 보기 1번을 고른 사람은 10%
          },
          {
            id: 3,
            problemId: 1,
            index: 3, // 보기 번호 => 2번 보기
            content: 'c',
            selectionRate: 10, // 문제 1번에서 보기 1번을 고른 사람은 10%
          },
          {
            id: 3,
            problemId: 1,
            index: 3, // 보기 번호 => 2번 보기
            content: 'd',
            selectionRate: 10, // 문제 1번에서 보기 1번을 고른 사람은 10%
          },
        ],
      },
      {
        id: 2,
        index: 2, // 문제 번호 => 2번 문제
        question: '다음 중 알파벳이 맞는?',
        answer: 2, // 문제 정답
        isOX: true,
        choices: [
          {
            id: 1,
            problemId: 1,
            index: 1,
            content: 'A',
            selectionRate: 10,
          },
          {
            id: 2,
            problemId: 1,
            index: 1,
            content: 'B',
            selectionRate: 10,
          },
        ],
      },
    ],
  };

  const set = dummy;
  const { setId } = useParams();
  const [data, setData] = useState([]);
  const [problemIdx, setProblemIdx] = useState(0);
  const { id, index, question, answer, explanation, isOX, choices } =
    set.problems[problemIdx];
  const [isCheck, setIsCheck] = useState([]);
  const [stats, setStats] = useState([
    [90, 100, 70, 85],
    [30, 70],
  ]);

  const handleClick = (e) => {
    const newData = [...data];
    if (e.target.id[0] === 'O') {
      newData[problemIdx] = { problemId: problemIdx + 1, choice: 1 };
      setData(newData);
    } else if (e.target.id[0] === 'X') {
      newData[problemIdx] = { problemId: problemIdx + 1, choice: 2 };
      setData(newData);
    }

    if (e.target.id[0] === 'a') {
      newData[problemIdx] = {
        problemId: problemIdx + 1,
        choice: Number(e.target.id[1]) + 1,
      };
      setData(newData);
    }
  };

  console.log(problemIdx);

  const handleCheck = () => {
    if (!data[problemIdx]) return console.log('답을 입력해주세요');
    const newIsCheck = [...isCheck];
    newIsCheck[problemIdx] = true;
    setIsCheck(newIsCheck);
    axios.post(`${process.env.SERVER_URL}usersProblems`, data);
  };

  const handlePrev = () => {
    if (problemIdx > 0) {
      setProblemIdx(problemIdx - 1);
    }
  };
  const handleNext = () => {
    if (problemIdx < set.problems.length - 1) {
      setProblemIdx(problemIdx + 1);
    }
  };

  return (
    <SolveContainer>
      <Title>{set.title}</Title>
      <Desc>{set.description}</Desc>
      <Blank />
      <ProblemContainer>
        {isCheck[problemIdx] ? (
          <>
            <ProblemNum
              color={
                data[problemIdx]
                  ? data[problemIdx].choice === answer
                    ? 'var(--vibrant-green)'
                    : 'var(--red)'
                  : 'var(--orangey-yellow)'
              }
            >
              {id}
            </ProblemNum>
            {isOX ? (
              <ProblemOx>
                <Question>{question}</Question>
                <ListContainer>
                  <OxContainer>
                    <OxCard id="O">
                      <OIcon
                        id="O"
                        fill={
                          data[problemIdx]
                            ? data[problemIdx].choice === answer
                              ? data[problemIdx].choice === 1
                                ? 'var(--vibrant-green-50)'
                                : 'var(--warm-grey)'
                              : data[problemIdx].choice === 1
                              ? 'var(--red-50)'
                              : answer === 1
                              ? 'var(--vibrant-green-50)'
                              : 'var(--orangey-yellow-50)'
                            : 'var(--warm-grey)'
                        }
                      />
                    </OxCard>
                    <OxCard id="X">
                      <XIcon
                        id="X"
                        fill={
                          data[problemIdx]
                            ? data[problemIdx].choice === answer
                              ? data[problemIdx].choice === 2
                                ? 'var(--vibrant-green-50)'
                                : 'var(--warm-grey)'
                              : data[problemIdx].choice === 2
                              ? 'var(--red-50)'
                              : answer === 2
                              ? 'var(--vibrant-green-50)'
                              : 'var(--orangey-yellow-50)'
                            : 'var(--warm-grey)'
                        }
                      />
                    </OxCard>
                  </OxContainer>
                </ListContainer>
                <ChartContainerOx>
                  <ChartOx>
                    <ChartNumOx display={stats[problemIdx][0] >= 75 ? 'none' : 'flex'}>
                      {stats[problemIdx][0]}%
                    </ChartNumOx>
                    <ChartBoxOx
                      width={`${stats[problemIdx][0]}%`}
                      color={
                        data[problemIdx]
                          ? data[problemIdx].choice === answer
                            ? data[problemIdx].choice === 1
                              ? 'var(--vibrant-green-50)'
                              : 'var(--warm-grey)'
                            : data[problemIdx].choice === 1
                            ? 'var(--red-50)'
                            : answer === 1
                            ? 'var(--vibrant-green-50)'
                            : 'var(--orangey-yellow-50)'
                          : 'var(--warm-grey)'
                      }
                    >
                      <ChartNumOx display={stats[problemIdx][0] >= 75 ? 'flex' : 'none'}>
                        {stats[problemIdx][0]}%
                      </ChartNumOx>
                    </ChartBoxOx>
                  </ChartOx>
                  <ChartOx>
                    <ChartBoxOx
                      width={`${stats[problemIdx][1]}%`}
                      color={
                        data[problemIdx]
                          ? data[problemIdx].choice === answer
                            ? data[problemIdx].choice === 2
                              ? 'var(--vibrant-green-50)'
                              : 'var(--warm-grey)'
                            : data[problemIdx].choice === 2
                            ? 'var(--red-50)'
                            : answer === 2
                            ? 'var(--vibrant-green-50)'
                            : 'var(--orangey-yellow-50)'
                          : 'var(--warm-grey)'
                      }
                    >
                      <ChartNumOx display={stats[problemIdx][1] >= 75 ? 'flex' : 'none'}>
                        {stats[problemIdx][1]}%
                      </ChartNumOx>
                    </ChartBoxOx>
                    <ChartNumOx display={stats[problemIdx][1] >= 75 ? 'none' : 'flex'}>
                      {stats[problemIdx][1]}%
                    </ChartNumOx>
                  </ChartOx>
                </ChartContainerOx>
                <ExplanationContainer>
                  {explanation ? <Explanation>{explanation}</Explanation> : ''}
                </ExplanationContainer>
              </ProblemOx>
            ) : (
              <Problem>
                <Question> {question}</Question>
                <ListContainer>
                  {choices.map((choice, idx) => (
                    <List key={`choice ${idx + 1}`}>
                      <ListNum>{`${idx + 1}.`}</ListNum>
                      <ListContent>{choice.content}</ListContent>
                      <ListCheck id={`a${idx}`}>
                        <CheckIcon
                          idx={`${idx}`}
                          fill={
                            data[problemIdx]
                              ? data[problemIdx].choice === idx + 1
                                ? 'var(--orangey-yellow)'
                                : 'var(--warm-grey)'
                              : 'var(--warm-grey)'
                          }
                        />
                      </ListCheck>
                    </List>
                  ))}
                </ListContainer>
                <AnswerRate>정답률 {`${stats[problemIdx][answer - 1]}%`}</AnswerRate>
                <ChartContainer>
                  {stats[problemIdx].map((stat, idx) => (
                    <Chart>
                      <ChartBox
                        width={`${stat}%`}
                        color={
                          data[problemIdx]
                            ? data[problemIdx].choice === answer
                              ? data[problemIdx].choice === idx + 1
                                ? 'var(--vibrant-green-50)'
                                : 'var(--warm-grey-50)'
                              : data[problemIdx].choice === idx + 1
                              ? 'var(--red-50)'
                              : answer === idx + 1
                              ? 'var(--vibrant-green-50)'
                              : 'var(--warm-grey-50)'
                            : 'var(--warm-grey-50)'
                        }
                      >
                        <ChartNum
                          display={stat >= 75 ? 'block' : 'none'}
                          margin={stat >= 75 ? '0 0.5rem 0.5rem 0' : ''}
                        >
                          {stat}%
                        </ChartNum>
                      </ChartBox>
                      <ChartNum
                        display={stat >= 75 ? 'none' : 'block'}
                        margin={stat >= 75 ? '' : '0 0 1rem 0.5rem'}
                      >
                        {stat}%
                      </ChartNum>
                    </Chart>
                  ))}
                </ChartContainer>
                <ExplanationContainer>
                  {explanation ? <Explanation>{explanation}</Explanation> : ''}
                </ExplanationContainer>
              </Problem>
            )}
          </>
        ) : (
          <>
            <ProblemNum color="var(--orangey-yellow)">{id}</ProblemNum>
            {isOX ? (
              <ProblemOx>
                <Question>{question}</Question>
                <ListContainer>
                  <OxContainer>
                    <OxCard onClick={handleClick} id="O">
                      <OIcon
                        id="O"
                        fill={
                          data[problemIdx]
                            ? data[problemIdx].choice === 1
                              ? 'var(--orangey-yellow)'
                              : 'var(--warm-grey)'
                            : 'var(--warm-grey)'
                        }
                      />
                    </OxCard>
                    <OxCard onClick={handleClick} id="X">
                      <XIcon
                        id="X"
                        fill={
                          data[problemIdx]
                            ? data[problemIdx].choice === 2
                              ? 'var(--orangey-yellow)'
                              : 'var(--warm-grey)'
                            : 'var(--warm-grey)'
                        }
                      />
                    </OxCard>
                  </OxContainer>
                </ListContainer>
                <ExplanationContainer />
              </ProblemOx>
            ) : (
              <Problem>
                <Question> {question}</Question>
                <ListContainer>
                  {choices.map((choice, idx) => (
                    <List key={`choice ${idx + 1}`}>
                      <ListNum>{`${idx + 1}.`}</ListNum>
                      <ListContent>{choice.content} </ListContent>
                      <ListCheck onClick={handleClick} id={`a${idx}`}>
                        <CheckIcon
                          idx={`${idx}`}
                          fill={
                            data[problemIdx]
                              ? data[problemIdx].choice === idx + 1
                                ? 'var(--orangey-yellow)'
                                : 'var(--warm-grey)'
                              : 'var(--warm-grey)'
                          }
                        />
                      </ListCheck>
                    </List>
                  ))}
                </ListContainer>
                <ExplanationContainer />
              </Problem>
            )}
          </>
        )}
      </ProblemContainer>
      <Button>
        <FaCaretSquareLeft onClick={handlePrev} />
        <div onClick={handleCheck}>check </div>
        <FaCaretSquareRight onClick={handleNext} />
      </Button>
    </SolveContainer>
  );
};

export default Solve;
