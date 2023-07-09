import React from 'react';
<<<<<<< HEAD
import styled from 'styled-components';
import { VscGithub, VscRepo, VscGithubAlt } from 'react-icons/vsc';

const StyledFooter = styled.footer`
=======
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { VscGithub, VscRepo } from 'react-icons/vsc';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
  padding: 2rem;
  border-top: 2px solid var(--light--gray);
  background-color: var(--pale--gray);
`;

<<<<<<< HEAD
const Container = styled.div`
  display: flex;
  margin-bottom: 3rem;
  gap: 3rem;
`;

const DescWrapper = styled.div`
  flex: 2;
  @media all and (max-width: 1023px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  flex: 1;
`;

const Heading = styled.h1`
  font-size: 1.25rem;
=======
const Header = styled.h1`
  font-size: 1rem;
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
  margin-bottom: 1rem;
  color: var(--black);
`;

<<<<<<< HEAD
const Paragraph = styled.p`
  word-break: keep-all;
`;

const Items = styled.ul``;

const Item = styled.li`
  :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Link = styled.a`
  text-decoration: none;

  svg {
    vertical-align: text-bottom;
    font-size: 1.25rem;
    margin-right: 0.5rem;
  }
`;

const Copyright = styled.span``;

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <DescWrapper>
          <Heading>INTRODUCTION</Heading>
          <Paragraph>
            SOLUTIONIST는 객관식, OX 문제와 정답이 없는 설문조사 폼을 공동 참여해서 만들
            수 있고, 만들어진 세트를 풀고 공유할 수 있는 웹서비스입니다.
          </Paragraph>
          <br />
          <Paragraph>
            객관식, OX 문제와 정답이 없는 설문조사 폼을 공동 참여해서 만들 수 있습니다.
          </Paragraph>
          <Paragraph>만들어진 세트를 풀어보고 결과를 확인할 수 있습니다.</Paragraph>
          <Paragraph>공유 기능을 통해 다른 사람들과 세트를 풀어볼 수 있습니다.</Paragraph>
        </DescWrapper>
        <Wrapper>
          <Heading>TEAM MEMBER</Heading>
          <Items>
            <Item>
              <Link href="https://github.com/JAM-PARK" target="_blank">
                <VscGithubAlt />
                박재민 Front-End
              </Link>
            </Item>
            <Item>
              <Link href="https://github.com/jlthepi" target="_blank">
                <VscGithubAlt />
                이병찬 Front-End
              </Link>
            </Item>
            <Item>
              <Link href="https://github.com/widalida26" target="_blank">
                <VscGithubAlt />
                위다빈 Back-End
              </Link>
            </Item>
            <Item>
              <Link href="https://github.com/inde153" target="_blank">
                <VscGithubAlt />
                김동언 Back-End
              </Link>
            </Item>
          </Items>
        </Wrapper>
        <Wrapper>
          <Heading>ABOUT</Heading>
          <Items>
            <Item>
              <Link href="https://github.com/codestates/solutionist" target="_blank">
                <VscGithub />
                레포지토리
              </Link>
            </Item>
            <Item>
              <Link href="https://github.com/codestates/solutionist/wiki" target="_blank">
                <VscRepo />
                위키
              </Link>
            </Item>
          </Items>
        </Wrapper>
      </Container>
      <Copyright>© 2022 SOLUTIONIST. All rights reserved.</Copyright>
    </StyledFooter>
=======
const Crew = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  a {
    padding: 0 1rem 0.125rem 1rem;
    margin: 0.5rem 0;
    border-right: 1px solid black;

    :last-child {
      border: none;
    }
  }

  @media all and (max-width: 767px) {
    width: 350px;
    a:nth-child(2) {
      border: none;
    }
  }
`;
const Icons = styled.div`
  padding: 1rem;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  a {
    margin: 0 1rem;
  }
`;
const Copyright = styled.div`
  font-size: 0.75rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Header>TEAM MEMBER</Header>
      <Crew>
        <Link to="https://github.com/JAM-PARK" target="_blank">
          박재민 Front-End
        </Link>
        <Link to="https://github.com/jlthepi" target="_blank">
          이병찬 Front-End
        </Link>
        <Link to="https://github.com/widalida26" target="_blank">
          위다빈 Back-End
        </Link>
        <Link to="https://github.com/inde153" target="_blank">
          김동언 Back-End
        </Link>
      </Crew>
      <Icons>
        <Link to="https://github.com/codestates/solutionist" target="_blank">
          <VscGithub />
        </Link>
        <Link to="https://github.com/codestates/solutionist/wiki" target="_blank">
          <VscRepo />
        </Link>
      </Icons>
      <Copyright>© 2022 SOLUTIONIST. All rights reserved.</Copyright>
    </FooterContainer>
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
  );
};

export default Footer;
