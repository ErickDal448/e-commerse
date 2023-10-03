import { FilterContext } from './FilterContext';
import imagePromo from "../assets/img/Hero.jpg";
import React from 'react';

import "../assets/css/global.css"
import "../assets/css/Header.css"

import styled from "@emotion/styled";


const ImageDiv = styled.div `
    display:flex;
    flex-direction:column;
    justify-content: flex-end;
    background-image: url(${imagePromo});
    background-repeat:no-repeat;
`;



const Promo = () => {
    const { setFilter } = React.useContext(FilterContext);
    return (
        <>
        <ImageDiv className='promoDiv'>
                <h1>Febrero Promocional</h1>
                <p>Productos selecionados con 33% de descuento</p>
                <button type="button" className="btn btn-primary" onClick={() => setFilter('Consolas')}>Ver Consolas</button>
        </ImageDiv>
        </>
    )
}

export default Promo