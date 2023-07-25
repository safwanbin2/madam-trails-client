import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import slide_image_1 from '../../../Assets/Banner/demo-banner.jpg';
import slide_image_2 from '../../../Assets/Banner/demo-banner.jpg';
import slide_image_3 from '../../../Assets/Banner/demo-banner.jpg';
import slide_image_4 from '../../../Assets/Banner/demo-banner.jpg';
import slide_image_5 from '../../../Assets/Banner/demo-banner.jpg';
import slide_image_6 from '../../../Assets/Banner/demo-banner.jpg';
import slide_image_7 from '../../../Assets/Banner/demo-banner.jpg';
import { Link } from 'react-router-dom';

// navigation={{
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//     clickable: true,
// }}

const SliderHome = () => {
    return (
        <div className="mb-6 md:my-10">
            <Swiper
                effect={'coverflow'}
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
                autoplay={{ delay: 1000 }}
                className='swiper_container'
            >
                <SwiperSlide>
                    <Link to={`/productspage`}>
                        <img className='w-full h-full md:h-[350px]' src={slide_image_1} alt="slide_image" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={`/productspage`}>
                        <img className='w-full h-full md:h-[350px]' src={slide_image_2} alt="slide_image" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={`/productspage`}>
                        <img className='w-full h-full md:h-[350px]' src={slide_image_3} alt="slide_image" />
                    </Link>
                </SwiperSlide>

                <div className="slider-controler ">
                    <div style={{ position: "relative" }} className="swiper-pagination mt-3 w-full flex justify-center items-center h-5 gap-2 cursor-pointer"></div>
                </div>
            </Swiper>
        </div>
    );
};

export default SliderHome;