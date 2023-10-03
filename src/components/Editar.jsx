import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "../assets/css/ListCategories.css"
import "../assets/css/Iniciar.css"
import { buscar } from "../api/api"

const Editar = () => {

    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        buscar(`/posts/${id}`, setPost)
    }, [id])

    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene la recarga de la página
        try {
            const response = await fetch(`http://https://my-json-server.typicode.com/ErickDal448/Json-db/db/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(`Post con id ${id} actualizado.`);
            navigate(-1);
        } catch (error) {
            console.log('Hubo un problema con la petición Fetch: ' + error.message);
        }
    };

    if (!post) return null;

    return (
        <form className="formIniciar" name="form" onSubmit={handleSubmit}>
                
            <h3>Editar producto</h3>

            <div className="form-floating mb-3">
                <input type="text" className="formcontato__input form-control inURL" id="inURL" name="URL" placeholder="URL de la imagen" value={post.url} onChange={e => setPost({ ...post, url: e.target.value })} />
                <label htmlFor="inURL">URL de la imagen</label>
                <div className="mensaje-error"></div>
            </div>

            <div className="form-floating  mb-3">
                <input type='text' className="formcontato__textarea form-control inCategoria" placeholder="Escriba su categoria" name="Categoria" id="inCategoria" value={post.categoria} onChange={e => setPost({ ...post, categoria: e.target.value })}></input>
                <label htmlFor="inCategoria">Categoria</label>
                <div className="mensaje-error"></div>
            </div>

            <div className="form-floating  mb-3">
                <input type='text' className="formcontato__textarea form-control inNombre" placeholder="Escriba el nombre del producto" name="Nombre" id="inNombre" value={post.nombre} onChange={e => setPost({ ...post, nombre: e.target.value })}></input>
                <label htmlFor="inNombre">Nombre del producto</label>
                <div className="mensaje-error"></div>
            </div>

            <div className="form-floating  mb-3">
                <input type='text' className="formcontato__textarea form-control inPrecio" placeholder="Escriba su precio" name="Precio" id="inPrecio" value={post.precio} onChange={e => setPost({ ...post, precio: e.target.value })}></input>
                <label htmlFor="inPrecio">Precio</label>
                <div className="mensaje-error"></div>
            </div>

            <div className="form-floating  mb-3" >
                <textarea className="formcontato__textarea form-control inDescripcion" rows="5" cols="40" placeholder="Escribe tu descripcion del producto" name="Descripcion" id="txtDescripcion" style={{height: "100px"}} value={post.descripcion} onChange={e => setPost({ ...post, descripcion: e.target.value })}></textarea>
                <label htmlFor="txtDescripcion">Descripción del producto</label>
                <div className="mensaje-error"></div>
            </div>

            <div className="d-grid gap-1">
                <button type="submit" className="btn btn-warning btn-lg btnSubmit"> Editar Producto </button>
            </div>
        </form>
    )
}

export default Editar;
