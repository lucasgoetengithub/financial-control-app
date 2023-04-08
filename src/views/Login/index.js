import React, { useState, useEffect }  from 'react';
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import * as S from './styles';

import Header from '../../components/HeaderLoginRegister';
import Footer from '../../components/Footer';


// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
// import useAuth from "../../hooks/useAuth";
// import api from "../../service/api.js";


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


const Login = () => {

  useEffect(() =>{
    
  });

    // const { signin } = useAuth();
    // const navigate = useNavigate();

    // const [email, setEmail] = useState("");
    // const [senha, setSenha] = useState("");
    // const [error, setError] = useState("");
    
    // function Entrar () {
      
    //   if (!email || !senha) {
    //     setError("Preencha todos os campos");
    //     return;
    //   }

    //   var token;
    //   api.post(`/users/autenticar`, {
    //         email: email,
    //         password: senha
    //     })
    //     .then(response => {
    //                 console.log(response);
    //                 token = response.data.token;

    //                 signin(email, token);

    //                 navigate('/home')
    //     }).catch(err => {
    //     })        
    // };

    
    return (
        
        <S.Container>
            <Header/>

            <S.Title>
                <h3>Acessar controle financeiro</h3>                    
            </S.Title>

            <S.Content>

            {/* <Stack width='20%' spacing={0.8} direction="column">
                    <TextField
                        required
                        id="outlined-required"
                        label="Usuário"
                        onChange={(e) => [setEmail(e.target.value), setError("")]}
                    />

                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => [setSenha(e.target.value), setError("")]}
                    />
                    <S.labelError>{error}</S.labelError>

                    <Button onClick={Entrar}>ENTRAR</Button>
                    <S.LabelSignup>
                    Não tem uma conta?
                    <S.Strong>
                      <Link to="/register">&nbsp;Registre-se</Link>
                    </S.Strong>
                  </S.LabelSignup>
            </Stack> */}
                

                
        
                
       

            </S.Content>

            <Footer/>
        </S.Container>
    )

}

export default Login;