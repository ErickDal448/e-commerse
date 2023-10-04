import { useLocation, useNavigate  } from 'react-router-dom';

const ListPosts = ({ posts }) => {
    
    const location = useLocation();
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este post?")) {
            try {
                const response = await fetch(`/posts/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log(`Post con id ${id} eliminado.`);
                navigate(0);
            } catch (error) {
                console.log('Hubo un problema con la petición Fetch: ' + error.message);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/e-commerse/build/Home/Editor/Editar/${id}`);
    };

    return (
        <>
            {
                posts.map(post => {
                    const { id, nombre, url, categoria, precio } = post;
                    return<div className="card" >
                        {location.pathname !== '/' && (<><i type="button" className="bi bi-pencil btn-edit btn-editar" data-bs-dismiss="modal" data-id={`${id}`} aria-label="Close" onClick={() => handleEdit(id)}></i>
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

export default ListPosts
