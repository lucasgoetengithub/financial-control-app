import React, { useState, useEffect } from 'react';

import styled from "styled-components";
import * as S from './styles.js';

import Header from '../../components/Header/index.js';
import Footer from '../../components/Footer/index.js';
import api from '../../service/api.js';

function ConsultCalculator() {
    const [email, setEmail] = React.useState();
    const [token, setToken] = React.useState();
    
    
    useEffect(() =>{
      const user = JSON.parse(localStorage.getItem("user_token"));
      const userEmail = user.email;
      const userToken = user.token;
      
      setEmail(user.email);
      setToken(user.token);

      let body = {email : userEmail} ;

      // api.post("/users/email",body,  { 'headers': { 'Authorization': userToken } })
      //       .then(response =>  {
      //           const varUserId = response.data.id;

      //     setUserId(varUserId);      
      // })
        
    }, [])

    return (
        <S.Container>
            <Header/>

            <S.Title>
                <h3>Cálculos salvos (Em desenv)</h3>                    
            </S.Title>

            <S.Content>
              

            </S.Content>

            <Footer/>
        </S.Container>
    )

}

export default ConsultCalculator;