import React from 'react';
import SliderHome from './SliderHome/SliderHome';
import CategoriesHome from './CategoriesHome/CategoriesHome';

const Home = () => {
  return (
    <div className=''>
      <SliderHome />
      <div className='w-11/12 mx-auto my-6'>
        <CategoriesHome
          title={"Fashion"}
          category={"fashion"}
        />
        <CategoriesHome
          title={"Make Up"}
          category={"makeup"}
        />
        <CategoriesHome
          title={"Skin Care"}
          category={"skincare"}
        />
        <CategoriesHome
          title={"Hair Care"}
          category={"haircare"}
        />
      </div>
    </div>

  );
};

export default Home;