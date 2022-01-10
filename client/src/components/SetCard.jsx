import * as React from 'react';
import styled from 'styled-components';

import SubmenuIcon from '../icons/Submenu';

const SetContainer = styled.div`
  width: 100%;
  height: 15rem;
  background-color: white;
  border: 1px solid var(--warm-grey);
  border-radius: 10px;
`;
const SetInfoContainer = styled.div`
  height: calc(100% - 2rem);
  margin: 1rem;
`;
const SetName = styled.div`
  font-size: 1.25rem;
`;
const SetDesc = styled.div`
  margin-top: 1rem;
  font-family: 'GowunDodum-Regular', sans-serif;
`;

const SetCard = () => {
  return (
    <SetContainer>
      <SetInfoContainer>
        <SetName>아주 쉬운 문제들</SetName>
        <SetDesc>정말 쉬워서 발로 풀어도 100점 맞을 수 있습니다.</SetDesc>
        <SubmenuIcon></SubmenuIcon>
      </SetInfoContainer>
    </SetContainer>
  );
};

export default SetCard;
