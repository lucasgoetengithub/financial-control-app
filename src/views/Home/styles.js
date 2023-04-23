import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
`;

export const FilterArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 30px;

`
export const Content = styled.div`
width: 100%; 
display: flex;
flex-wrap: wrap;

justify-content: center;
margin-bottom: 70px;

    a{
        text-decoration: none;
        color: #000;
    }
`

export const tableArea = styled.div`
    margin-left: 10px;
    justify-content: center;
    width: 600px;     
`

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

export const Grid = styled.div`
    margin-left: 70px;
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