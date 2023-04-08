import React, {Fragment} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../views/App';


export default function Routers() {
    return (
        <BrowserRouter>
        <Fragment>
                <Routes>
                    <Route path="/" element={<App />} />
                    {/* <Route path="/Register" element={<Register />} />
                    <Route exact path="/home" element={<Private Item={Home} />} />
                    <Route exact path="/history" element={<Private Item={HistoryCards} />} />
                    <Route path='/login' element={<Login/>}/>
                    <Route exact path="/calculator" element={<Private Item={Calculator} />} />
                    <Route path="*" element={<Login />} /> */}
                </Routes>
        </Fragment>
        </BrowserRouter>
    )
}