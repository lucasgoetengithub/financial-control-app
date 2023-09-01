import React, { useState }  from 'react';
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import * as S from "./styles";

import Header from '../../components/HeaderLoginRegister';
import Footer from '../../components/Footer';


import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import useAuth from "../../hooks/useAuth";

import api from '../../service/api.js';
import { AuthContext } from '../../contexts/AuthProvider';
import { useContext } from "react";


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


const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [emailConf, setEmailConf] = useState("");
    const [senha, setSenha] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    
    const { signup } = useContext(AuthContext);

    const handleSignup = async (event) => {
      event.preventDefault();
  
      try {
        if (!email | !emailConf | !senha) {
          setError("Preencha todos os campos");
          return;
        } else if (email !== emailConf) {
          setError("Os e-mails não são iguais");
          return;
        }

        api.post(`/users/existe`,{email:email})
        .then(response=> {
            if (response.data === true) {
              alert("Já tem uma conta com esse E-mail");
              setError("Já tem uma conta com esse E-mail");
            } else {
              signup(name, email, senha);
              navigate("/");
            }
        })
  
        
      } catch (error) {
        console.error('Erro ao criar conta do usuário:', error);
      }
    };

    return (
        
        <S.Container>
            <Header/>

            <S.Title>
                <h3>Acessar controle financeiro</h3>                    
            </S.Title>

            <S.Content>

            <Stack width='20%' spacing={0.8} direction="column">
                    <TextField
                        required
                        id="outlined-required"
                        label="Nome"
                        onChange={(e) => [setName(e.target.value), setError("")]}
                    />

                    <TextField
                        required
                        id="outlined-required"
                        label="E-mail"
                        onChange={(e) => [setEmail(e.target.value), setError("")]}
                    />

                    <TextField
                        required
                        id="outlined-required"
                        label="Confirme seu e-mail"
                        onChange={(e) => [setEmailConf(e.target.value), setError("")]}
                    />

                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => [setSenha(e.target.value), setError("")]}
                    />

                    <Button onClick={handleSignup}>Inscrever</Button>
                      <S.LabelSignin>
                        Já tem uma conta?
                        <S.Strong>
                          <Link to="/login">&nbsp;Entre</Link>
                        </S.Strong>
                      </S.LabelSignin>
            </Stack>
            </S.Content>
            <Footer/>
        </S.Container>
    )

}

export default Register;