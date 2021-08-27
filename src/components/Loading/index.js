import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styled';

// eslint-disable-next-line react/prop-types
export default function Loading({ isLoading }) {
  if (!isLoading) return <> </>;
  return (
    <Container>
      <span>Carregando...</span>
    </Container>
  );
}
Loading.defaultProps = {
  isLoading: false,
};
Loading.proTypes = {
  isLoading: PropTypes.bool,
};
