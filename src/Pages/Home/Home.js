import React, { useState } from 'react';
import BoostedProducts from './BoostedProducts';
import CategoryProductsMen from './CategoryProductsMen';
import CategoryProductsWomen from './CategoryProductsWomen';
import Banner from './Banner/Banner';

const Home = () => {
  const [category, setCategory] = useState("men");
  return (
    <div>
      <Banner />
      <div className='w-11/12 mx-auto my-6'>
        <BoostedProducts />
        <div className='w-full md:w-4/12 flex gap-2 mt-12 mb-6'>
          <button
            onClick={() => setCategory("men")}
            className={`${category === "men" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-10 py-1 text-sm md:text-base rounded-3xl hover:shadow-lg border  transition-all duration-300 w-full`}>Men</button>
          <button
            onClick={() => setCategory("women")}
            className={`${category === "women" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent "} px-4 md:px-10 py-1 text-sm md:text-base rounded-3xl hover:shadow-lg border transition-all duration-300 w-full`}>Women</button>
        </div>
        {
          category === "men" ?
            <CategoryProductsMen />
            :
            <CategoryProductsWomen />
        }
      </div>
    </div>

  );
};

export default Home;