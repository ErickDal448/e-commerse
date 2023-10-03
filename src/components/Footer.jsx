import image from "../assets/img/Logo.png";
import { Link } from "react-router-dom";
import React from 'react';
import "../assets/css/global.css"
import "../assets/css/footer.css"
import FormularioFooter from "./FormFooter";

const Footer = () => {
    return (
        <>
        <div className="footer">
            
            <div className="header__container">
                <Link to="/e-commerse/build/" className="flex flex--center">
                    <img className="header__logo" src={image} alt="AluraLogo" />
                </Link>
                <ul className="ulAbout">
                    <li>Quienes Somos</li>
                    <li>Politica de privacidad</li>
                    <li>Programa de fidelidad</li>
                    <li>Nuestras tiendas</li>
                    <li>Quiero ser franquiciado</li>
                    <li>Anúncie aquí</li>
                </ul>
            </div>

            <FormularioFooter></FormularioFooter>
    
        </div>
        <footer>
            <section className="footer">
                <div className="footer__rodape">
                    <p>Desarrollado por Erick Leon</p>
                    <p>2023</p>
                </div>
            </section>
        </footer>
        </>
    )
}

export default Footer