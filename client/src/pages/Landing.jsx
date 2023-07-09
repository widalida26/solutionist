import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';
import Footer from '../components/Footer';
import { FaArrowRight } from 'react-icons/fa';

const FadeIn = keyframes`
  from{
    opacity:0;
  }
  to{
    opacity:1;
  }
`;

const SectionContainer = styled.div`
  height: calc(100vh - 3rem);
  overflow: auto;
  scroll-snap-type: y mandatory;
`;
const Section = styled.div`
  padding: 2rem;
<<<<<<< HEAD
  height: calc(100vh - 7rem);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  scroll-snap-align: center;
  justify-content: space-evenly;
=======
  width: calc(100vw - 4rem);
  height: calc(100vh - 7rem);
  display: flex;
  align-items: center;
  font-size: 5rem;
  scroll-snap-align: center;
  justify-content: center;
  overflow: hidden;

  :nth-child(2n) {
    flex-direction: row-reverse;
    background: white;
  }
  img {
    height: 100%;
  }
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9

  :first-child {
    position: relative;
    > img {
      position: absolute;
      opacity: 0.1;
      object-fit: cover;
      width: 100%;
    }
    ::before {
      content: '';
      width: 100%;
      height: 100%;
<<<<<<< HEAD
      background-image: url('assets/images/LandingBG.png');
=======
      background-image: url('/assets/images/LandingBG.png');
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
      background-size: cover;
      opacity: 0.1;
      z-index: 0;
      position: absolute;
    }
  }
<<<<<<< HEAD
  flex-direction: row-reverse;
  @media all and (max-width: 1023px) {
    flex-direction: column;
    justify-content: center;
=======

  @media all and (orientation: portrait) {
    flex-direction: column-reverse;
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
    :nth-child(2n) {
      flex-direction: column-reverse;
    }
  }
<<<<<<< HEAD
  :nth-child(2n) {
    background: white;
  }
  img {
    height: 100%;
  }
=======
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
`;

const HeaderContainer = styled.div`
  text-align: center;
  z-index: 1;
  user-select: none;
`;
const Header = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
<<<<<<< HEAD
  /* animation: ${FadeIn} 1s ease; */
=======
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
  p {
    font-size: 1.75rem;
    word-wrap: break-word;
    word-break: keep-all;
    margin-bottom: 0.25rem;
    font-family: 'GongGothicMedium', sans-serif;
    :nth-child(2) {
      font-size: 3rem;
      color: var(--butterscotch);
      background-color: rgba(0, 0, 0, 0.75);
      padding: 0.5rem 0 0.25rem;
    }
  }
  img {
    margin-top: 0.25rem;
    height: 3rem;
  }
<<<<<<< HEAD
=======
  @media all and (max-width: 767px) {
    p {
      font-size: 1.5rem;
      :nth-child(2) {
        font-size: 2.5rem;
      }
    }
    img {
      margin-top: 0.25rem;
      height: 2.5rem;
    }
  }
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
`;
const HeaderContent = styled.div`
  font-size: 1rem;
  p {
    margin-bottom: 0.25rem;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;
const TextContainer = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
  max-width: 500px;
  user-select: none;
  animation: ${FadeIn} 1s ease;
  @media all and (max-width: 1023px) {
    margin: 0;
    width: 100%;
  }
<<<<<<< HEAD
=======
  @media all and (max-width: 767px) {
    font-size: 0.75rem;
    width: auto;
  }
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
`;
const Subheader = styled.div`
  font-size: 3rem;
  margin-bottom: 2rem;
  word-wrap: break-word;
  word-break: keep-all;
  user-select: none;
  p {
    margin-bottom: 0.25rem;
    font-family: 'GongGothicMedium', sans-serif;
    line-height: 120%;
  }
  div {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-family: 'Noto Sans KR', sans-serif;
  }
<<<<<<< HEAD
=======
  @media all and (max-width: 767px) {
    font-size: 2rem;
  }
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
`;
const Content = styled.div`
  p {
    font-weight: 300;
    font-family: 'Noto Sans KR', sans-serif;
    margin-bottom: 0.25rem;
    word-wrap: break-word;
    word-break: keep-all;
  }
`;
const ImageContainer = styled.div`
<<<<<<< HEAD
  flex: 2;
=======
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
  z-index: 1;
  height: 100%;
  max-width: 600px;
  max-height: 600px;
<<<<<<< HEAD

=======
  margin: 1rem;

  @media all and (orientation: portrait) {
    height: 50vh;
  }
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }
`;
const Chicken = styled.div`
  margin-top: 2rem;
`;
const Last = styled.div`
  scroll-snap-align: center;
`;

const Landing = () => {
  const [secNum, setSecNum] = useState(1);
  const secRef = useRef([]);

  const delay = 1000;
  const [lastScroll, setLastScroll] = useState(0);

  const handleWheel = (e) => {
    if (lastScroll + delay < Date.now()) {
      if (e.deltaY < 0) {
        if (secNum > 1) {
          setLastScroll(Date.now());
          setSecNum(secNum - 1);
        }
      } else if (secNum < 6) {
        setLastScroll(Date.now());
        setSecNum(secNum + 1);
      }
    }
  };

  if (secRef.current[0]) {
    secRef.current[secNum].scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  useEffect(() => {
    const cancelWheel = (e) => secRef.current[0] && e.preventDefault();
    document.body.addEventListener('wheel', cancelWheel, { passive: false });
  }, []);

  return (
    <SectionContainer ref={(el) => (secRef.current[0] = el)} onWheel={handleWheel}>
      <Section ref={(el) => (secRef.current[1] = el)}>
<<<<<<< HEAD
        <ImageContainer>
          <img src="assets/images/Section1.png" />
        </ImageContainer>
=======
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
        <HeaderContainer>
          <Header>
            <p>다 함께 만들어가는</p>
            <p>문제 아카이브</p>
            <div>
<<<<<<< HEAD
              <img src="assets/images/LandingLOGO.png" />
=======
              <img src="/assets/images/LandingLOGO.png" />
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
            </div>
          </Header>
          <HeaderContent>
            <p>쉽게 문제를 만들고, 풀고, 공유해보세요.</p>
          </HeaderContent>
        </HeaderContainer>
<<<<<<< HEAD
=======
        <ImageContainer>
          <img style={{ margin: '0 0 0 1rem' }} src="/assets/images/Section1.png" />
        </ImageContainer>
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
      </Section>
      <Section ref={(el) => (secRef.current[2] = el)}>
        <TextContainer>
          <Subheader>
            <div>가장 먼저!</div>
            <p>만들어진 문제를 풀어보세요!</p>
          </Subheader>
          <Content>
            <p>풀고 나서 결과를 확인해보세요.</p>
            <p>다른 사람들의 생각도 알 수 있습니다.</p>
          </Content>
<<<<<<< HEAD
          <Link to="/make">
=======
          <Link to="/solve/41">
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
            <Chicken>
              치킨 모의고사 풀러가기 <FaArrowRight size="0.75rem" />
            </Chicken>
          </Link>
        </TextContainer>
        <ImageContainer>
<<<<<<< HEAD
          <img src="assets/images/Section2.gif" />
        </ImageContainer>
      </Section>
      <Section ref={(el) => (secRef.current[3] = el)}>
        <ImageContainer>
          <img src="assets/images/Section3.gif" />
        </ImageContainer>
=======
          <img src="/assets/images/Section2.gif" />
        </ImageContainer>
      </Section>
      <Section ref={(el) => (secRef.current[3] = el)}>
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
        <TextContainer>
          <Subheader>
            <div>원하는 문제가 없을땐...</div>
            <p>문제를 만들어보세요!</p>
          </Subheader>
          <Content>
            <p>SOLUTIONIST에서는</p>
            <p>객관식과 OX 문제,</p>
            <p>설문조사를 만들 수 있습니다.</p>
          </Content>
          <Link to="/make">
            <Chicken>
              문제 만들기로 이동 <FaArrowRight size="0.75rem" />
            </Chicken>
          </Link>
        </TextContainer>
<<<<<<< HEAD
=======
        <ImageContainer>
          <img src="/assets/images/Section3.gif" />
        </ImageContainer>
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
      </Section>
      <Section ref={(el) => (secRef.current[4] = el)}>
        <TextContainer>
          <Subheader>
            <div>다 만드셨나요?</div>
            <p>공유해보세요.</p>
          </Subheader>
          <Content>
            <p>공유된 링크에서 바로 문제를 풀 수 있어요.</p>
            <p>모바일부터 PC까지 모든 기기에서 가능합니다.</p>
          </Content>
        </TextContainer>
        <ImageContainer>
<<<<<<< HEAD
          <img src="assets/images/Section4.gif" />
        </ImageContainer>
      </Section>
      <Section ref={(el) => (secRef.current[5] = el)}>
        <ImageContainer>
          <img src="assets/images/Section5.gif" />
        </ImageContainer>
        <TextContainer>
          <Subheader>
            <p>모두 다 함께</p>
            <p>문제를 만들수 있어요.</p>
=======
          <img src="/assets/images/Section4.gif" />
        </ImageContainer>
      </Section>
      <Section ref={(el) => (secRef.current[5] = el)}>
        <TextContainer>
          <Subheader>
            <p>모두 다 함께</p>
            <p>문제를 만들 수 있어요.</p>
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
          </Subheader>
          <Content>
            <p>이미 작성 되어있는 문제 모음에</p>
            <p>문제를 추가하거나,</p>
            <p>오타를 수정할 수 있어요.</p>
          </Content>
          <Link to="/solve">
            <Chicken>
              다른 사람들의 문제 보러가기 <FaArrowRight size="0.75rem" />
            </Chicken>
          </Link>
        </TextContainer>
<<<<<<< HEAD
=======
        <ImageContainer>
          <img src="/assets/images/Section5.gif" />
        </ImageContainer>
>>>>>>> b3809381a7caab4437f8421609f8f37e712d8ab9
      </Section>
      <Last ref={(el) => (secRef.current[6] = el)}>
        <Footer />
      </Last>
    </SectionContainer>
  );
};

export default Landing;
