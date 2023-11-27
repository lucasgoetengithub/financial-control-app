import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
`;

export const CardsArea = styled.div`
    width: 100%;
    margin-bottom: 70px;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    
`;

export const FieldsArea = styled.div`
    width: 90%;
    box-shadow: -3px 1px 8px -2px rgba(0,0,0,0.25);
    border-radius: 10px;
`

export const chartsArea = styled.div`
    width: 90%;
    box-shadow: -3px 1px 8px -2px rgba(0,0,0,0.25);
    border-radius: 10px;
`

export const Button = styled.button`
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
  };
  height: 50px;
  
`;


export const ContentChar = styled.div`
    width: 50%;
    margin-bottom: 100px;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
`


export const Content = styled.div`
width: 100%; 
justify-content: center;
margin-bottom: 100px;
    display: flex;
    flex-wrap: wrap;

    a{
        text-decoration: none;
        color: #000;
    }
`

export const Title = styled.div`
    width: 100%;
    border-bottom: 1px solid #20295F;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    h3 {
        color: #20295F;
        position: relative;
        top: 30px;
        background: #FFF;
        padding: 0 20px;
    }
`
;