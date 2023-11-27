import React, { useState, useEffect } from 'react';

import styled from "styled-components";
import * as S from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../service/api.js';

import MoneyInput from "@rschpdr/react-money-input";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import { Chart } from "react-google-charts";
  

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
      '#00b33c',
  ],

  
};
  

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function Calculator() {
    const [dadosGrafico, setDadosGrafico] = useState([]);
    const [showElement, setShowElement] = useState(false)
    const [value, setValue] = React.useState(0);
    const [totalAnosFixa, setTotalAnosFixa] = React.useState(0);
    const [percentageFixa, setPercentageFixa] = React.useState(0);
    const [aporteMensalFixa, setAporteMensalFixa] = React.useState(0);
    const [nomeInvestimentoFixa, setNomeInvestimentoFixa] = React.useState(0);
    
    const [listCalculo, setListCalculo] = React.useState([]);
    
    const [nomeInvestimentoAcao, setNomeInvestimentoAcao] = React.useState(0);
    const [valorAcao, setValorAcao] = React.useState(0);
    const [totalAnosAcao, setTotalAnosAcao] = React.useState(0);
    const [dividendoPorAcao, setDividendoPorAcao] = React.useState(0);
    const [acoesPorMes, setAcoesPorMes] = React.useState(0);
    const [comprarSePossivel, setComprarSePossivel] = React.useState();
    
    const [errorCheckBox, setErrorCheckBox] = React.useState(0);
    const [error, setError] = React.useState();
    const [userId, setUserId] = React.useState();
    const [email, setEmail] = React.useState();
    const [token, setToken] = React.useState();

    const [state, setState] = React.useState({
      gilad: true,
      jason: false,
      antoine: false,
    });
    const { janeiro, fevereiro, marco, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro } = state;

    const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
    };
    
    useEffect(() =>{
      const user = JSON.parse(localStorage.getItem("user_token"));
      const userEmail = user.email;
      const userToken = user.token;
      
      setEmail(user.email);
      setToken(user.token);

      api.get("/users/email/" + userEmail, { 'headers': { 'Authorization': userToken } })
      .then(response=> {
          const varUserId = response.data.entity.id;
          setUserId(varUserId);      
      })
        
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function handleChangeMoney(e) {
      setAporteMensalFixa(e.target.value);
    }


    function handlerValorAcao(e) {
      setValorAcao(e.target.value);
    }

    function handleDividendoPorAcao(e) {
      setDividendoPorAcao(e.target.value);
    }

    function handleChangeComprarSePossivel(e) {
      setComprarSePossivel(e.target.value);
    }

    function salvarFixa() {
      const headers  = { 'Authorization': token }
      var meses = totalAnosFixa * 12
      if (listCalculo.length > 0) {
        api.post(`/calculator/save-renda-fixa`, {
          nome: nomeInvestimentoFixa,
          meses: meses,
          porcentagem: percentageFixa,
          userId: userId,
          aporteMensal : aporteMensalFixa,
          jsonCalculatorFixa: listCalculo
      }, {headers}).then(() => {
          
      })
      }
    }

    function calcularFixa() {
      var meses = totalAnosFixa * 12;
      var percentagemMes = percentageFixa / 12;
      var listaGrafico = [];
      var valorAtual = 0;
      var rendimentoNoMes = 0;

      for (let index = 1; index <= meses; index++) {
        if (index === 1) {
          rendimentoNoMes = (percentagemMes * aporteMensalFixa) / 100;
        } else {
          rendimentoNoMes = (percentagemMes * valorAtual) / 100;
        }
        
        valorAtual = valorAtual + aporteMensalFixa + rendimentoNoMes;

        listaGrafico.push({
          id: index,
          nome: nomeInvestimentoFixa,
          percentage: percentageFixa,
          valorAtual: valorAtual,
          rendimentoNoMes: rendimentoNoMes
        })        
      }

      var dados = [];
      dados.push([
          "Reference",
          "Rendimento no mês"
      ]);

      listaGrafico.forEach(element => {
          dados.push([element.id, element.rendimentoNoMes]);
      });    

      setDadosGrafico(dados);

      console.log(listaGrafico);
      setListCalculo(listaGrafico);
      setShowElement(true);

    }
    
    function salvarAcoes() {
      const headers  = { 'Authorization': token }
      if (listCalculo.length > 0) {
        api.post(`/calculator/save-renda-variavel`, {
          nome: nomeInvestimentoAcao,
          acoesPorMes: parseInt(acoesPorMes),
          dividendoPorAcao: dividendoPorAcao,
          valorDaAcao: valorAcao,
          userId: userId,
          jsonCalculatorVariavel: listCalculo
      }, {headers}).then(() => {
          
      })
      }
    }

    function calcularAcoes() {
      var meses = quantidadeDeMeses();
      meses = totalAnosAcao * meses;
      var listaGrafico = [];
      var quantidadeAcoes = 0;
      let rendimentoNoMes = 0;
      var acaoPorMesInt = parseInt(acoesPorMes);

      for (let index = 1; index <= meses; index++) {
        console.log(index);
        rendimentoNoMes = quantidadeAcoes * dividendoPorAcao;
        
        if (comprarSePossivel === "on" && rendimentoNoMes >= valorAcao) {
          var resto = rendimentoNoMes % valorAcao;
          console.log(resto);
          quantidadeAcoes = quantidadeAcoes + resto;   
        }

        quantidadeAcoes = (quantidadeAcoes + acaoPorMesInt);

        listaGrafico.push({
          id: index,
          nome: nomeInvestimentoAcao,
          mes: index,
          dividendoPorAcao: dividendoPorAcao,
          quantidadeAcao: quantidadeAcoes,
          valorAcao: valorAcao,
          rendimentoNoMes: rendimentoNoMes
        });

      }

      var dados = [];
      dados.push([
          "Reference",
          "Rendimento no mês"
      ]);

      listaGrafico.forEach(element => {
          dados.push([element.id, element.rendimentoNoMes]);
      });    

      setDadosGrafico(dados);

      setListCalculo(listaGrafico);
      
      setShowElement(true);
    }

    function quantidadeDeMeses() {
      var meses = 0;
      if (janeiro) {
        meses++;
      }

      if (fevereiro) {
        meses++;
      }

      if (marco) {
        meses++;
      }

      if (abril) {
        meses++;
      }

      if (maio) {
        meses++;
      }

      if (junho) {
        meses++;
      }

      if (julho) {
        meses++;
      }

      if (agosto) {
        meses++;
      }

      if (setembro) {
        meses++;
      }

      if (outubro) {
        meses++;
      }

      if (novembro) {
        meses++;
      }

      if (dezembro) {
        meses++;
      }

      return meses;
    }

    return (
        <S.Container>
            <Header/>

            <S.Title>
                <h3>Calculadora e gráfico para juros compostos</h3>                    
            </S.Title>

            <S.Content>
              <Stack spacing={3} direction="column">
                <S.FieldsArea>
                  <Box sx={{ width: '100%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                          <Tab label="Renda Fixa" {...a11yProps(0)} />
                          <Tab label="Ações / FIIS" {...a11yProps(1)} />
                          </Tabs>
                      </Box>

                      <TabPanel value={value} index={0}>
                          <Stack spacing={2} direction="row">

                            <TextField
                                required
                                id="outlined-required"
                                label="Nome investimento"
                                onChange={(e) => [setNomeInvestimentoFixa(e.target.value), setError("")]}
                            />

                            <TextField
                                required
                                id="outlined-required"
                                label="Total anos investidos"
                                onChange={(e) => [setTotalAnosFixa(e.target.value), setError("")]}
                            />

                            <TextField
                                required
                                id="outlined-required"
                                label="% Anual"
                                onChange={(e) => [setPercentageFixa(e.target.value), setError("")]}
                            />

                            <Stack spacing={1} direction="row">
                              <MoneyInput
                                  customInput={TextField}
                                  variant="outlined"
                                  currencyConfig={{
                                      locale: "pt-BR",
                                      currencyCode: "BRL",
                                      currencyDisplay: "symbol"
                                      }}
                                  label="Aporte mensal"
                                  name="aporte mensal"
                                  onChange={handleChangeMoney}
                                  value={aporteMensalFixa} 
                              />
                          </Stack>

                            <S.Button onClick={calcularFixa}>Calcular    </S.Button>
                            <S.Button onClick={salvarFixa}>Salvar calculo    </S.Button>
                          </Stack>
                        
                      </TabPanel>

                      <TabPanel value={value} index={1}> 
                        <Stack spacing={2} direction="row">

                          <Stack spacing={2} direction="column">
                            <TextField
                                required
                                id="outlined-required"
                                label="Nome da ação"
                                onChange={(e) => [setNomeInvestimentoAcao(e.target.value), setError("")]}
                            />

                            <Stack spacing={1} direction="row">
                              <MoneyInput
                                  customInput={TextField}
                                  variant="outlined"
                                  currencyConfig={{
                                      locale: "pt-BR",
                                      currencyCode: "BRL",
                                      currencyDisplay: "symbol"
                                      }}
                                  label="Valor da ação"
                                  name="valorPrecoUnitarioDaAcao"
                                  onChange={handlerValorAcao}
                                  value={valorAcao} 
                              />
                          </Stack>
                          </Stack>
                        
                          <Stack spacing={2} direction="column">
                            <TextField
                                required
                                id="outlined-required"
                                label="Total anos investidos"
                                onChange={(e) => [setTotalAnosAcao(e.target.value), setError("")]}
                            />

                            <Stack spacing={1} direction="row">
                              <MoneyInput
                                  customInput={TextField}
                                  variant="outlined"
                                  currencyConfig={{
                                      locale: "pt-BR",
                                      currencyCode: "BRL",
                                      currencyDisplay: "symbol"
                                      }}
                                  label="Dividendos por ação"
                                  name="Dividendos por ação"
                                  onChange={handleDividendoPorAcao}
                                  value={dividendoPorAcao} 
                              />
                            </Stack>
                          </Stack>
                          
                          <Stack spacing={2} direction="column">
                            <TextField
                                required
                                id="outlined-required"
                                label="Ações adquiras por mês"
                                onChange={(e) => [setAcoesPorMes(e.target.value), setError("")]}
                            />

                            <FormGroup>
                              <FormControlLabel onChange={handleChangeComprarSePossivel} control={<Switch defaultChecked />} label="Comprar ação com dividendo se possível" />
                            </FormGroup>
                          </Stack>
                          

                          <Box sx={{ display: 'flex' }}>
                                <FormControl sx={{ m: 2 }} error={errorCheckBox}  component="fieldset" variant="standard">
                                  <FormLabel component="legend">Meses</FormLabel>
                                  <FormGroup>
                                    <FormControlLabel
                                      control={
                                        <Checkbox checked={janeiro} onChange={handleChangeCheckBox} name="janeiro" />
                                      }
                                      label="Janeiro"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox checked={fevereiro} onChange={handleChangeCheckBox} name="fevereiro" />
                                      }
                                      label="Fevereiro"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox checked={marco} onChange={handleChangeCheckBox} name="marco" />
                                      }
                                      label="Março"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox checked={abril} onChange={handleChangeCheckBox} name="abril" />
                                      }
                                      label="Abril"
                                    />
                                  </FormGroup>
                                  <FormHelperText></FormHelperText>
                                </FormControl>
                                <FormControl error={errorCheckBox} component="fieldset" sx={{ m: 2 }} variant="standard">
                                  <FormLabel component="legend">Pagamentos</FormLabel>
                                  <FormGroup>
                                    <FormControlLabel
                                      control={
                                        <Checkbox checked={maio} onChange={handleChangeCheckBox} name="maio" />
                                      }
                                      label="Maio"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox checked={junho} onChange={handleChangeCheckBox} name="junho" />
                                      }
                                      label="Junho"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox checked={julho} onChange={handleChangeCheckBox} name="julho" />
                                      }
                                      label="Julho"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox checked={agosto} onChange={handleChangeCheckBox} name="agosto" />
                                      }
                                      label="Agosto"
                                    />
                                  </FormGroup>
                                  <FormHelperText></FormHelperText>
                                </FormControl>
                                <FormControl error={errorCheckBox} component="fieldset" sx={{ m: 2 }} variant="standard">
                                  <FormLabel component="legend">Dividendos</FormLabel>
                                  <FormGroup>
                                    <FormControlLabel
                                      control={
                                        <Checkbox checked={setembro} onChange={handleChangeCheckBox} name="setembro" />
                                      }
                                      label="Setembro"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox checked={outubro} onChange={handleChangeCheckBox} name="outubro" />
                                      }
                                      label="Outubro"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox checked={novembro} onChange={handleChangeCheckBox} name="novembro" />
                                      }
                                      label="Novembro"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox checked={dezembro} onChange={handleChangeCheckBox} name="dezembro" />
                                      }
                                      label="Dezembro"
                                    />
                                  </FormGroup>
                                  <FormHelperText></FormHelperText>
                                </FormControl>
                              </Box>

                          

                          <S.Button onClick={calcularAcoes}>Calcular    </S.Button>
                          <S.Button onClick={salvarAcoes}>Salvar calculo    </S.Button>

                        </Stack>
                      </TabPanel>
                  </Box>
                </S.FieldsArea>

                { showElement ? <S.chartsArea>
                    <Chart
                        chartType="Line"
                        width="100%"
                        height="400px"
                        data={dadosGrafico}
                        options={optionsChart}
                    />
                </S.chartsArea> : null }
                
              </Stack>

            </S.Content>

            <Footer/>
        </S.Container>
    )

}

export default Calculator;