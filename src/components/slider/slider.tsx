import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import styles from './slider.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface IImage {
  url: string | null;
}

interface ISlider {
  images: IImage[];
}

const path = 'https://strapi.cleverland.by';

export const Slider = ({ images }: ISlider) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  return (
    <React.Fragment>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mySwiper2}
      >
        {images.map((elem) => (
          <SwiperSlide key={nanoid()}>
            <img src={`${path}${elem.url}`} alt='book' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={30}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mySwiper}
      >
        {images.length === 1
          ? null
          : images.map((elem) => (
              <SwiperSlide data-test-id='slide-mini' key={nanoid()}>
                <img src={`${path}${elem.url}`} alt='book' />
              </SwiperSlide>
            ))}
      </Swiper>
    </React.Fragment>
  );
};
