import { useLocation, useNavigate  } from 'react-router-dom';
import data from '../api/data.json'

const ListPosts = ({ posts }) => {
    
    const location = useLocation();
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este post?")) {
            // Encuentra el índice del post en la base de datos
            const index = data.posts.findIndex(post => post.id === id);
            // Si el post existe, elimínalo de la base de datos
            if (index !== -1) {
                data.posts.splice(index, 1);
                console.log(`Post con id ${id} eliminado.`);
                navigate(0);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/e-commerse/build/Home/Editor/Editar/${id}`);
    };

    return (
        <>
            {
                posts.map(post => { // Usa data.posts en lugar de posts
                    const { id, nombre, url, categoria, precio } = post;
                    return<div className="card" >
                        {location.pathname !== '/e-commerse/build/' && (<><i type="button" className="bi bi-pencil btn-edit btn-editar" data-bs-dismiss="modal" data-id={`${id}`} aria-label="Close" onClick={() => handleEdit(id)}></i>
                        <i type="button" className="bi bi-trash btn-edit btn-delete" data-bs-dismiss="modal" aria-label="Close" data-id={`${id}`} onClick={() => handleDelete(id)}></i></>)}
                        <img src={`${url}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{nombre}</h5>
                                <p className="card-text">$ {precio}</p>
                                <a href="#" className="btn btn-outline-primary btnInfoProd">Ver Producto</a>
                            </div>
                           
                        </div>
                })
            }
        </>
    )
}

export default ListPosts;
