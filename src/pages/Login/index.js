import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login(props) {
  const prevPath = get(props, 'location.state.prevPath', '/');
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let formErrors = false;
  const isLoading = useSelector((state) => state.auth.isLoading);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }
    if (password.length < 4 || password.length > 16) {
      formErrors = true;
      toast.error('Senha inválida');
    }
    if (formErrors) return;
    dispatch(actions.loginRequest({ email, password, prevPath }));
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>
        <button type="submit"> Fazer Login </button>
      </Form>
    </Container>
  );
}
