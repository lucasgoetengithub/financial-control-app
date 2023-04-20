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

    const { signup } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [emailConf, setEmailConf] = useState("");
    const [senha, setSenha] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    
    const Registrar = () => {
      
      if (!email | !emailConf | !senha) {
        setError("Preencha todos os campos");
        return;
      } else if (email !== emailConf) {
        setError("Os e-mails não são iguais");
        return;
      }

      var res = "";
      api.get(`/users/email/` + email)
      .then(response=> {
          console.log(response);
          if (response.data.entity.status && response.data.entity.status === 404) {
            
            res = signup(name, email, senha);

            navigate("/");
          } else {
            alert("Já tem uma conta com esse E-mail");
          }

          if (res) {
            setError(res);
            return;
          }
      })
      .catch(err => {
            res = signup(name, email, senha);
            navigate("/");
      })
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

                    <Button onClick={Registrar}>Inscrever</Button>
                      <S.LabelSignin>
                        Já tem uma conta?
                        <S.Strong>
                          <Link to="/">&nbsp;Entre</Link>
                        </S.Strong>
                      </S.LabelSignin>
            </Stack>
            </S.Content>
            <Footer/>
        </S.Container>
    )

}

export default Register;