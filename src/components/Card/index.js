import React, { useState, useEffect } from 'react';
import * as S from './styles';
import api from '../../service/api.js';
import Stack from '@mui/material/Stack';


function Card({ reference, json, amount, whereInvestId }) {
  const [ganhos, setGanhos] = useState();
  const [investimentos, setInvestimentos] = useState();
  const [despesas, setDespesas] = useState();
  const [referenceLabel, setReferenceLabel] = useState();

  useEffect(() =>{

    const user = JSON.parse(localStorage.getItem("user_token"));
    const userEmail = user.email;
    const userToken = user.token;

    var investimentos = 0.0;
    var despesas = 0.0; 
    api.get('/DistributionWhereInvest/' + whereInvestId, { 'headers': { 'Authorization': userToken } })
    .then(response=> {
        response.data.jsonDistributionWhereInvests.forEach(element => {
            if (element.investExpense == 'Despesa') {
              despesas = despesas + element.amountUsed;
            } else {
              investimentos = investimentos + element.amountUsed;
            }
        });
        
        var investimentosLabel = investimentos.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        setInvestimentos(investimentosLabel);
        var despesasLabel = despesas.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        setDespesas(despesasLabel);
    });

    var ganhosLabel = amount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    setGanhos(ganhosLabel);

    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];

    const year = String(reference).substr(0, 4);
    const month = String(reference).substr(5, 2);
    setReferenceLabel(meses[parseInt(month)-1] + "/" + year);

  }, [])

    return (
        <S.Container>
          <S.TopCard>
            <h3>{referenceLabel}</h3>
          </S.TopCard>

          <S.BottomCard>

            <S.GanhoLabel>
              <Stack spacing={2} direction="column">
                <span>Ganhos</span>
                {ganhos}
              </Stack>  
            </S.GanhoLabel>

            <S.InvestimentoLabel>
              <Stack spacing={2} direction="column">
                <span>Investimentos</span>
                {investimentos}
              </Stack>
            </S.InvestimentoLabel>

            <S.DespesasLabel>
              <Stack spacing={2} direction="column">
                <span>Despesas</span>
                {despesas}
              </Stack>
            </S.DespesasLabel>
          </S.BottomCard>
        </S.Container>
    )
}

export default Card;