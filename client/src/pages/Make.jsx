import * as React from 'react';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';
import MakeProblem from '../components/MakeProblem';
import { FaPlusSquare } from 'react-icons/fa';

const MakeContainer = styled.div`
  padding: 60px 0;
`;
const Title = styled.textarea`
  width: 56.6%;
  height: 78px;
  margin: 0 0 0 21.7%;
  font-size: 3.75rem;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;
const Desc = styled.textarea`
  margin: 30px 21.7% 0;
  width: 56.6%;
  height: 46px;
  font-size: 2rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;
const Blank = styled.div`
  margin: 0 21.7%;
  width: 56.6%;
  height: 2rem;
  border-bottom: 2px solid var(--orangey-yellow);
  font-size: 2rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;
const AddButton = styled.div`
  display: grid;
  grid-template-columns: 1fr 56.6% 1fr;
  grid-template-rows: 1fr;
  font-size: 5rem;
  color: var(--warm-grey);
  opacity: 0.5;
  justify-items: end;

  svg {
    margin-right: 1.5rem;
  }
  svg:hover {
    color: black;
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
          id: data.problems.length + 1,
          index: data.problems.length + 1,
          question: '',
          answer: '',
          explanation: '',
          isOx: false,
          choices: [
            { id: 1, index: 1, content: '' },
            { id: 2, index: 2, content: '' },
          ],
        },
      ],
    });
  };

  const autoGrow = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
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
      {data.problems.length ? (
        <>
          {data.problems.map((problem, idx) => (
            <MakeProblem
              key={problem.id}
              problem={problem}
              data={data}
              setData={setData}
              idx={idx}
              addProblem={addProblem}
            />
          ))}
        </>
      ) : (
        <AddButton>
          <FaPlusSquare onClick={addProblem} />
        </AddButton>
      )}
    </MakeContainer>
  );
};

export default Make;
