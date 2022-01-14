import * as React from 'react';
import styled from 'styled-components';

import SetCard from '../components/SetCard';
import MoveTopButton from '../components/MoveTopButton';

const SetsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 56.6% 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    '. header .'
    '. cards .';
  margin-top: 60px;
  margin-bottom: 2rem;
  grid-row-gap: 2rem;
  grid-column-gap: 1rem;
`;

const Header = styled.div`
  grid-area: header;
  font-size: 3.75rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  grid-area: cards;
`;

const Divider = styled.div`
  width: 56.6%;
  height: 2px;
  margin: 0 21.7%;
  background-color: var(--orangey-yellow);
`;

const MySet = () => {
  return (
    <>
      <SetsContainer>
        {/* 상단 이동 버튼 테스트 */}
        <MoveTopButton />
        <Header>내가 만든 세트</Header>
        <CardsContainer>
          <SetCard></SetCard>
          <SetCard></SetCard>
          <SetCard></SetCard>
          <SetCard></SetCard>
          <SetCard></SetCard>
          <SetCard></SetCard>
        </CardsContainer>
      </SetsContainer>
      <Divider />
      <SetsContainer>
        <Header>내가 푼 세트</Header>
        <CardsContainer>
          <SetCard></SetCard>
          <SetCard></SetCard>
          <SetCard></SetCard>
          <SetCard></SetCard>
          <SetCard></SetCard>
          <SetCard></SetCard>
        </CardsContainer>
      </SetsContainer>
    </>
  );
};

export default MySet;
