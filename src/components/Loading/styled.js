import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0 0 0 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 30px;
  background: rgba(0, 0, 0, 0.8);

  span {
    z-index: 2;
  }
`;
