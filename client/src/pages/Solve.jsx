import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { FaCaretSquareLeft, FaCaretSquareRight, FaChartBar } from 'react-icons/fa';
import OIcon from '../icons/O';
import XIcon from '../icons/X';

const SolveContainer = styled.div`
  position: relative;
  height: calc(100% - 4rem);
  padding: 2rem 0;
  overflow: scroll;

  *::placeholder {
    opacity: 0.5;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin: 0 25% 0 25%;
  line-height: 120%;
  font-size: 2rem;
  font-family: 'GongGothicMedium', sans-serif;
  word-wrap: break-word;
  word-break: break-word;

  @media all and (max-width: 1023px) {
    width: 60%;
    margin: 0 15% 0 25%;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 0 1rem;
    font-size: 1.5rem;
  }
`;
const Desc = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin: 0.5rem 25%;
  line-height: 120%;
  font-size: 1.25rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;

  @media all and (max-width: 1023px) {
    width: 60%;
    margin: 0.5rem 15% 0.5rem 25%;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 0.5rem 1rem;
    font-size: 1rem;
  }
`;
const Divider = styled.div`
  width: 50%;
  height: 2px;
  margin: 0 25%;
  background-color: var(--orangey-yellow);

  @media all and (max-width: 1023px) {
    width: 60%;
    margin: 0 15% 0 25%;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 0 1rem;
  }
`;
const ProblemContainer = styled.div`
  margin: 0.25rem 0;
  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-template-columns: 25% 1fr 25%;
  grid-template-areas:
    'number question  .'
    'number choice .'
    'statIcon stats .'
    'statIcon explanation .';

  @media all and (max-width: 1023px) {
    grid-template-columns: 25% 60% 15%;
  }
  @media all and (max-width: 767px) {
    margin: 0 1rem;
    grid-template-rows: auto auto auto auto auto auto;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'number statIcon'
      'question question'
      'choice choice'
      'counter counter'
      'stats stats'
      'explanation explanation';
  }
`;
const ProblemNum = styled.div`
  grid-area: number;
  text-align: end;
  color: ${(props) => props.color};
  font-size: ${(props) => props.font_size};
  margin-right: 1rem;

  @media all and (max-width: 767px) {
    font-size: 2rem;
    text-align: start;
    margin-top: 1rem;
  }
`;
const Question = styled.div`
  grid-area: question;
  margin: 1rem 0.5rem 0 0;
  height: auto;
  line-height: 125%;
  word-wrap: break-word;
  word-break: break-word;
  font-size: 1.25rem;
  font-family: 'GongGothicMedium', sans-serif;
  @media all and (max-width: 767px) {
    font-size: 1rem;
  }
`;
const ChoicesContainer = styled.ol`
  grid-area: choice;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;
const Choice = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--warm-grey);
  color: var(--warm-grey);
  background-color: ${(props) => props.backgroundColor};
`;
const ChoiceNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  align-self: start;
  width: 2rem;
  font-size: 1rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;
const ChoiceContent = styled.div`
  flex: 1;
  width: 100%;
  margin: 0.25rem 0.5rem 0.25rem 0;
  padding: 0.25rem 0;
  color: black;
  font-size: 1rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
`;
const OxChoices = styled.div`
  display: flex;
  justify-content: space-evenly;
  grid-area: choice;
  margin-top: 1rem;
`;
const OxCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 100%;
  max-width: 12rem;
  max-height: 12rem;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  svg {
    height: 100%;
    width: 100%;
    margin: 2rem;
    :hover {
      fill: var(--orangey-yellow);
    }
  }
  @media all and (max-width: 767px) {
    max-width: 10rem;
    max-height: 10rem;
    svg {
      margin: 1.5rem;
    }
  }
`;
const ExplanationContainer = styled.div`
  grid-area: explanation;
`;
const Explanation = styled.div`
  width: calc(100% - 1.5rem - 2px);
  margin: 0 0 1rem 0;
  padding: 0.5rem 0.75rem;
  border: 1px dashed var(--warm-grey);
  border-radius: 10px;
  background-color: white;
  color: var(--warm-grey);
  font-size: 0.75rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
`;
const ChartIcon = styled.div`
  grid-area: statIcon;
  text-align: right;
  font-size: 3rem;
  margin-right: 1.5rem;
  color: ${(props) => (props.isStat ? 'var(--orangey-yellow)' : 'var(--warm-grey-50)')};
  :hover {
    color: ${(props) =>
      props.color ? 'var(--orangey-yellow)' : 'var(--orangey-yellow-50)'};
  }
  @media all and (max-width: 767px) {
    font-size: 1.75rem;
    margin-top: 1rem;
    margin-right: 0;
  }
`;
const ChartContainer = styled.div`
  grid-area: stats;
  display: ${(props) => (props.isStat ? 'grid' : 'none')};
  grid-template-columns: auto 1fr auto;
  grid-template-rows: ${(props) => (props.rows ? `repeat(${props.rows}, auto)` : 'auto')};
  grid-gap: 0.5rem 1rem;
  margin-bottom: 1rem;
`;
const ChartStatNum = styled.div`
  text-align: right;
`;
const ChartBox = styled.div`
  text-align: right;
  height: 100%;
  border-left: 1px solid
    ${(props) => (props.backgroundColor ? props.backgroundColor : 'var(--warm-grey-50)')};
  width: ${(props) => (props.width ? `${props.width}%` : '0%')};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'var(--warm-grey-50)'};
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 50%;
  margin: 0 25% 0 25%;
  color: var(--warm-grey);
  font-size: 3rem;
  opacity: 0.5;
  * {
    flex: 1;
  }
  svg {
    margin: 1rem 0;
    :hover {
      color: black;
    }
  }
  div:first-child {
    text-align: left;
  }
  div:last-child {
    text-align: right;
  }

  @media all and (max-width: 1023px) {
    width: 60%;
    margin: 0 15% 0 25%;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 0 1rem;
    font-size: 2rem;
  }
`;
const SidebarContainer = styled.div`
  position: sticky;
  float: 0;
  top: 3rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 50% 1fr;
  grid-template-areas: '. . sidebar';

  @media all and (max-width: 1023px) {
    display: none;
  }
`;
const SideRelative = styled.div`
  grid-area: sidebar;
  position: relative;
`;
const Sidebar = styled.div`
  position: absolute;
  left: 0;
  margin-left: 1rem;
  padding: 0 1rem;
  border-left: 2px dashed var(--warm-grey);
  color: var(--warm-grey);
  div {
    font-size: 0.75rem;
  }
`;
const SidebarContent = styled.div`
  margin-bottom: 0.25rem;
  display: flex;
  color: ${(props) => props.color};
  * {
    font-size: 1rem;
    font-family: 'GowunDodum-Regular', sans-serif;
    font-weight: ${(props) => props.weight};
    word-break: break-word;
  }
  div:first-child {
    margin-right: 0.5rem;
  }
`;

const Solve = () => {
  const [set, setSet] = useState({
    title: '',
    description: '',
    problems: [
      {
        choice: [],
      },
    ],
  });
  const { setId } = useParams();
  const [userChoices, setUserChoices] = useState([]);
  const [curIdx, setCurIdx] = useState(0);
  const { id, index, question, answer, explanation, isOX, choice } = set.problems[curIdx];
  const [isChecked, setIsChecked] = useState([]);
  const [stats, setStats] = useState([]);
  const [isStat, setIsStat] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [setInfo, setSetInfo] = useState({});

  useEffect(() => {
    axios.get(`${process.env.SERVER_URL}sets/${setId}`).then((res) => {
      setSet(res.data);
      const newStat = [];
      res.data.problems.map((el) => {
        newStat.push(Array(el.choice.length).fill(0));
      });
      setStats([...newStat]);
    });
  }, []);

  const handleClick = (e) => {
    const newData = [...userChoices];
    if (e.target.id[0] === 'O') {
      newData[curIdx] = { problemId: id, choice: 1 };
      setUserChoices(newData);
    } else if (e.target.id[0] === 'X') {
      newData[curIdx] = { problemId: id, choice: 2 };
      setUserChoices(newData);
    }

    if (e.target.id[0] === 'a') {
      newData[curIdx] = {
        problemId: id,
        choice: Number(e.target.id[1]) + 1,
      };
      setUserChoices(newData);
    }
  };

  const handleCheck = () => {
    if (!userChoices[curIdx]) return console.log('답을 입력해주세요');

    const newIsCheck = [...isChecked];

    newIsCheck[curIdx] = true;
    setIsChecked(newIsCheck);

    axios
      .post(`${process.env.SERVER_URL}solveStatus`, {
        ...userChoices[curIdx],
        recordId: setInfo.recordId,
        solver: setInfo.solver,
      })
      .then((res) => {
        const newStats = [...stats];
        newStats[curIdx] = res.data.selectionRate;
        setStats(newStats);
      });
  };

  const handlePrev = () => {
    if (curIdx > 0) {
      setCurIdx(curIdx - 1);
    }
  };
  const handleNext = () => {
    if (curIdx < set.problems.length - 1) {
      setCurIdx(curIdx + 1);
    }
  };
  const handleSubmit = () => {
    let count = 0;
    set.problems.map((problem, idx) => {
      if (problem.answer === userChoices[idx].choice) {
        count++;
      }
    });
    axios
      .patch(`${process.env.SERVER_URL}solveRecords/${setInfo.recordId}`, {
        answerRate: Math.round(
          (count / set.problems.filter((el) => el.answer !== 0).length) * 100
        ),
      })
      .then(() => {
        window.location.href = `/result/${set.setId}/${setInfo.recordId}`;
      });
  };
  const handleStart = () => {
    axios.post(`${process.env.SERVER_URL}solveRecords`, { setId }).then((res) => {
      setIsSolving(true);
      setSetInfo(res.data);
    });
  };

  return (
    <SolveContainer>
      {!isSolving ? (
        <>
          <Title>{set.title}</Title>
          <Desc>{set.description}</Desc>
          <div>by set.creator</div>
          <div>at {set.createdAt}</div>
          <div>{set.solvedUserNumber}명 풀이 완료</div>
          <Divider />
          <div>
            <FaCaretSquareRight onClick={handleStart} />
          </div>
        </>
      ) : (
        <>
          <Title>{set.title}</Title>
          <Desc>{set.description}</Desc>
          <Divider />
          <SidebarContainer>
            <SideRelative>
              <Sidebar>
                {set.problems.map((problem, idx) => (
                  <SidebarContent
                    key={`sidebar${idx}`}
                    color={
                      userChoices[idx] && isChecked[idx]
                        ? userChoices[idx].choice === set.problems[idx].answer
                          ? 'var(--vibrant-green)'
                          : 'var(--red)'
                        : 'var(--warm-grey)'
                    }
                    weight={curIdx === idx ? 'bold' : 'normal'}
                    onClick={() => setCurIdx(idx)}
                  >
                    <div id={idx}>{idx + 1}</div>
                    <div id={idx}>{problem.question}</div>
                  </SidebarContent>
                ))}
              </Sidebar>
            </SideRelative>
          </SidebarContainer>
          <ProblemContainer>
            {isChecked[curIdx] ? (
              <>
                <ProblemNum
                  font_size={curIdx + 1 > 99 ? '6rem' : '8rem'}
                  color={
                    userChoices[curIdx]
                      ? userChoices[curIdx].choice === answer
                        ? 'var(--vibrant-green-50)'
                        : 'var(--red-50)'
                      : 'var(--orangey-yellow-50)'
                  }
                >
                  {index}
                </ProblemNum>
                <Question>{question}</Question>
                <ChoicesContainer>
                  {isOX ? (
                    <>
                      <OxChoices>
                        <OxCard id="O">
                          <OIcon
                            id="O"
                            fill={
                              userChoices[curIdx]
                                ? userChoices[curIdx].choice === answer
                                  ? userChoices[curIdx].choice === 1
                                    ? 'var(--vibrant-green-50)'
                                    : 'var(--warm-grey)'
                                  : userChoices[curIdx].choice === 1
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
                              userChoices[curIdx]
                                ? userChoices[curIdx].choice === answer
                                  ? userChoices[curIdx].choice === 2
                                    ? 'var(--vibrant-green-50)'
                                    : 'var(--warm-grey)'
                                  : userChoices[curIdx].choice === 2
                                  ? 'var(--red-50)'
                                  : answer === 2
                                  ? 'var(--vibrant-green-50)'
                                  : 'var(--orangey-yellow-50)'
                                : 'var(--warm-grey)'
                            }
                          />
                        </OxCard>
                      </OxChoices>
                    </>
                  ) : (
                    <>
                      {choice.map((choice, idx) => (
                        <Choice
                          key={`choiceChecked ${idx + 1}`}
                          backgroundColor={
                            userChoices[curIdx]
                              ? userChoices[curIdx].choice === answer
                                ? userChoices[curIdx].choice === idx + 1
                                  ? 'var(--vibrant-green-50)'
                                  : ''
                                : userChoices[curIdx].choice === idx + 1
                                ? 'var(--red-50)'
                                : answer === idx + 1
                                ? 'var(--vibrant-green-50)'
                                : ''
                              : ''
                          }
                        >
                          <ChoiceNum
                            fontWeight={
                              userChoices[curIdx]
                                ? userChoices[curIdx].choice === answer
                                  ? userChoices[curIdx].choice === idx + 1
                                    ? 'bold'
                                    : 'normal'
                                  : userChoices[curIdx].choice === idx + 1
                                  ? 'bold'
                                  : answer === idx + 1
                                  ? 'bold'
                                  : 'normal'
                                : 'normal'
                            }
                            color={
                              userChoices[curIdx]
                                ? userChoices[curIdx].choice === answer
                                  ? userChoices[curIdx].choice === idx + 1
                                    ? 'black'
                                    : ''
                                  : userChoices[curIdx].choice === idx + 1
                                  ? 'black'
                                  : answer === idx + 1
                                  ? 'black'
                                  : ''
                                : ''
                            }
                          >{`${idx + 1}.`}</ChoiceNum>
                          <ChoiceContent>{choice.content}</ChoiceContent>
                        </Choice>
                      ))}
                    </>
                  )}
                </ChoicesContainer>
                <ChartIcon onClick={() => setIsStat(!isStat)} isStat={isStat}>
                  <FaChartBar />
                </ChartIcon>
                <ChartContainer rows={choice.length + 1} isStat={isStat}>
                  <div></div>
                  <div>정답률 {Math.round(stats[curIdx][answer - 1])}%</div>
                  <div>비율</div>
                  {choice.map((choice, idx) => (
                    <>
                      {isOX ? (
                        idx === 0 ? (
                          <div>O</div>
                        ) : (
                          <div>X</div>
                        )
                      ) : (
                        <div>{choice.index}.</div>
                      )}

                      <div>
                        <ChartBox
                          width={stats[curIdx][idx]}
                          backgroundColor={
                            userChoices[curIdx]
                              ? userChoices[curIdx].choice === answer
                                ? userChoices[curIdx].choice === idx + 1
                                  ? 'var(--vibrant-green-50)'
                                  : ''
                                : userChoices[curIdx].choice === idx + 1
                                ? 'var(--red-50)'
                                : answer === idx + 1
                                ? 'var(--vibrant-green-50)'
                                : ''
                              : ''
                          }
                        />
                      </div>
                      <ChartStatNum>{Math.round(stats[curIdx][idx])}%</ChartStatNum>
                    </>
                  ))}
                </ChartContainer>
                <ExplanationContainer>
                  {explanation ? <Explanation>{explanation}</Explanation> : ''}
                </ExplanationContainer>
              </>
            ) : (
              <>
                <ProblemNum
                  font_size={curIdx + 1 > 99 ? '6rem' : '8rem'}
                  color="var(--orangey-yellow-50)"
                >
                  {index}
                </ProblemNum>
                <Question>{question}</Question>
                <ChoicesContainer>
                  {isOX ? (
                    <>
                      <OxChoices>
                        <OxCard onClick={handleClick} id="O">
                          <OIcon
                            id="O"
                            fill={
                              userChoices[curIdx]
                                ? userChoices[curIdx].choice === 1
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
                              userChoices[curIdx]
                                ? userChoices[curIdx].choice === 2
                                  ? 'var(--orangey-yellow)'
                                  : 'var(--warm-grey)'
                                : 'var(--warm-grey)'
                            }
                          />
                        </OxCard>
                      </OxChoices>
                    </>
                  ) : (
                    <>
                      {choice.map((choice, idx) => (
                        <Choice
                          onClick={handleClick}
                          key={`choice ${idx + 1}`}
                          id={`a${idx}`}
                          backgroundColor={
                            userChoices[curIdx]
                              ? userChoices[curIdx].choice === idx + 1
                                ? 'var(--orangey-yellow-50)'
                                : 'none'
                              : 'none'
                          }
                        >
                          <ChoiceNum
                            id={`a${idx}`}
                            color={
                              userChoices[curIdx]
                                ? userChoices[curIdx].choice === idx + 1
                                  ? 'black'
                                  : 'var(--warm-grey)'
                                : 'var(--warm-grey)'
                            }
                            fontWeight={
                              userChoices[curIdx]
                                ? userChoices[curIdx].choice === idx + 1
                                  ? 'bold'
                                  : 'normal'
                                : 'normal'
                            }
                          >{`${idx + 1}.`}</ChoiceNum>
                          <ChoiceContent id={`a${idx}`}>{choice.content} </ChoiceContent>
                        </Choice>
                      ))}
                    </>
                  )}
                </ChoicesContainer>
              </>
            )}
          </ProblemContainer>
          <Divider />
          <ButtonContainer>
            {curIdx === 0 ? (
              <div></div>
            ) : (
              <div>
                <FaCaretSquareLeft onClick={handlePrev} />
              </div>
            )}
            <div onClick={handleCheck}>check </div>
            {curIdx === set.problems.length - 1 ? (
              <div onClick={handleSubmit}>submit</div>
            ) : (
              <div>
                <FaCaretSquareRight onClick={handleNext} />
              </div>
            )}
          </ButtonContainer>
        </>
      )}
    </SolveContainer>
  );
};

export default Solve;
