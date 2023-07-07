import React from 'react';
import BoostedProducts from './BoostedProducts';
import CategoryProductsMen from './CategoryProductsMen';
import CategoryProductsWomen from './CategoryProductsWomen';
import Banner from './Banner/Banner';

const Home = () => {
  return (
    <div>
      <Banner />
      <div className='w-11/12 mx-auto my-6'>
        <BoostedProducts />
        <CategoryProductsMen />
        <CategoryProductsWomen />
      </div>
    </div>

  );
};

export default Home;