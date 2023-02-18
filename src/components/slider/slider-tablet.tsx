import { nanoid } from 'nanoid';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './slider-tablet.module.scss';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface IImage {
  url: string | null;
}

interface ISliderTablet {
  images: IImage[];
}

const path = 'https://strapi.cleverland.by';

export const SliderTablet = ({ images }: ISliderTablet) => (
  <Swiper
    data-test-id='slide-big'
    pagination={{
      clickable: true,
    }}
    modules={[Pagination]}
    className={styles.mySwiper}
  >
    {images.map((elem) => (
      <SwiperSlide data-test-id='slide-mini' key={nanoid()}>
        <img src={`${path}${elem.url}`} alt='book' />
      </SwiperSlide>
    ))}
  </Swiper>
);
