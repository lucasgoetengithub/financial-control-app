import React, { useState, useEffect }  from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import * as S from "./styles";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import api from "../../service/api.js";

import Header from '../../components/HeaderLoginRegister';
import Footer from '../../components/Footer';



const Button = styled.button`
  background-color: #1976d2;
  color: white;
  padding: 11px 15px;
  border-radius: 5px;
  border:none;
  outline: 0;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: #1565c0;
  }
`;


const ChangePassword = () => {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codigo, setCodigo] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();

  useEffect(() =>{
    
  });

  const handleRecovery = async (event) => {
    let body = {
      email : email,
      codigo: codigo,
      password: password,
      confirmPassword: confirmPassword
    } ;

    await api.post(`/users/changePassword`, body)
    .then(response => {
      navigate('/login');
    }).catch(err => {
      setError('Nao foi possivel alterar')
    }) 
  };



    return (
        <S.Container>
            <Header/>

            <S.Title>
                <h3>Recuperar senha (Em desenvolvimento)</h3>                    
            </S.Title>

            <S.Content>
            <Stack width='20%' spacing={0.8} direction="column">
              <TextField
                  required
                  id="outlined-required"
                  label="Código de recuperaçao recebido no email"
                  onChange={(e) => [setCodigo(e.target.value), setError("")]}
              />

              <TextField
                  required
                  id="outlined-required"
                  label="Nova senha"
                  type="password"
                  onChange={(e) => [setPassword(e.target.value), setError("")]}
              />
              
              <TextField
                  required
                  id="outlined-required"
                  label="Confirmar nova senha"
                  type="password"
                  onChange={(e) => [setConfirmPassword(e.target.value), setError("")]}
              />

              <Button onClick={handleRecovery}>Trocar senha</Button>
              <S.LabelSignup>

                <S.Strong>
                  <Link to="/login">&nbsp;Fazer login</Link>
                </S.Strong>
              </S.LabelSignup>
            </Stack>
              
            </S.Content>
            

            <Footer/>
        </S.Container>
    )
}

export default ChangePassword;