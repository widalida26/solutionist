import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SetCard from '../components/SetCard';
import SetCardVerTwo from '../components/SetCardVerTwo';
import MoveTopButton from '../components/MoveTopButton';

import { useLocation } from 'react-router-dom';
import { searchSets } from '../api/SearchSetAPI';

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
    display: ${(props) => (props.$display ? 'none' : '')};
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

const Search = () => {
  const [isMadeHidden, setIsMadeHidden] = useState(true);
  const handleMadeHidden = () => {
    setIsMadeHidden(!isMadeHidden);
  };

  const [isSolvedHidden, setIsSolvedHidden] = useState(true);
  const handleSolvedHidden = () => {
    setIsSolvedHidden(!isSolvedHidden);
  };

  // * search API
  const [searchedSets, setSearchedSets] = useState({});
  const keyword = new URLSearchParams(useLocation().search).get('title');
  // const [message, setMessage] = useState('검색중...');

  useEffect(() => {
    setSearchedSets({});
    const sendAPICall = async () => {
      const data = await searchSets(keyword);
      console.log(data);
      // setSearchedSets(data);
      if (data.length === 0) {
        // setMessage('검색 결과가 없습니다 :(');
      }
    };
    sendAPICall();
  }, [keyword]);

  return (
    <>
      <SetsContainer>
        {/* 상단 이동 버튼 테스트 */}
        <MoveTopButton />
        <Header>검색 결과</Header>
        <CardsContainer $display={isMadeHidden}>
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
      <ShowBox onClick={handleMadeHidden}>
        {isMadeHidden ? <p>Show More</p> : <p>Show less</p>}
      </ShowBox>
      <Divider />
      {/* <SetsContainer>
        <Header>내가 푼 세트</Header>
        <CardsContainer $display={isSolvedHidden}>
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
      <ShowBox onClick={handleSolvedHidden}>
        {isSolvedHidden ? <p>Show More</p> : <p>Show less</p>}
      </ShowBox> */}
    </>
  );
};

export default Search;
