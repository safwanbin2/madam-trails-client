import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import LoadingPage from '../../../Components/LoadingPage';
import ProductCard from '../../../Components/ProductCard';
import { BsBoxArrowUpRight } from 'react-icons/bs';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const CategoriesHome = ({ title, category }) => {
    const { setSubCategoryText } = useContext(AuthContext);
    const { data: products, isLoading } = useQuery({
        queryKey: ["/products/categories", "category", category],
        queryFn: async () => {
            const res = await fetch(`https://working-title-server.vercel.app/products/categories?category=${category}`);
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='my-6'>
            <div className='flex flex-col justify-center items-center mb-6'>
                <Link onClick={() => setSubCategoryText(category)} to={`/productspage/`} style={{ fontFamily: "'Lumanosimo', cursive" }} className='mb-1 drop-shadow-xl underline flex justify-center items-center gap-2'>
                    <p className='text-xl'>{title}</p>
                    <BsBoxArrowUpRight
                        className='text-primary'
                    />
                </Link>
            </div>
            <Swiper
                // effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={false} // Set loop to false
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className='swiper_container'
            >
                <SwiperSlide>
                    <div className='grid grid-cols-2 md:grid-cols-6 gap-2 py-4 w-full overflow-hidden'>
                        {
                            products.slice(0, 6).map((product) => <ProductCard
                                key={product._id}
                                product={product}
                            />)
                        }
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='grid grid-cols-2 md:grid-cols-6 gap-2 py-4 w-full overflow-hidden'>
                        {
                            products.slice(6, 12).map((product) => <ProductCard
                                key={product._id}
                                product={product}
                            />)
                        }
                    </div>
                </SwiperSlide>

                <div className="slider-controler ">
                    <div style={{ position: "relative" }} className="swiper-pagination mt-3 w-full flex justify-center items-center h-5 gap-1 cursor-pointer"></div>
                </div>
            </Swiper>
        </div>
    );
};

export default CategoriesHome;