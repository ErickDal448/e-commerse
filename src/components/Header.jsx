import image from "../assets/img/Logo.png";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import React from 'react';
import { FilterContext } from "./FilterContext";

import "../assets/css/global.css"
import "../assets/css/Header.css"

import SearchIcon from '@mui/icons-material/Search';
import styled from "@emotion/styled";
import { Button } from "@mui/material";

const BtnLogin = styled.button`
    padding: 0.5rem 3rem;
    @media (max-width: 450px) {
        padding: 0.5rem 1rem;
    }
`;

const Header = (props) => {
    const location = useLocation();
    const { filter, setFilter } = React.useContext(FilterContext);
    const logoRef = useRef(null);
    const searchInRef = useRef(null);

    const handleSearchChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSearchMedia = (e) => {
        console.log("no")
        if(window.innerWidth < 400){
            logoRef.current.style.display = 'none';
            searchInRef.current.style.display = 'block';
            console.log("si")
        }
    };

    return (
        <>
        <header className="header">
            
            <div className="header__container">
                    <Link  to={location.pathname !== '/e-commerse/build' ? '/e-commerse/build/Home/Editor'  : {}}  className="flex flex--center">
                        <img ref={logoRef} className="header__logo" src={image} alt="AluraLogo" />
                    </Link>
                    <div className="input-group searchDiv">
                        <button onClick={handleSearchMedia} className="input-group-text">
                            <SearchIcon/>
                        </button>
                        <input ref={searchInRef} type="text" className="form-control SearchIn" value={filter} onChange={handleSearchChange} />
                    </div>
                
            </div>
            {location.pathname === '/e-commerse/build' && (
                <Link to="/e-commerse/build/login" className="login-link">
                    <BtnLogin type="button" className="btn btn-outline-primary btnToLogin">Login</BtnLogin>
                </Link>
            )}
        </header>
        </>
    )
}

export default Header