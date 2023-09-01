import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styled from "styled-components";
import * as S from './styles';
import { Chart } from "react-google-charts";

//Componentes
import api from '../../service/api.js';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { StyledEngineProvider } from '@mui/material/styles';

import { DataGrid, GridColumns, GridEventListener, GridCellParams } from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';

import { TextField } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import MoneyInput from "@rschpdr/react-money-input";


const Button = styled.button`
  background-color: #1976d2;
  color: white;
  padding: 9px 15px;
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

export const options = {
    is3D: true,
};

const columns: GridColumns = [
    { 
        field: "description", 
        headerName: "Alocação", 
        width: 180, 
        editable: true 
    },
    { 
        field: "percentage", 
        headerName: "Porcentagem %", 
        type: "number", 
        width: 180, 
        editable: true 
    },
    {
      field: "maxAmount",
      headerName: "Quantidade",
      type: "number",
      width: 150,
      editable: true
    }
];

const columnsAllocation: GridColumns = [
    { 
        field: "description", 
        headerName: "Alocação", 
        width: 180, 
        editable: true 
    },
    { 
        field: "amount", 
        headerName: "Limite mensal", 
        type: "number", 
        width: 180,
        editable: true 
    },
    {
      field: "amountUsed",
      headerName: "Usado",
      type: "number",
      width: 150,
      editable: true
    },
    {
        field: "investExpense",
        headerName: "Invest/Despesa",
        type: "singleSelect",
        valueOptions: ["Investimento", "Despesa"],
        width: 175,
        editable: true
      }
];


function Home() {

    const [coluns, setColuns] = useState();
    const [rowsAllocation, setRowsAllocation] = useState([])
    const [rows, setRows] = useState([]);
    const [amount, setAmount] = useState();
    const [focusedInvest, setFocusedInvest] = useState();
    const [focusedInvestMaxAmount, setFocusedInvestMaxAmount] = useState();
    const [focusedDistributions, setFocusedDistributions] = useState();
    const [whereInvestId, setWhereInvestId] = useState();
    const [email, setEmail] = useState();
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();

    const [message, setMessage] = React.useState('');
    const [messageDistribution, setMessageDistribution] = React.useState('');
    const {reference} = useParams();
    
    useEffect(() =>{
        const user = JSON.parse(localStorage.getItem("user_token"));
        const userEmail = user.email;
        const userToken = user.token;
        
        setEmail(user.email);
        setToken(user.token);
        let body = {email : userEmail} ;
        

        api.post("/users/email",body,  { 'headers': { 'Authorization': userToken } })
        .then(response=> {
            const varUserId = response.data.id;
            setUserId(varUserId);
            if (reference) {
                api.get(`/whereInvest/allByUser/reference/` + varUserId + `/` + reference, { 'headers': { 'Authorization': userToken } })
                .then(response=> {
                    var rowsWhereInvest = [];
                    var columnsPie = [];
                    setAmount(response.data[0].amount);
                    columnsPie.push(["Alocação", "Porcentagem"])
                    response.data[0].json.forEach(element => {
                        rowsWhereInvest.push({
                            id: element.id,
                            description: element.description,
                            percentage: element.percentage,
                            maxAmount: element.maxAmount
                        });

                        columnsPie.push([element.description, element.maxAmount])

                    });

                    rowsWhereInvest.sort(compare)
                    setColuns(columnsPie);
                    setRows(rowsWhereInvest);
                    setWhereInvestId(response.data[0].id);
                })
            } else {
                
                console.log('teste');
                api.get(`/whereInvest/allByUser/` + varUserId, { 'headers': { 'Authorization': userToken } })
                .then(response=> {
                    var rowsWhereInvest = [];
                    var columnsPie = [];
                    setAmount(response.data[0].amount);
                    columnsPie.push(["Alocação", "Porcentagem"])
                    response.data[0].json.forEach(element => {
                        rowsWhereInvest.push({
                            id: element.id,
                            description: element.description,
                            percentage: element.percentage,
                            maxAmount: element.maxAmount
                        });

                        columnsPie.push([element.description, element.maxAmount])

                    });

                    rowsWhereInvest.sort(compare)
                    setColuns(columnsPie);
                    setRows(rowsWhereInvest);
                    setWhereInvestId(response.data[0].id);
                })
            }
            
        
            if (focusedInvest) {
                api.get(`/DistributionWhereInvest/` + whereInvestId, { 'headers': { 'Authorization': userToken } })
                .then(response=> {
                    var rowsAllocation = [];
                    response.data.forEach(element => {
                        rowsAllocation.push({
                            id: element.id,
                            description: element.description,
                            amount: element.amount,
                            amountUsed: element.amountUsed,
                            investExpense: element.investExpense,
                            idWhereInvestAllocation: element.idWhereInvestAllocation
                        })
                    });
                    setRowsAllocation(rowsAllocation);
                })
            }
        })
        
    }, [])


    const handleRowAllocationClick: GridEventListener<'rowClick'> = (params) => {
        setFocusedDistributions(params.row.id);
    }

    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
        setFocusedInvest(params.row.id);
        setFocusedInvestMaxAmount(params.row.maxAmount);

        api.get(`/DistributionWhereInvest/` + whereInvestId, { 'headers': { 'Authorization': token } })
        .then(response=> {
            var rowsAllocation = [];
            var totalUsado = 0;
            if (response.data.jsonDistributionWhereInvests) {
                response.data.jsonDistributionWhereInvests.forEach(element => {
                    if (element.idWhereInvestAllocation === params.row.id) {
                        totalUsado = totalUsado + element.amountUsed;
                        rowsAllocation.push({
                            id: element.id,
                            description: element.description,
                            amount: element.amount,
                            amountUsed: element.amountUsed,
                            investExpense: element.investExpense,
                            idWhereInvestAllocation: element.idWhereInvestAllocation
                          })
                    }
                    
                });
            }

            if (totalUsado > params.row.maxAmount) {
                setMessageDistribution('Cuidado! Seus gastos estão excedendo os valores do seu planejamento para esta alocação ');
            } else {
                setMessageDistribution('');
            }

            setRowsAllocation(rowsAllocation);
        })
        
    };

    // const commitcell: GridCellEditCommitParams<'cellEditCommit'> = (params) => {
        const handleCellEditCommit = (params: GridCellParams) => {
        
        const row = rows.findIndex((element) => {
            return element.id === params.id;
        });  
        

        if (params.field === "description") {
            rows[row].description = params.value;
        }

        if (params.field === "percentage") {
            rows[row].percentage = params.value;
            rows[row].maxAmount = calculatePorcentage(params.field, params.value);
        }

        if (params.field === "maxAmount") {
            rows[row].maxAmount = params.value;
            rows[row].percentage = calculatePorcentage(params.field, params.value);
        }

        const body = {
            'jsonWhereInvest': rows,
            'id': whereInvestId,
            'userId':userId
        };


        const headers  = { 'Authorization': token }
        api.put(`/whereInvest/update`, body, {headers}).then(() => {
            api.get(`/whereInvest/allByUser/` + userId, {headers})
                .then(response=> {
                    var rowsWhereInvest = [];
                    var columnsPie = [];
                    columnsPie.push(["Alocação", "Porcentagem"]);

                    response.data[0].json.forEach(element => {
                        rowsWhereInvest.push({
                            id: element.id,
                            description: element.description,
                            percentage: element.percentage,
                            maxAmount: element.maxAmount
                        });

                        columnsPie.push([element.description, element.maxAmount])

                    });


                    rowsWhereInvest.sort(compare)

                    setRows(rowsWhereInvest);
                    setColuns(columnsPie);
                })
        });


        let totalPercentage = 0;
        let totalAmunt= 0;
        rows.forEach(row => {
            totalPercentage += row.percentage;
            totalAmunt += row.amount;
        });
        
        if (totalPercentage > 100 || totalAmunt > amount) {
            setMessage('Seu planejamento excede 100% dos seus ganhos');
        } else {
            setMessage('');
        }
    }

    function calculatePorcentage(field, value) {
        if (field === "percentage") {
            return (value * amount) / 100;

        } else if (field === "maxAmount") {
            return (value * 100) / amount;
        }

        return 0;
    }


    function compare(a, b) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
    }

    async function RemoverAlocation() {
        const headers  = { 'Authorization': token }
        await api.delete(`/DistributionWhereInvest/delete/` + focusedDistributions + `/` + focusedInvest + `/` + whereInvestId, {headers})
        .then();

        api.get(`/DistributionWhereInvest/` + whereInvestId, {headers})
            .then(response=> {
                var rowsAllocation = [];
                if (response.data) {
                    response.data.jsonDistributionWhereInvests.forEach(element => {
                        if (element.idWhereInvestAllocation === focusedInvest) {
                            rowsAllocation.push({
                                id: element.id,
                                description: element.description,
                                amount: element.amount,
                                amountUsed: element.amountUsed,
                                investExpense: element.investExpense,
                                idWhereInvestAllocation: element.idWhereInvestAllocation
                              });
                        }
                        
                    });
                }
            
                setRowsAllocation(rowsAllocation);
            })
    }

    async function RemoverWhereInvest() {
        const headers  = { 'Authorization': token }

        await api.delete(`/whereInvest/delete/` + focusedInvest + `/` + whereInvestId, {headers})
        .then();

        await api.get(`/whereInvest/allByUser/` + userId, {headers})
        .then(response=> {
            var rowsWhereInvest = [];
            var columnsPie = [];
            columnsPie.push(["Alocação", "Porcentagem"]);
            response.data[0].json.forEach(element => {
                rowsWhereInvest.push({
                    id: element.id,
                    description: element.description,
                    percentage: element.percentage,
                    maxAmount: element.maxAmount
                });

                columnsPie.push([element.description, element.maxAmount])

            });

            rowsWhereInvest.sort(compare)
            setColuns(columnsPie);
            setRows(rowsWhereInvest);
            setWhereInvestId(response.data[0].id);
        })
    }

    async function AdicionarWhereInvest() {
        const headers  = { 'Authorization': token }

        api.get(`/whereInvest/allByUser/` + userId, {headers})
        .then(response=> {
            var rowsWhereInvest = [];
            var columnsPie = [];
            var newId = 0;
            columnsPie.push(["Alocação", "Porcentagem"])
            response.data[0].json.forEach(element => {
                if (newId === 0 || newId <= element.id) {
                    newId = element.id;
                } 

                rowsWhereInvest.push({
                    id: element.id,
                    description: element.description,
                    percentage: element.percentage,
                    maxAmount: element.maxAmount
                });

                columnsPie.push([element.description, element.maxAmount])

            });

            rowsWhereInvest.push({
                id: newId + 1,
                description: '',
                percentage: 0,
                maxAmount: 0
            });

            rowsWhereInvest.sort(compare)
            setColuns(columnsPie);
            setRows(rowsWhereInvest);
        });
    }


    async function AdicionarAlocation() {
        const headers  = { 'Authorization': token }
        api.get(`/DistributionWhereInvest/` + whereInvestId, {headers})
        .then(response=> {
            var rowsAllocation = [];
            var newId = 0;
            if (response.data) {
                response.data.jsonDistributionWhereInvests.forEach(element => {
                    if (element.idWhereInvestAllocation === focusedInvest) {
                        if (newId === 0 || newId <= element.id) {
                            newId = element.id;
                        } 
        
                        rowsAllocation.push({
                            id: element.id,
                            description: element.description,
                            amount: element.amount,
                            amountUsed: element.amountUsed,
                            investExpense: element.investExpense,
                            idWhereInvestAllocation: element.idWhereInvestAllocation
                          })
                    }
                    
                });
            }
            

            rowsAllocation.push({
                id: newId + 1,
                description: '',
                amount: 0,
                amountUsed: 0,
                investExpense: "",
                idWhereInvestAllocation: focusedInvest
            });
            setRowsAllocation(rowsAllocation);
        })
    }

    const handleRowAllocationEditCommit: GridEventListener<'cellEditCommit'> = (
        params,  
      ) => {
        const row = rowsAllocation.findIndex((element) => {
            return element.id === params.id
        });  

        if (params.field === "description") {
            rowsAllocation[row].description = params.value
            
        }

        if (params.field === "amount") {
            rowsAllocation[row].amount = params.value
        }

        if (params.field === "amountUsed") {
            rowsAllocation[row].amountUsed = params.value
        }

        if (params.field === "investExpense") {
            rowsAllocation[row].investExpense = params.value
        }
    
        var totalUsado = 0;
        rowsAllocation.forEach(element => {
            totalUsado = totalUsado + element.amountUsed;
        });

        if (totalUsado > focusedInvestMaxAmount) {
            setMessageDistribution('Cuidado! Seus gastos estão excedendo os valores do seu planejamento para esta alocação ');
        } else {
            setMessageDistribution('');
        }

        const headers  = { 'Authorization': token }

        api.get(`/DistributionWhereInvest/` + whereInvestId, {headers})
        .then(response=> {
            if (response.data.length !== 0) {
                api.put(`/DistributionWhereInvest/update/` + response.data.id, {
                    whereInvest: whereInvestId,
                    jsonDistributionWhereInvests: rowsAllocation
                }, {headers}).then(() => {
                    
                })
            } else {
                api.post(`/DistributionWhereInvest/save`, {
                    whereInvest: whereInvestId,
                    jsonDistributionWhereInvests: rowsAllocation
                }, {headers}).then(() => {
                    
                })
            }
        });
        
    }

    function handleChange(e) {
        const headers  = { 'Authorization': token }
        setAmount(e.target.value);

        api.put(`/whereInvest/updateAmount`, {
            id:whereInvestId,
            userId: userId,
            amount: e.target.value
        }, {headers}).then(() => {
            
        })
    }

    return (
        <S.Container>
            <Header/>

            <S.Title>
                <h3>Sistema de controle de gastos</h3>                    
            </S.Title>

            <S.Content>
                <S.tableArea>
                    <Stack spacing={1} direction="row">
                        <MoneyInput
                            customInput={TextField}
                            variant="outlined"
                            currencyConfig={{
                                locale: "pt-BR",
                                currencyCode: "BRL",
                                currencyDisplay: "symbol"
                                }}
                            label="Informe seus ganhos mensais"
                            name="amount"
                            onChange={handleChange}
                            value={amount} 
                        />
                    </Stack>

                    <React.StrictMode>

                        <div style={{ marginTop:19 }}>
                            <Stack spacing={0.5} direction="row">
                                <Button onClick={AdicionarWhereInvest}>ADD</Button>
                                <Button onClick={RemoverWhereInvest}>Remover</Button>
                            </Stack>
                        </div>

                        <StyledEngineProvider injectFirst>
                            <div style={{ height: 370, width: 540 }}>
                                <DataGrid editMode="cell" hideFooter='true' rows={rows} columns={columns} onCellEditCommit={handleCellEditCommit}  experimentalFeatures={{ newEditingApi: true } } onRowClick={handleRowClick} />
                            </div>
                            
                            {message && <Alert severity="info">{message}</Alert>}
                        </StyledEngineProvider>

                    </React.StrictMode>

                </S.tableArea>

                <React.StrictMode>

                    <S.tableArea>

                        <div style={{ marginTop:75 }}>
                            <Stack spacing={0.5} direction="row">
                                <Button onClick={AdicionarAlocation}>ADD</Button>
                                <Button onClick={RemoverAlocation}>Remover</Button>
                            </Stack>
                        </div>

                        <StyledEngineProvider injectFirst>
                            <div style={{ height: 370, width: 687 }}>
                                <DataGrid hideFooter="true" rows={rowsAllocation} columns={columnsAllocation} experimentalFeatures={{ newEditingApi: true }} onCellEditCommit={handleRowAllocationEditCommit} onRowClick={handleRowAllocationClick}/>
                            </div>
                            
                            {messageDistribution && <Alert severity="info">{messageDistribution}</Alert>}
                        </StyledEngineProvider>

                    </S.tableArea>

                </React.StrictMode>

                <Chart
                chartType="PieChart"
                data={coluns}
                options={options}
                width={"80%"}
                height={"500px"}
                />
                

            </S.Content>

            <Footer/>
        </S.Container>
    )
}

export default Home;