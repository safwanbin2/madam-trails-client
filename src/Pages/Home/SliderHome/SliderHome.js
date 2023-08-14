import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import slide_image_1 from '../../../Assets/Banner/rush-dessert.png';
import slide_image_2 from '../../../Assets/Banner/rush-promo.png';
import slide_image_mobile_1 from '../../../Assets/Banner/rush-dessert-mobile.png';
import slide_image_mobile_2 from '../../../Assets/Banner/rush-promo-mobile.png';

import { Link } from 'react-router-dom';

const SliderHome = () => {
    console.log(new Date())
    return (
        <div className="mb-6 md:my-10">
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
                modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
                autoplay={{
                    delay: 8000,
                    disableOnInteraction: false,
                  }}
                className='swiper_container'
            >
                <SwiperSlide>
                    <Link to={`/productspage`}>
                        <img className='w-full hidden md:flex' src={slide_image_1} alt="slide_image" />
                        <img className='w-full md:hidden' src={slide_image_mobile_1} alt="slide_image" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={`/productspage`}>
                        <img className='w-full hidden md:flex' src={slide_image_2} alt="slide_image" />
                        <img className='w-full md:hidden' src={slide_image_mobile_2} alt="slide_image" />
                    </Link>
                </SwiperSlide>
                
                <div className="slider-controler ">
                    <div style={{ position: "relative" }} className="swiper-pagination mt-3 w-full flex justify-center items-center h-5 gap-1 cursor-pointer"></div>
                </div>
            </Swiper>
        </div>
    );
};

export default SliderHome;