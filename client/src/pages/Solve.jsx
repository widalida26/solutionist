import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';

import CheckIcon from '../icons/Check';

const SolveContainer = styled.div`
  position: relative;
  height: calc(100% - 190px);
  padding: 60px 0;
  overflow: scroll;
`;
const Title = styled.div`
  width: 56.6%;
  height: 70px;
  margin: 0 0 0 21.7%;
  font-size: 3.75rem;
  font-family: 'GongGothicMedium', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;
const Desc = styled.div`
  width: 56.6%;
  height: 46px;
  margin: 30px 21.7% 0;
  font-size: 2rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
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
  color: var(--orangey-yellow);
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
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 3fr 1fr;
  grid-template-areas:
    'question icons'
    'list list'
    'explanation explanation';
`;
const Question = styled.div`
  grid-area: question;
  height: 47px;
  margin: 2rem 0 1rem 1rem;
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
  :hover {
    svg {
      fill: var(--vibrant-green);
    }
  }
  svg {
    margin-bottom: 0.5rem;
    align-self: end;
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
    :hover {
      fill: var(--orangey-yellow);
    }
  }
`;
const ExplanationContainer = styled.div`
  grid-area: explanation;
  margin-top: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 2px solid var(--orangey-yellow);
`;
const Explanation = styled.div`
  height: 67px;
  width: calc(100% - 6rem - 2px);
  margin: 0 1rem;
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

const Solve = () => {
  const dummy = {
    userId: 'aaa', // 로그인이 되지 않은 경우 임의의 유저 아이디
    setId: 1,
    userName: 'kimcoding',
    title: '아주 쉬운 문제들',
    description: '정말 쉽습니다',
    solvedUserNumber: 100,
    createdAt: '21-12-18 22:51:20',
    problems: [
      {
        id: 1,
        index: 1, // 문제 번호 => 1번 문제
        question: '다음 중 알파벳이 아닌 것은?',
        answer: 1, // 문제 정답
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
            index: 1, // 보기 번호 => 2번 보기
            content: 'B',
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

  const data = dummy;
  const { setId } = useParams();
  const [problemIdx, setProblemIdx] = useState(0);
  const { id, index, question, answer, isOX, choices } = data.problems[problemIdx];

  const handleClick = () => console.log(222);

  return (
    <SolveContainer>
      <Title>{data.title}</Title>
      <Desc>{data.description}</Desc>
      <Blank />
      <ProblemContainer>
        <ProblemNum>{id}</ProblemNum>
        {isOX ? (
          <ProblemOx>
            <Question>{question}</Question>
            <ListContainer>
              <OxContainer>
                <OxCard onClick={handleClick} id="O">
                  <OIcon id="O" />
                </OxCard>
                <OxCard onClick={handleClick} id="X">
                  <XIcon id="X" />
                </OxCard>
              </OxContainer>
            </ListContainer>
            <ExplanationContainer>
              <Explanation />
            </ExplanationContainer>
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
                    <CheckIcon idx={`${idx}`} />
                  </ListCheck>
                </List>
              ))}
            </ListContainer>

            <ExplanationContainer>
              <Explanation />
            </ExplanationContainer>
          </Problem>
        )}
      </ProblemContainer>
    </SolveContainer>
  );
};

export default Solve;
