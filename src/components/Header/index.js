import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaPowerOff,
  FaUser,
  FaCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { Nav } from './styled';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  return (
    <>
      <Nav>
        <Link to="/" title="Home">
          <FaHome size={24} />
        </Link>
        <Link to="/register" title="Registrar">
          <FaUser size={24} />
        </Link>
        <div>
          {id ? (
            <>
              <Link to="/">
                <FaPowerOff
                  title="Sair"
                  size={24}
                  onClick={() => {
                    dispatch(actions.loginFailure({}));
                    toast.success('Deslogado com sucesso');
                    history.push('/');
                  }}
                />
              </Link>
              <FaCircle size={24} color="#66ff33" title="Logado" />
            </>
          ) : (
            <Link to="/login" title="Entrar">
              <FaSignInAlt size={24} />
            </Link>
          )}
        </div>
      </Nav>
    </>
  );
}
