import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import MenuDropDownContainer from '../containers/MenuDropDownContainer';

const UnderlineFadeIn = keyframes`
  from {
    box-shadow: 0 0 0 0px inset var(--butterscotch);
  }
  to{
    box-shadow: 0 -5px 0 0px inset var(--butterscotch);
  }
`;

const NavContainer = styled.div`
  width: 100vw;
  height: 70px;
  background-color: white;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

  div:last-child {
    z-index: 900;
  }
`;
const NavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: 'logo logo . make solve . . . search search search login';
  grid-gap: 1rem;
  align-items: center;
  width: calc(100% - 12.8%);
  height: 100%;
  margin: 0 6.4%;
`;
const LogoContainer = styled.div`
  grid-area: logo;
  width: 100%;
  height: 100%;
  font-size: 1.75rem;
  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    img {
      height: 100%;
    }
  }
`;
const MakeContainer = styled.div`
  grid-area: make;
  width: 100%;
  height: 100%;
  font-size: 1.75rem;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    &:hover {
      box-shadow: 0 -5px 0 0px inset var(--butterscotch);
      animation: ${UnderlineFadeIn} 0.5s ease;
    }
  }
`;
const SolveContainer = styled.div`
  grid-area: solve;
  width: 100%;
  height: 100%;
  font-size: 1.75rem;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    :hover {
      box-shadow: 0 -5px 0 0px inset var(--butterscotch);
      animation: ${UnderlineFadeIn} 0.5s ease;
    }
  }
`;
const SearchContainer = styled.div`
  grid-area: search;
  display: flex;
  align-items: center;
`;
const SearchInput = styled.input`
  width: calc(100% - 55px);
  height: 48px;
  padding: 0 0 0 5px;
  border-bottom: 2px solid black;
  font-size: 1.5rem;
  font-family: 'GowunDodum-Regular', sans-serif;
`;
const SearchIconContainer = styled.div`
  width: 46px;
  height: 46px;
  border: 2px solid black;
  border-radius: 10px 10px 10px 0;
  background-color: var(--butterscotch);
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;
const LoginContainer = styled.div`
  grid-area: login;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: black;
  font-size: 1.75rem;
  :hover {
    opacity: 0.75;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: var(--butterscotch);
  }
`;
const MenuIconContainer = styled.div`
  grid-area: login;
`;

const Nav = ({ onLoginModalOnAction, isLogin }) => {
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
          <Link to="/">
            <img src="/assets/images/header.png" />
          </Link>
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
            <Link to="/search">
              <img src="/assets/icons/search.svg" alt="search-icon" />
            </Link>
          </SearchIconContainer>
        </SearchContainer>
        {isLogin ? (
          <MenuIconContainer>
            <img src="/assets/icons/menu.svg" alt="menu-icon" onClick={handleDropDown} />
          </MenuIconContainer>
        ) : (
          <LoginContainer onClick={onLoginModalOnAction}>
            <span>LOGIN</span>
          </LoginContainer>
        )}
      </NavGrid>
      {isDropDown ? <MenuDropDownContainer handleDropDown={handleDropDown} /> : ''}
    </NavContainer>
  );
};

export default Nav;
