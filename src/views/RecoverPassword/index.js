import React, { useState }  from 'react';

import styled from "styled-components";
import * as S from "./styles";

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

    

    return (
        
        <S.Container>
            <Header/>

            <S.Title>
                <h3>Recuperar senha (Em desenvolvimento)</h3>                    
            </S.Title>

            <Footer/>
        </S.Container>
    )
}

export default RecoverPassword;