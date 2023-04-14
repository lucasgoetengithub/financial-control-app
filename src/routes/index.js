import React, {Fragment} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from '../views/App';
import Login from '../views/Login';

const Private = ({ Item }) => {
    const user = JSON.parse(localStorage.getItem("user_token"));    

    // const { signed } = useAuth();
    // var logado = false;
    // if (user != null) {
    //     logado = true;
    // } else {
    //     logado = signed;
    // }
    
    // return logado ? <Item/> : <Login/>
    return <Item/>;
}

export default function Routers() {
    return (
        <BrowserRouter>
        <Fragment>
                <Routes>
                    <Route path="/" element={<App />} />
                    {/* <Route path="/login" element={<Login />} /> */}
                    <Route exact path="/login" element={<Private Item={Login} />} />
                    {/* <Route path="/Register" element={<Register />} />
                    <Route exact path="/home" element={<Private Item={Home} />} />
                    <Route exact path="/history" element={<Private Item={HistoryCards} />} />
                    <Route exact path="/calculator" element={<Private Item={Calculator} />} />
                    <Route path="*" element={<Login />} /> */}
                </Routes>
        </Fragment>
        </BrowserRouter>
    )
}