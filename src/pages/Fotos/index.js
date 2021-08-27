import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
  const id = get(match, 'params.id', '');
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
      } catch {
        toast.error('Erro ao carregar imagem');
        history.push('/');
      }
      setIsLoading(false);
    };
    getData();
  }, [id]);

  const handleChange = async (e) => {
    const novaFoto = e.target.files[0];
    const fotoURL = URL.createObjectURL(novaFoto);
    setFoto(fotoURL);
    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', novaFoto);

    try {
      setIsLoading(true);
      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Foto enviada com sucesso!');
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      toast.error('Erro ao enviar foto');
      if (status === 401) dispatch(actions.loginFailure());
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>
      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape().isRequired,
};
