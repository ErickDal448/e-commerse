import { useState, useEffect, useRef } from 'react'
import "../assets/css/ListCategories.css"
import "../assets/css/Iniciar.css"
import { buscar } from "../api/api"
import { v4 as uuidv4 } from 'uuid'; // Importa la función para generar UUIDs
import { api } from '../api/api';

import { useNavigate } from 'react-router-dom';

const Crear = () => {
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);

    const nombreRef = useRef();
    const precioRef = useRef();
    const descripcionRef = useRef();
    const nombreErrorRef = useRef();
    const precioErrorRef = useRef();
    const descripcionErrorRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        buscar(`/categorias`, setCategories)
        buscar(`/posts`, setPosts)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault(); // Previene la recarga de la página
        let isValid = true;

        if (nombreRef.current.value.trim() === '' || nombreRef.current.value.length > 20) {
            nombreErrorRef.current.textContent = 'El campo nombre no puede estar vacío y debe tener un máximo de 20 caracteres';
            nombreRef.current.classList.add('is-invalid');
            isValid = false;
        } else {
            nombreErrorRef.current.textContent = '';
            nombreRef.current.classList.remove('is-invalid');
        }

        if (precioRef.current.value.trim() === '' || isNaN(precioRef.current.value)) {
            precioErrorRef.current.textContent = 'El campo precio no puede estar vacío y solo puede contener números';
            precioRef.current.classList.add('is-invalid');
            isValid = false;
        } else {
            precioErrorRef.current.textContent = '';
            precioRef.current.classList.remove('is-invalid');
        }

        if (descripcionRef.current.value.trim() === '' || descripcionRef.current.value.length > 150) {
            descripcionErrorRef.current.textContent = 'El campo descripción no puede estar vacío y debe tener un máximo de 150 caracteres';
            descripcionRef.current.classList.add('is-invalid');
            isValid = false;
        } else {
            descripcionErrorRef.current.textContent = '';
            descripcionRef.current.classList.remove('is-invalid');
        }

        if (isValid) {
            const newProduct = {
                id: uuidv4(), // Genera un nuevo UUID para el id
                url: document.getElementById('inURL').value,
                nombre: document.getElementById('inNombre').value,
                descripcion: document.getElementById('txtDescripcion').value,
                categoria: document.getElementById('inCategoria').value,
                precio: parseFloat(document.getElementById('inPrecio').value)
            };
            
            // Asegúrate de reemplazar 'your-json-server-url' con la URL de tu servidor JSON
            api.post('/posts', newProduct)
            .then(response => {
                console.log('Success:', response.data);
                navigate(-1);
                // Aquí puedes actualizar el estado de tu aplicación para reflejar la adición del nuevo producto
            })
            .catch((error) => {
                console.error('Hubo un problema con la petición Fetch: ' + error.message);
            });
        }
        
    };

    return (
        <form className="formIniciar" name="form" onSubmit={handleSubmit}>
                
            <h3>Agregar nuevo producto</h3>

            <div className="form-floating mb-3">
                <input type='text' className="formcontato__textarea form-control inURL" placeholder="O introduzca la URL de una imagen externa" name="URL" id="inURL"></input>
                <label htmlFor="inURL">URL de la imagen</label>
                <div className="mensaje-error"></div>
            </div>

            <div className="form-floating  mb-3">
                <input type='text' className="formcontato__textarea form-control inCategoria" placeholder="Escriba su categoria" name="Categoria" id="inCategoria"></input>
                <label htmlFor="inCategoria">Categoria</label>
                <div  className="mensaje-error"></div>
            </div>

            <div className="form-floating  mb-3">
                <input ref={nombreRef} type='text' className="formcontato__textarea form-control inNombre" placeholder="Escriba el nombre del producto" name="Nombre" id="inNombre"></input>
                <label htmlFor="inNombre">Nombre del producto</label>
                <div ref={nombreErrorRef} className="mensaje-error"></div>
            </div>

            <div className="form-floating  mb-3">
                <input ref={precioRef} type='number' className="formcontato__textarea form-control inPrecio" placeholder="Escriba su precio" name="Precio" id="inPrecio"></input>
                <label htmlFor="inPrecio">Precio</label>
                <div ref={precioErrorRef} className="mensaje-error"></div>
            </div>

            <div className="form-floating  mb-3" >
                <textarea ref={descripcionRef} className="formcontato__textarea form-control inDescripcion" rows="5" cols="40" placeholder="Escribe tu descripcion del producto" name="Descripcion" id="txtDescripcion" style={{height: "100px"}}></textarea>
                <label htmlFor="txtDescripcion">Descripción del producto</label>
                <div ref={descripcionErrorRef} className="mensaje-error"></div>
            </div>

            <div className="d-grid gap-1">
                <button type="submit" className="btn btn-primary btn-lg btnSubmit"> Agregar Producto </button>
            </div>
        </form>
    )
}

export default Crear;
