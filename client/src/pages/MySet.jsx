import * as React from 'react';
import styled from 'styled-components';

import SetCard from '../components/SetCard';
import SetCardVerTwo from '../components/SetCardVerTwo';
import MoveTopButton from '../components/MoveTopButton';

const SetsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 56.6% 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    '. header .'
    '. cards .';
  margin: 1.2rem 0;
  grid-row-gap: 1.2rem;
  grid-column-gap: 1rem;
`;

const Header = styled.div`
  grid-area: header;
  font-size: 1.75rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  grid-area: cards;

  div:nth-child(n + 5) {
    display: none;
  }
`;

const ShowBox = styled.section`
  display: flex;
  justify-content: flex-end;
  width: 56.6%;
  margin: 0 21.7% 1.2rem 21.7%;
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
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
        </CardsContainer>
      </SetsContainer>
      <ShowBox>
        <p>Show More</p>
      </ShowBox>
      <Divider />
      <SetsContainer>
        <Header>내가 푼 세트</Header>
        <CardsContainer>
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
          <SetCardVerTwo />
        </CardsContainer>
      </SetsContainer>
      <ShowBox>
        <p>Show More</p>
      </ShowBox>
    </>
  );
};

export default MySet;
