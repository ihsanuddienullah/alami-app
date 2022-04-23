import React from 'react';
import { ButtonStyled } from './button.style';

const Button = ({ type, text, onClick }) => (
  <ButtonStyled onClick={onClick} type={type}>
    {text}
  </ButtonStyled>
);

export default Button;
