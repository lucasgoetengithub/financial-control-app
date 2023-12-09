import React, { useState, useEffect }  from 'react';
import { Link, useNavigate } from "react-router-dom";

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


const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() =>{
    
  });

  const handleRecovery = async (event) => {    

    await api.post(`/users/sentEmailRecovery`, {    })
    .then(response => {
    }).catch(err => {
      setError('Usuario nao encontrado')
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
                  label="Email"
                  onChange={(e) => [setEmail(e.target.value), setError("")]}
              />

              <Button onClick={handleRecovery}>RECUPERAR</Button>
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

export default RecoverPassword;