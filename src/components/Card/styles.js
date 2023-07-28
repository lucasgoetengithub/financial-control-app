import styled from 'styled-components';


export const Container = styled.div`
    width:400px;
    height: 200px;

    box-shadow: -3px 1px 17px -2px rgba(0,0,0,0.75);
    border-radius: 10px;

    display: flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;

    margin: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: ${props => props.done ? 0.5 : 1};

    &:hover{
        opacity: 0.5;
    }
    
`
export const TopCard = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
    h3 {
        padding: 0 20px;
    }
`

export const GanhoLabel = styled.div`
    color: #0000e6;
    font-weight: bold;
    display: flex;
    justify-content: collumn;
`

export const InvestimentoLabel = styled.div`
    color: #00b33c;
    font-weight: bold;
`

export const DespesasLabel = styled.div`
    color: #ff5c33;
    font-weight: bold;
`

export const BottomCard = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;

`