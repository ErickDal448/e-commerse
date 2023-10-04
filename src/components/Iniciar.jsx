import { useState, useEffect, useRef } from 'react'
import "../assets/css/ListCategories.css"
import "../assets/css/Iniciar.css"
import { Link } from "react-router-dom"
import { buscar } from "../api/api"
import { useNavigate } from 'react-router-dom'
import data from '../api/data.json'

const Iniciar = () => {
    const navigate  = useNavigate();
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailRef = useRef();
    const passwordRef = useRef();
    const emailErrorRef = useRef();
    const passwordErrorRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (email.trim() === '') {
            emailErrorRef.current.textContent = 'El campo correo no puede estar vacío';
            emailRef.current.classList.add('is-invalid');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            emailErrorRef.current.textContent = 'El correo debe estar en formato de correo electrónico';
            emailRef.current.classList.add('is-invalid');
            isValid = false;
        } else {
            emailErrorRef.current.textContent = '';
            emailRef.current.classList.remove('is-invalid');
        }

        if (password.trim() === '') {
            passwordErrorRef.current.textContent = 'El campo contraseña no puede estar vacío';
            passwordRef.current.classList.add('is-invalid');
            isValid = false;
        } else {
            passwordErrorRef.current.textContent = '';
            passwordRef.current.classList.remove('is-invalid');
        }

        if (isValid) {
        const user = data.User.find(user => user.email === email && user.Password === password);

        if (user) {
            // El usuario existe, redirige a la página siguiente
            navigate('/e-commerse/build/Home/Editor');
        } else {
            // Usuario no encontrado, muestra una alerta
            alert("Usuario no encontrado...");
        }
    }
    };

    useEffect(() => {
        buscar(`/categorias`, setCategories)
        buscar(`/posts`, setPosts)
    }, [])

    return (
        <form onSubmit={handleSubmit} className="formIniciar" name="form">
                
            <h3>Iniciar Sesión</h3>

            <div className="form-floating mb-3">
                <input ref={emailRef} value={email} onChange={e => setEmail(e.target.value)} type="text" className="formcontato__input form-control inCorreo" id="inCorreo" name="Correo" placeholder="Escriba su correo electronico" />
                <label htmlFor="inCorreo">Correo</label>
                <div ref={emailErrorRef} className="mensaje-error"></div>
            </div>

            <div className="form-floating">
                <input ref={passwordRef} type='password' value={password} onChange={e => setPassword(e.target.value)} className="formcontato__textarea form-control inContraseña" placeholder="Escriba su contraseña" name="Contraseña" id="inContraseña"></input>
                <label htmlFor="inContraseña">Contraseña</label>
                <div ref={passwordErrorRef} className="mensaje-error"></div>
            </div>
            
            <div className="d-grid gap-1">
                <button type="submit" className="btn btn-primary btn-lg btnSubmit"> Entrar </button>
            </div>
        </form>
    )
}

export default Iniciar;
