import React, { useState, useEffect } from 'react';
import {useNavigate } from "react-router-dom";

import styled from "styled-components";
import * as S from './styles';

import api from '../../service/api.js';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import {Link} from 'react-router-dom';
import { Chart } from "react-google-charts";
  
  export const options = {
    chart: {
      title: "Gráfico de evolução da sua vida financeira",
    },
    width: 900,
    height: 500,
    series: {
      // Gives each series an axis name that matches the Y-axis below.
      0: { axis: "amount" },
      1: { axis: "reference" },
    },
    axes: {
      // Adds labels to each axis; they don't have to match the axis names.
      y: {
        amount: { label: "Valores usados" },
        reference: { label: "Valores usados" },
      },
    },
  };

  export const optionsChart = {
    animation: {
        duration: 100000,
        easing: 'out',
        startup: true
    },

    chart: {
      title: "Gráfico de evolução da sua vida financeira.",
      subtitle: "Diminuir despesas, aumentar ganhos e investimentos",
    },
    
    colors:[ 
        '#0000e6', 
        '#ff5c33',
        '#ffc222',
        '#00b33c',
    ],

    
  };


function HistoryCards() {

    const [whereInvest, setWhereInvest] = useState([]);
    const [email, setEmail] = useState();
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    const [dadosGrafico, setDadosGrafico] = useState([]);
    const [teste, setTeste] = useState();
    const [temRegistro, setTemRegistro] = useState(true);
    const [temRegistroDistr, setTemRegistroDistr] = useState(true);
    const navigate = useNavigate();

    useEffect(() =>{
        const user = JSON.parse(localStorage.getItem("user_token"));
        const userEmail = user.email;
        const userToken = user.token;
        
        setTeste(false);

        setEmail(user.email);
        setToken(user.token);

        const fetchData = async () => {
            
            let body = {email : userEmail} ;

            await api.post("/users/email",body,  { 'headers': { 'Authorization': userToken } })
            .then(response =>  {
                const varUserId = response.data.id;
                setUserId(varUserId);
                api.get(`/whereInvest/history/`+varUserId, { 'headers': { 'Authorization': userToken } })
                .then(response=> {
                    console.log(response);
                    setWhereInvest(response.data);    
                });
            })
            .catch(error => {
                if (error.response.status == 403) {
                    navigate('/login');
                }
            });
        };


        const fetchChart = async () => {
            let body = { email : userEmail };
            await api.post("/DistributionWhereInvest/chart", body, { 'headers': { 'Authorization': userToken } })
            .then(response =>  {
                var dados = [];
                    dados.push([
                        "Reference",
                        "Ganhos",
                        "Despesas",
                        "Investimentos",
                        "Estudo"
                    ]);

                    response.data.forEach(element => {
                        dados.push([element.reference, element.amount, element.investments, element.estudo, element.expenses]);
                    });    
                    
                    if (response.data.length == 0) {
                        setTemRegistroDistr(false);
                    } else {
                        setTemRegistroDistr(true);
                    }
                    
                    setDadosGrafico(dados);
            })
            .catch(error => {
                if (error.response.status == 403) {
                    navigate('/login');
                }
            });
        };
        
        fetchData();
        fetchChart();
    }, [])

    function formataReference(e){
        let reference = e.toString();
        reference = reference.replaceAll(",", "-");
        return reference;
    }

    return (
        <S.Container>
            <Header/>

            <S.Title>
                <h3>Histórico mensal de gastos</h3>                    
            </S.Title>

            { 
                <S.Content>
                    <S.CardsArea >
                        {
                            whereInvest.map(whereInvest => (
                                <Link to={`/home/` + formataReference(whereInvest.date)}>
                                    <Card reference={whereInvest.date} json={whereInvest.json} amount={whereInvest.amount} whereInvestId={whereInvest.id} />
                                </Link>
                            ))
                        }
                    </S.CardsArea>

                    { temRegistroDistr && (
                        <S.ContentChar>
                            <Chart
                                chartType="Line"
                                width="100%"
                                height="400px"
                                data={dadosGrafico}
                                options={optionsChart}
                            />
                        </S.ContentChar>
                    )}
                </S.Content>
            }

            <Footer/>
        </S.Container>
    )

}

export default HistoryCards;