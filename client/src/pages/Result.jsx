import * as React from 'react';
import styled from 'styled-components';

const MySetsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 56.7% 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    '. header .'
    '. cards .';
  margin-top: 60px;
  grid-row-gap: 2rem;
  grid-column-gap: 1rem;
`;

const Header = styled.div`
  grid-area: header;
  font-size: 3.75rem;
`;

const Result = () => {
  return (
    <MySetsContainer>
      <Header>Result</Header>
    </MySetsContainer>
  );
};

export default Result;
