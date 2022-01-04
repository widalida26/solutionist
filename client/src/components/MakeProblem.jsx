import * as React from 'react';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';

const ProblemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 56.6% 1fr;
  grid-template-rows: 1fr;
`;

const ProblemNum = styled.div`
  font-size: 15rem;
  color: var(--orangey-yellow);
  opacity: 0.5;
  text-align: end;
  margin-right: 1rem;
`;
const Problem = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    'question icons'
    'list list-count'
    'explanation explanation';
`;
const ProblemOx = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    'question icons'
    'list list'
    'explanation explanation';
`;
const Question = styled.textarea`
  grid-area: question;
  font-size: 2.5rem;
  margin: 2rem 0 1rem 1rem;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
  height: 49px;
`;

const IconContainer = styled.div`
  display: flex;
  grid-area: icons;
  margin-top: 2rem;
  justify-content: flex-end;
`;
const Icon = styled.div`
  margin-right: 1rem;
`;
const ListContainer = styled.ol`
  grid-area: list;
`;
const List = styled.li`
  display: flex;
  border-bottom: 1px solid var(--warm-grey);
  margin-top: 1rem;
  margin-left: 1rem;
  color: var(--warm-grey);
`;
const ListNum = styled.div`
  width: 2.5rem;
  height: 3.5rem;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ListContent = styled.input`
  height: 2rem;
  height: 3.5rem;
  font-size: 1.75rem;
  margin-left: 1rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  display: flex;
  align-items: center;
  color: black;
`;
const ListCount = styled.div`
  grid-area: list-count;
`;
const CountHeader = styled.div`
  height: 3.5rem;
  font-size: 2rem;
  margin-top: 1rem;
  color: var(--warm-grey);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CounterContainer = styled.div`
  color: var(--warm-grey);
  height: 3.5rem;
  font-size: 2rem;
  margin-top: 1rem;
  color: var(--warm-grey);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Counter = styled.div`
  width: auto;
  margin: 0 1.5rem;
`;
const ExplanationContainer = styled.div`
  grid-area: explanation;
  padding-bottom: 65px;
  margin-top: 60px;
  border-bottom: 2px solid var(--orangey-yellow);
`;
const Explanation = styled.textarea`
  padding: 1rem 2rem;
  width: calc(100% - 6rem - 2px);
  margin: 0 1rem;
  font-size: 1.5rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  background-color: white;
  border: 1px solid var(--warm-grey);
  border-radius: 10px;
  color: var(--warm-grey);
  height: fit-content;
  resize: none;
`;
const OxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;
const OxCard = styled.div`
  width: 12rem;
  height: 12rem;
  padding: 4rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  margin: 0 4.2%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    object-fit: contain;
  }
`;

const MakeProblem = () => {
  const [isOx, setIsOx] = useState(false);

  const auto_grow = (e) => {
    e.target.style.height = e.target.scrollHeight;
    e.target.style.height = e.target.scrollHeight + 'px';
  };
  return (
    <ProblemContainer>
      <ProblemNum>01</ProblemNum>
      {isOx ? (
        <ProblemOx>
          <Question placeholder="문제를 입력해주세요." onInput={auto_grow} />
          <IconContainer>
            <Icon>
              <img src="./assets/icons/no_answer.svg" />
            </Icon>
            <Icon onClick={() => setIsOx(false)}>
              <img src="./assets/icons/list.svg" />
            </Icon>
            <Icon>
              <img src="./assets/icons/trash.svg" />
            </Icon>
          </IconContainer>
          <ListContainer>
            <OxContainer>
              <OxCard>
                <img src="./assets/icons/circle.svg" />
              </OxCard>
              <OxCard>
                <img src="./assets/icons/scissors.svg" />
              </OxCard>
            </OxContainer>
          </ListContainer>
          <ExplanationContainer>
            <Explanation placeholder="해설" />
          </ExplanationContainer>
        </ProblemOx>
      ) : (
        <Problem>
          <Question placeholder="문제를 입력해주세요." onInput={auto_grow} />
          <IconContainer>
            <Icon>
              <img src="./assets/icons/no_answer.svg" />
            </Icon>
            <Icon onClick={() => setIsOx(true)}>
              <img src="./assets/icons/ox.svg" />
            </Icon>
            <Icon>
              <img src="./assets/icons/trash.svg" />
            </Icon>
          </IconContainer>
          <ListContainer>
            <List>
              <ListNum>1.</ListNum>
              <ListContent placeholder="1번 보기" />
            </List>
            <List>
              <ListNum>2.</ListNum>
              <ListContent placeholder="1번 보기" />
            </List>
            <List>
              <ListNum>3.</ListNum>
              <ListContent placeholder="1번 보기" />
            </List>
            <List>
              <ListNum>4.</ListNum>
              <ListContent placeholder="1번 보기" />
            </List>
          </ListContainer>
          <ListCount>
            <CountHeader>보기 개수</CountHeader>
            <CounterContainer>
              <img src="./assets/icons/minus.svg" />
              <Counter>3</Counter>
              <img src="./assets/icons/plus.svg" />
            </CounterContainer>
          </ListCount>
          <ExplanationContainer>
            <Explanation placeholder="해설" />
          </ExplanationContainer>
        </Problem>
      )}
    </ProblemContainer>
  );
};

export default MakeProblem;
