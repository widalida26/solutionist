import React from 'react';
import styled from 'styled-components';
import { VscGithub, VscRepo, VscGithubAlt } from 'react-icons/vsc';

const StyledFooter = styled.footer`
  padding: 2rem;
  border-top: 2px solid var(--light--gray);
  background-color: var(--pale--gray);
`;

const Container = styled.div`
  display: flex;
  margin-bottom: 3rem;
  gap: 3rem;
`;

const DescWrapper = styled.div`
  flex: 2;
`;

const Wrapper = styled.div`
  flex: 1;
`;

const Heading = styled.h1`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--black);
`;

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
  );
};

export default Footer;
