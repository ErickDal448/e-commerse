import './App.css';
import React from 'react';
import Footer from './components/Footer';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import EditProduct from './pages/EditProduct';
import Page404 from './pages/Page404';

import { FilterContext } from './components/FilterContext';

import Header from './components/Header';
import AddProduct from './pages/AddProduct';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/assets/css/media.css'
function App() {
  
  const [filter, setFilter] = React.useState('');
  return (
    <Router>
      <FilterContext.Provider value={{ filter, setFilter }}>
        <Header/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<LogIn/>} />
            <Route path='/Home/Editor' element={<Home/>} />
            <Route path='/Home/Editor/Crear' element={<AddProduct/>} />
            <Route path='/Home/Editor/Editar/:id' element={<EditProduct/>} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        <Footer/>
      </FilterContext.Provider>
    </Router>
  );
}

export default App;
