import * as React from 'react';
import styled from 'styled-components';
import MakeProblem from '../components/MakeProblem';

const MakeContainer = styled.div`
  padding: 60px 0;
`;
const Header = styled.div`
  margin: 0 21.7%;
  font-size: 3.75rem;
`;
const Desc = styled.div`
  margin: 30px 21.7% 0;
  padding-bottom: 60px;
  border-bottom: 2px solid var(--orangey-yellow);
  font-size: 2rem;
  font-family: 'GowunDodum-Regular', sans-serif;
`;

const Make = () => {
  return (
    <MakeContainer>
      <Header>아주 쉬운 문제들</Header>
      <Desc>정말 쉬워서 발로 풀어도 100점 맞을 수 있습니다.</Desc>
      <MakeProblem />
      <MakeProblem />
    </MakeContainer>
  );
};

export default Make;
