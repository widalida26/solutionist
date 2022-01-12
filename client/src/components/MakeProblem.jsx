import React from 'react';
import styled from 'styled-components';

import OxIcon from '../icons/Ox';
import ListIcon from '../icons/List';
import SurveyIcon from '../icons/Survey';
import TrashIcon from '../icons/Trash';
import CheckIcon from '../icons/Check';
import OIcon from '../icons/O';
import XIcon from '../icons/X';

const ProblemContainer = styled.div`
  margin: 0.25rem 0;
  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-template-columns: 25% 1fr auto 25%;
  grid-template-areas:
    'number question icons .'
    'number choice choice .'
    'number counter counter .'
    'number explanation explanation .';

  @media all and (max-width: 1023px) {
    grid-template-columns: 25% 45% 15% 15%;
  }
  @media all and (max-width: 767px) {
    margin: 0 1rem;
    grid-template-rows: auto auto auto auto auto;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-areas:
      'number icons icons'
      'question question question'
      'choice choice choice'
      'counter counter counter'
      'explanation explanation explanation';
  }
`;
const ProblemNum = styled.div`
  grid-area: number;
  text-align: end;
  color: var(--orangey-yellow);
  font-size: ${(props) => props.font_size};
  opacity: 0.5;
  margin-right: 1rem;

  @media all and (max-width: 767px) {
    font-size: 2rem;
    text-align: start;
    margin-top: 1rem;
  }
`;

const Question = styled.textarea`
  grid-area: question;
  height: 24px;
  margin: 1rem 0.5rem 0 0;
  line-height: 120%;
  word-wrap: break-word;
  word-break: break-word;
  font-size: 1.25rem;
  font-family: 'GongGothicMedium', sans-serif;
  resize: none;
  @media all and (max-width: 767px) {
    /* margin-top: 0.5rem; */
    height: 19px;
    font-size: 1rem;
  }
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  grid-area: icons;
  margin-top: 1rem;
`;
const Icon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0.25rem;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  :hover {
    svg {
      fill: black;
    }
  }
  :focus {
    svg {
      fill: var(--orangey-yellow);
    }
  }
`;
const ChoicesContainer = styled.ol`
  grid-area: choice;
  margin-top: 0.5rem;
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
  margin-bottom: 0.25rem;
  font-size: 1rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;
const ChoiceContent = styled.textarea`
  flex: 1;
  width: 100%;
  height: 24px;
  margin: 0.25rem 0.5rem 0.25rem 0;
  color: black;
  font-size: 1rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;
const Counter = styled.div`
  display: flex;
  justify-content: center;
  grid-area: counter;
  width: 100%;
`;
const Plus = styled.div`
  width: 2rem;
  height: 2rem;
  margin-left: 1rem;
  background-color: var(--warm-grey-50);
  border-radius: 1rem;
  margin-top: 1rem;
  p {
    margin: 0.5rem 0;
    text-align: center;
    color: white;
  }
`;
const Minus = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  margin-top: 1rem;
  background-color: var(--red-50);

  p {
    margin: 0.5rem 0;
    text-align: center;
    color: white;
  }
`;

const Check = styled.div`
  display: flex;
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  svg {
    align-self: start;
  }
`;
const ExplanationContainer = styled.div`
  grid-area: explanation;
`;
const Explanation = styled.textarea`
  height: 33px;
  width: calc(100% - 1.5rem - 2px);
  margin: 1rem 0;
  padding: 0.5rem 0.75rem;
  border: 1px dashed var(--warm-grey);
  border-radius: 10px;
  background-color: white;
  color: var(--warm-grey);
  font-size: 0.75rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
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

const MakeProblem = ({ problem, data, setData, idx, navRefs }) => {
  const autoGrow = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleClick = (e) => {
    console.log(e.target.id);
    const choices = [...problem.choices];

    if (e.target.id[0] === 'i' && choices.length < 10) {
      choices.push({ index: choices.length + 1, content: '' });
    } else if (e.target.id[0] === 'd' && choices.length > 2) {
      choices.pop();
    }

    const problems = [...data.problems];

    if (e.target.id[0] === 's') {
      problems[idx].answer = 0;
    } else if (e.target.id[0] === 'a') {
      problems[idx].answer = Number(e.target.id[1]) + 1;
    } else if (e.target.id[0] === 'O') {
      problems[idx].answer = 1;
    } else if (e.target.id[0] === 'X') {
      problems[idx].answer = 2;
    }

    if (e.target.id[0] === 't') {
      problems.splice(idx, 1);
    } else {
      problems.splice(idx, 1, { ...problem, choices });
    }

    setData({ ...data, problems });
  };

  const handleToggle = () => {
    const problems = [...data.problems];
    if (problem.isOX) {
      problems[idx].isOX = false;
    } else problems[idx].isOX = true;

    setData({ ...data, problems });
  };

  const handleChange = (e) => {
    const problems = [...data.problems];
    const choices = [...problem.choices];
    if (e.target.id[0] === 'q') problems[idx].question = e.target.value;
    else if (e.target.id[0] === 'e') problems[idx].explanation = e.target.value;
    else if (e.target.id[0] === 'c') {
      choices[e.target.id[1]].content = e.target.value;
      problems.splice(idx, 1, { ...problem, choices });
    }

    setData({ ...data, problems });
  };

  return (
    <ProblemContainer ref={(el) => (navRefs.current[idx] = el)}>
      <ProblemNum font_size={idx + 1 > 99 ? '6rem' : '8rem'}>
        <p>{idx + 1}</p>
      </ProblemNum>
      {problem.isOX ? (
        <>
          <Question
            placeholder="문제를 입력해주세요."
            onInput={autoGrow}
            onChange={handleChange}
            value={problem.question}
            id="question"
          />
          <IconContainer>
            <Icon onClick={handleClick} id="survey" answer={problem.answer === 0}>
              <SurveyIcon
                fill="var(--warm-grey)"
                fill={problem.answer === 0 ? 'var(--orangey-yellow)' : 'var(--warm-grey)'}
              />
            </Icon>
            <Icon onClick={handleToggle}>
              <ListIcon fill="var(--warm-grey)" />
            </Icon>
            <Icon onClick={handleClick} id="trash">
              <TrashIcon fill="var(--warm-grey)" />
            </Icon>
          </IconContainer>
          <OxChoices>
            <OxCard onClick={handleClick} id="O">
              <OIcon
                id="O"
                fill={problem.answer === 1 ? 'var(--orangey-yellow)' : 'var(--warm-grey)'}
              />
            </OxCard>
            <OxCard onClick={handleClick} id="X">
              <XIcon
                id="X"
                fill={problem.answer === 2 ? 'var(--orangey-yellow)' : 'var(--warm-grey)'}
              />
            </OxCard>
          </OxChoices>
          <ExplanationContainer>
            <Explanation
              placeholder="해설"
              onChange={handleChange}
              value={problem.explanation}
              id="explanation"
            />
          </ExplanationContainer>
        </>
      ) : (
        <>
          <Question
            placeholder="문제를 입력해주세요."
            onInput={autoGrow}
            onChange={handleChange}
            value={problem.question}
            id="question"
          />
          <IconContainer>
            <Icon onClick={handleClick} id="survey">
              <SurveyIcon
                id="survey"
                fill={problem.answer === 0 ? 'var(--orangey-yellow)' : 'var(--warm-grey)'}
              />
            </Icon>
            <Icon onClick={handleToggle}>
              <OxIcon fill="var(--warm-grey)" />
            </Icon>
            <Icon onClick={handleClick} id="trash">
              <TrashIcon fill="var(--warm-grey)" />
            </Icon>
          </IconContainer>
          <ChoicesContainer>
            {problem.choices.map((choice, idx) => (
              <Choice
                backgroundColor={
                  choice.index === problem.answer ? 'var(--orangey-yellow-50)' : ''
                }
                key={`choice ${idx + 1}`}
              >
                <ChoiceNum
                  color={choice.index === problem.answer ? 'black' : ''}
                  fontWeight={choice.index === problem.answer ? 'bold' : 'initial'}
                >{`${idx + 1}.`}</ChoiceNum>
                <ChoiceContent
                  placeholder={`${idx + 1}번 보기`}
                  onChange={handleChange}
                  value={choice.content}
                  id={`c${idx}`}
                  onInput={autoGrow}
                />
                <Check onClick={handleClick} id={`a${idx}`}>
                  <CheckIcon
                    idx={`${idx}`}
                    fill={choice.index === problem.answer ? 'black' : 'var(--warm-grey)'}
                  />
                </Check>
              </Choice>
            ))}
          </ChoicesContainer>
          {/* <CounterContainer>
              <CountController onClick={handleClick} id="decrease">
              <DecreaseIcon id="decrease" fill="var(--warm-grey)" />
              </CountController>
              <Counter>{problem.choices.length}</Counter>
              <CountController onClick={handleClick} id="increase">
              <IncreaseIcon id="increase" fill="var(--warm-grey)" />
              </CountController>
            </CounterContainer> */}
          <Counter>
            <Minus onClick={handleClick} id="decrease">
              <p id="decrease">-</p>
            </Minus>
            <Plus onClick={handleClick} id="increase">
              <p id="increase">+</p>
            </Plus>
          </Counter>
          <ExplanationContainer>
            <Explanation
              placeholder="해설"
              onChange={handleChange}
              value={problem.explanation}
              id="explanation"
              onInput={autoGrow}
            />
          </ExplanationContainer>
        </>
      )}
    </ProblemContainer>
  );
};

export default MakeProblem;
