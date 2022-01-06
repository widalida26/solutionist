import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import MakeProblem from '../components/MakeProblem';
import { FaPlusSquare, FaSave } from 'react-icons/fa';

const MakeContainer = styled.div`
  position: relative;
  height: calc(100% - 190px);
  padding: 60px 0;
  overflow: scroll;
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
const SideNavContainer = styled.div`
  position: sticky;
  float: 0;
  top: 3rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 56.6% 1fr;
`;
const SideRelative = styled.div`
  position: relative;
`;
const SideNav = styled.div`
  position: absolute;
  left: 0;
  margin-left: 1rem;
  padding: 0 1rem;
  border-left: 2px dashed var(--warm-grey);
  color: var(--warm-grey);
  div {
  }
`;
const ProblemQuestion = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  font-weight: ${(props) => props.weight};
`;

const Make = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    problems: [],
  });

  const [curPos, setCurPos] = useState(0);

  console.log(data);

  const makeRef = useRef(null);
  const navRefs = useRef([0]);

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

  const handleNav = (e) => {
    navRefs.current[e.target.id].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  const [Qpos, setQpos] = useState([]);
  useEffect(() => {
    const arr = [0];
    navRefs.current
      .map((el) => {
        if (el) return el.offsetTop;
      })
      .reduce((acc, cur) => {
        if (!isNaN(cur)) {
          arr.push((cur + acc) / 2);
          return cur;
        }
      });
    setQpos(arr);
  }, [data]);

  const handleScroll = (e) => {
    for (let i = 0; i < Qpos.length; i++) {
      if (Qpos[i] < makeRef.current.scrollTop) {
        setCurPos(i);
      }
    }
  };

  console.log(curPos);
  return (
    <MakeContainer onScroll={handleScroll} ref={makeRef}>
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
      <SideNavContainer>
        <div></div>
        <div></div>
        <SideRelative>
          <SideNav>
            {data.problems.map((problem, idx) => (
              <ProblemQuestion
                onClick={handleNav}
                id={idx}
                key={`#Q${idx + 1}`}
                weight={curPos === idx ? 'bold' : 'normal'}
              >
                {idx + 1} &nbsp;&nbsp; {problem.question}
              </ProblemQuestion>
            ))}
          </SideNav>
        </SideRelative>
      </SideNavContainer>
      {data.problems.map((problem, idx) => (
        <MakeProblem
          key={problem.index}
          problem={problem}
          data={data}
          setData={setData}
          idx={idx}
          addProblem={addProblem}
          navRefs={navRefs}
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
