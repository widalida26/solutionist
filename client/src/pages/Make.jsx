import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import MakeProblem from '../components/MakeProblem';
import { FaPlusSquare, FaSave } from 'react-icons/fa';

const MakeContainer = styled.div`
  padding: 60px 0;
`;
const Title = styled.textarea`
  width: 56.6%;
  height: 70px;
  margin: 0 0 0 21.7%;
  font-size: 3.75rem;
  font-family: 'GongGothicMedium', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;
const Desc = styled.textarea`
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
const Button = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 56.6% 1fr;
  color: var(--warm-grey);
  font-size: 5rem;
  opacity: 0.5;
  svg {
    margin: 1rem 1.5rem;
    :hover {
      color: black;
    }
    :first-child {
      justify-self: end;
    }
  }
`;

const Make = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    problems: [],
  });
  console.log(data);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addProblem = () => {
    setData({
      ...data,
      problems: [
        ...data.problems,
        {
          index: data.problems.length + 1,
          question: '',
          answer: '',
          explanation: '',
          isOx: false,
          choices: [
            { index: 1, content: '' },
            { index: 2, content: '' },
          ],
        },
      ],
    });
  };

  const autoGrow = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleSave = () => {
    for (let problem of data.problems) {
      if (problem.question === '') {
        console.log('please fill question');
        return 0;
      }
    }
    axios.post(`${process.env.SERVER_URL}choices`, data);
  };

  return (
    <MakeContainer>
      <Title
        placeholder="세트 제목을 입력해주세요."
        value={data.title}
        onChange={handleChange}
        name="title"
        onInput={autoGrow}
      />
      <Desc
        placeholder="세트 설명을 입력해주세요."
        value={data.description}
        onChange={handleChange}
        name="description"
        onInput={autoGrow}
      />
      <Blank />
      {data.problems.map((problem, idx) => (
        <MakeProblem
          key={problem.index}
          problem={problem}
          data={data}
          setData={setData}
          idx={idx}
          addProblem={addProblem}
        />
      ))}

      <Button>
        <FaPlusSquare onClick={addProblem} />
        <div></div>
        <FaSave onClick={handleSave} />
      </Button>
    </MakeContainer>
  );
};

export default Make;
