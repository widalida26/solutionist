import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginModal from './LoginModal';
import MenuDropDown from './MenuDropDown';

const NavContainer = styled.div`
  width: 100vw;
  height: 70px;
  background-color: white;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
`;

const NavGrid = styled.div`
  width: calc(100% - 12.8%);
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: 'logo logo . make solve . . . search search search login';
  align-items: center;
  margin: 0 6.4%;
  grid-gap: 1rem;
`;

const LogoContainer = styled.div`
  grid-area: logo;
`;
const MakeContainer = styled.div`
  grid-area: make;
  display: flex;
  width: 100%;
  font-size: 1.75rem;
  justify-content: center;
`;
const SolveContainer = styled.div`
  grid-area: solve;
  display: flex;
  width: 100%;
  font-size: 1.75rem;
  justify-content: center;
`;
const SearchContainer = styled.div`
  grid-area: search;
  display: flex;
  align-items: center;
  /* background-color: black; */
`;
const SearchInput = styled.input`
  width: calc(100% - 55px);
  height: 48px;
  border-bottom: 2px solid black;
  padding: 0 0 0 5px;
  font-size: 1.5rem;
  font-family: 'GowunDodum-Regular', sans-serif;
`;

const SearchIconContainer = styled.div`
  width: 46px;
  height: 46px;
  background-color: var(--butterscotch);
  border: 2px solid black;
  border-radius: 10px 10px 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  height: 50px;
  grid-area: login;
  font-size: 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid black; */
  background-color: black;
  border-radius: 10px;

  > a {
    color: var(--butterscotch);
  }
`;
const MenuIconContainer = styled.div`
  grid-area: login;
`;

const Nav = () => {
  const [keyword, setKeyword] = useState('');
  const [isDropDown, setIsDropDown] = useState(false);

  const handleDropDown = () => {
    if (isDropDown) setIsDropDown(false);
    else setIsDropDown(true);
  };

  return (
    <NavContainer>
      <NavGrid>
        <LogoContainer>
          <Link to="/">Solutionist</Link>
        </LogoContainer>
        <MakeContainer>
          <Link to="/make">MAKE</Link>
        </MakeContainer>
        <SolveContainer>
          <Link to="/solve">SOLVE</Link>
        </SolveContainer>
        <SearchContainer onSubmit={() => false}>
          <SearchInput
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search..."
          />
          <SearchIconContainer>
            <img src="./assets/icons/search.svg" alt="search-icon" />
          </SearchIconContainer>
        </SearchContainer>
        {0 ? (
          // 리덕스를 사용한다면 isLogin이 올 자리
          <MenuIconContainer>
            <img src="./assets/icons/menu.svg" alt="menu-icon" onClick={handleDropDown} />
          </MenuIconContainer>
        ) : (
          <LoginContainer>
            <Link to="/myset">LOGIN</Link>
          </LoginContainer>
        )}
        {isDropDown ? <MenuDropDown handleDropDown={handleDropDown} /> : ''}
      </NavGrid>
    </NavContainer>
  );
};

export default Nav;
