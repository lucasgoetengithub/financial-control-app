import React from 'react';
import * as S from './styles'
import { Link } from 'react-router-dom';


function Header({  }) {
    function sair() {
        localStorage.removeItem("user_token");
    }

    return (
        <S.Container>
            <S.LeftSide>
            </S.LeftSide>

            <S.RigthSide>
                <Link to="/home">INÍCIO</Link>
                <span className='dividir'/>

                <Link to="/history">HISTÓRICO MENSAL</Link>
                <span className='dividir'/>

                <Link to="/calculator">CALCULADORA DE JUROS COMPOSTO</ Link>
                <span className='dividir'/>

                <Link to="/login" onClick={sair}>SAIR</ Link>
            </S.RigthSide>
        </S.Container>
    )
}

export default Header;