import React from 'react';
import { Link } from 'react-router-dom';
import ContainerPage from '../container';
import { HeaderStyled } from './header.style';

const Header = () => (
  <HeaderStyled>
    <ContainerPage>
      <Link to="/">
        <h3>ALAMI App</h3>
      </Link>
    </ContainerPage>
  </HeaderStyled>
);

export default Header;
