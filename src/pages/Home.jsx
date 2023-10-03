import ListCategories from "../components/ListCategories";
import Promo from "../components/promo";
import React from "react";
import { useLocation } from 'react-router-dom';
import { PromoFilterContext } from "../components/FilterContext";

const Home = () => {
  const location = useLocation();
  const [promoFilter, setPromoFilter] = React.useState('');
  return (
    <PromoFilterContext.Provider value={{ filter: promoFilter, setFilter: setPromoFilter }}>
      {location.pathname === '/' && <Promo />}
      <main>
        <div>
          <ListCategories/>
        </div>
      </main>
    </PromoFilterContext.Provider>

  )
}

export default Home