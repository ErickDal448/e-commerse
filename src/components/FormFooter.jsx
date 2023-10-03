import { useState, useRef } from 'react';
import "../assets/css/global.css"
import "../assets/css/footer.css"

const FormularioFooter = () => {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');
    const nombreRef = useRef();
    const mensajeRef = useRef();
    const nombreErrorRef = useRef();
    const mensajeErrorRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        let isValid = true;

        if (nombre.trim() === '') {
            nombreErrorRef.current.textContent = 'El campo nombre no puede estar vacío';
            nombreRef.current.classList.add('is-invalid');
            isValid = false;
        } else if (nombre.length > 40) {
            nombreErrorRef.current.textContent = 'El nombre no puede tener más de 40 caracteres';
            nombreRef.current.classList.add('is-invalid');
            isValid = false;
        } else {
            nombreErrorRef.current.textContent = '';
            nombreRef.current.classList.remove('is-invalid');
        }

        if (mensaje.trim() === '') {
            mensajeErrorRef.current.textContent = 'El campo mensaje no puede estar vacío';
            mensajeRef.current.classList.add('is-invalid');
            isValid = false;
        } else if (mensaje.length > 120) {
            mensajeErrorRef.current.textContent = 'El mensaje no puede tener más de 120 caracteres';
            mensajeRef.current.classList.add('is-invalid');
            isValid = false;
        } else {
            mensajeErrorRef.current.textContent = '';
            mensajeRef.current.classList.remove('is-invalid');
        }

        if (isValid) {
            console.log(`Nombre: ${nombre}, Mensaje: ${mensaje}`);
        }
    };

    return (
        <form className="formcontato__form" name="form" onSubmit={handleSubmit}>
                
            <div className="form-floating mb-3">
                <input ref={nombreRef} type="text" className="formcontato__input form-control inNombre" id="inNombre" name="Nombre" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                <label htmlFor="inNombre">Nombre</label>
                <div ref={nombreErrorRef} className="mensaje-error"></div>
            </div>

            <div className="form-floating">
                <textarea ref={mensajeRef} className="formcontato__textarea form-control inMensaje" rows="5" cols="40" placeholder="Escribe tu mensaje" name="mensaje" id="mensagem" style={{height: "100px"}} value={mensaje} onChange={e => setMensaje(e.target.value)}></textarea>
                <label htmlFor="mensagem">Mensaje</label>
                <div ref={mensajeErrorRef} className="mensaje-error"></div>
            </div>

            <button type="submit" className="btn btn-outline-primary" style={{ margin: "1rem 3rem"}}> Enviar mensaje</button>
        </form>
    );
};

export default FormularioFooter;
