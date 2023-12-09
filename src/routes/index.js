import React, {Fragment} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/Home';
import HistoryCards from '../views/HistoryCards';
import Calculator from '../views/Calculator'
import RecoverPassword from '../views/RecoverPassword'

import useAuth from "../hooks/useAuth";

const Private = ({ Item }) => {
    const user = JSON.parse(localStorage.getItem("user_token"));    

    const { signed } = useAuth();
    var logado = false;
    if (user != null) {
        logado = true;
    } else {
        logado = signed;
    }
    
    return logado ? <Item/> : <Login/>
}

export default function Routers() {
    return (
        <BrowserRouter>
        <Fragment>
                <Routes>
                    <Route exact path="/" element={<Private Item={Login} />} />
                    <Route exact path="/login" element={<Private Item={Login} />} />
                    <Route path="/Register" element={<Register />} />
                    <Route exact path="/home" element={<Private Item={Home} />} />
                    <Route exact path="/home/:reference" element={<Private Item={Home} />} />
                    <Route exact path="/history" element={<Private Item={HistoryCards} />} />
                    <Route exact path="/calculator" element={<Private Item={Calculator} />} />
                    <Route path="/recoverpassword" element={<RecoverPassword />} />
                </Routes>
        </Fragment>
        </BrowserRouter>
    )
}

