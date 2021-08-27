import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  input {
    padding: 0 10px;
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    border-radius: 10px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;
