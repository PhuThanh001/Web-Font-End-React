import React from 'react'
import styled from 'styled-components'

export const WrapperInputStyle = styled.div`
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: rgb(232, 240, 254);
  outline: none;

  &:focus-within {
    background-color: rgb(220, 235, 250);
    border-bottom: 1px solid #007bff;
  }
`;
