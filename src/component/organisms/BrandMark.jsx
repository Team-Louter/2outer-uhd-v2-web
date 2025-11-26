import React from 'react';
import styled from 'styled-components';

const Wordmark = styled.img`
  height: 56px;
  width: auto;

  @media (max-width: 980px) {
    height: 52px;
  }

  @media (max-width: 640px) {
    height: 48px;
  }
`;

function BrandMark() {
  return (<></>);
}

export default BrandMark;