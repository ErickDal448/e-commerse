import { useState, useEffect } from 'react'
import React from 'react'
import "../assets/css/ListCategories.css"
import { Link } from "react-router-dom"
import { buscar } from "../api/api"
import ListPosts from './ListPosts'
import { useLocation } from 'react-router-dom';
import { FilterContext } from './FilterContext';
import styled from '@emotion/styled'

const DivCard = styled.div`
    .card{
        margin-top:2rem;
    }
`;

const ListCategories = () => {
    const location = useLocation();
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);

    useEffect(() => {
        buscar(`/categorias`, setCategories)
        buscar(`/posts`, setPosts)

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 800);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const { filter } = React.useContext(FilterContext);
    const [categoryFilter, setCategoryFilter] = useState('');

    const filteredPosts = posts.filter(post => (post.nombre.includes(filter) || post.categoria.includes(filter)));

    return (
        <ul className="category-list container flex">
            {location.pathname !== '/' && 
            <div className='AllProducts'>
                <h2>Todos los productos</h2>
                <Link to={'/Home/Editor/Crear'}><button type="button" className="btn btn-primary">Agregar Producto</button></Link>
            </div>
            }
            {
                filter !== '' ? (
                    <div className='SearchResults'>
                        
                                <li className={`category-list__category `}>
                                    <h2>Busqueda: {filter}</h2>
                                    <DivCard className='divPosts' style={ {marginTop: '2rem' }}>
                                    {
                                        filteredPosts.map(post => (
                                            <ListPosts posts={[post]} />
                                        ))
                                    }
                                    </DivCard>
                                </li>
                           
                    </div>
                ) : (
                    categories.map(category => (
                        categoryFilter === '' || category.id === categoryFilter ? (
                          <li className={`category-list__category category-list__category--${category.id}`}
                            style={location.pathname !== '/' ? { paddingTop: '0rem' } : {}}
                          >
                            <div className='divCategorie'>
                                {location.pathname === '/' && (
                                    <>
                                        <h2>{category.id} </h2>
                                        <button 
                                            onClick={() => setCategoryFilter(categoryFilter === category.id ? '' : `${category.id}`)} 
                                            className={`btn btnInfoProd ${categoryFilter === category.id ? 'btn-outline-danger' : 'btn-outline-primary'}`} 
                                        >
                                            {categoryFilter === category.id ? 'Regresar' : 'Ver Todos'}
                                        </button>
                                    </>
                                )}
                            </div>
    
                            <div className='divPosts'>
    
                            {(categoryFilter === '' && location.pathname === '/') ? <ListPosts posts={filteredPosts.filter(post => post.categoria === category.id).slice(0, isSmallScreen ? 4 : 6)} /> : <ListPosts posts={filteredPosts.filter(post => post.categoria === category.id)} />}
                            </div>
                          </li>
                        ) : null
                      ))
                )
            }
        </ul>
    )
    
}

export default ListCategories;
