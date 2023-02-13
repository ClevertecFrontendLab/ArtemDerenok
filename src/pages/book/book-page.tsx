import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import downImg from '../../assets/down.png';
import otherImg from '../../assets/icon_other.png';
import bookImg from '../../assets/image.png';
import upImg from '../../assets/up.png';
import { BookingBtn } from '../../components/booking-btn/booking-btn';
import { Rating } from '../../components/rating/rating';
import { Review } from '../../components/review/review';
import { Slider } from '../../components/slider/slider';
import { SliderTablet } from '../../components/slider/slider-tablet';
import books from '../../data/books.json';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getBookThunk } from '../../redux/slices/book-slice';

import styles from './book-page.module.scss';

export const BookPage = () => {
  const { bookId, categories } = useParams();
  const reviewsRef = useRef<HTMLDivElement>(null);
  const downArrow = useRef<HTMLImageElement>(null);
  const upArrow = useRef<HTMLImageElement>(null);

  const data = books.find((elem) => elem.id === Number(bookId));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBookThunk(3));
  }, [dispatch]);

  const handleVisibilityReviews = () => {
    if (reviewsRef.current?.classList.contains(styles.hideReview)) {
      downArrow.current?.classList.add(styles.hide);
      upArrow.current?.classList.remove(styles.hide);
    } else {
      downArrow.current?.classList.remove(styles.hide);
      upArrow.current?.classList.add(styles.hide);
    }

    reviewsRef.current?.classList.toggle(styles.hideReview);
  };

  return (
    <section className={styles.bookPage}>
      <div className={styles.bookPage_rout}>
        <p>
          {categories} / {data?.name}
        </p>
      </div>
      <div className={styles.bookPage_containerDescription}>
        <div className={data?.isImage ? styles.imageBookSlider : styles.imageBook}>
          {data?.isImage ? (
            <React.Fragment>
              <div className={styles.desctopSlider}>
                <Slider images={data.images} />
              </div>
              <div className={styles.mobileSlider}>
                <SliderTablet images={data.images} />
              </div>
            </React.Fragment>
          ) : (
            <img src={otherImg} alt='book' />
          )}
        </div>
        <div>
          <h2>{data?.name}</h2>
          <p className={styles.author}>{data?.author}</p>
          <BookingBtn state={data?.status.state} date={data?.status.date} />
          <h4>О книге</h4>
          <p className={styles.text}>{data?.decsription}</p>
        </div>
      </div>
      <div className={styles.bookPage_containerInfo}>
        <h4 className={styles.ratingHeading}>Рейтинг</h4>
        <div className={styles.rating}>
          <Rating rating={data?.rating} />
          <p>{data?.rating}</p>
        </div>
        <h4>Подробная информация</h4>
        <div className={styles.containerDetails}>
          <table>
            <thead>
              <tr>
                <td>Издательство</td>
                <td>Питер</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Год издания</td>
                <td>2019</td>
              </tr>
              <tr>
                <td>Страниц</td>
                <td>288</td>
              </tr>
              <tr>
                <td>Переплёт</td>
                <td>Мягкая обложка</td>
              </tr>
              <tr>
                <td>Формат</td>
                <td>70х100</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <td>Жанр</td>
                <td>Компьютерная литература</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Вес</td>
                <td>370 г</td>
              </tr>
              <tr>
                <td>ISBN</td>
                <td>978-5-4461-0923-4</td>
              </tr>
              <tr>
                <td>Изготовитель</td>
                <td>ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h4 className={styles.reviewHeading}>
            Отзывы
            <div
              data-test-id='button-hide-reviews'
              onClick={handleVisibilityReviews}
              tabIndex={0}
              role='button'
              onKeyDown={(event) => {
                if (event.code === 'Enter') {
                  handleVisibilityReviews();
                }
              }}
              className={styles.reviewHeading_imgContainer}
            >
              <img ref={upArrow} src={upImg} alt='hide reviews' />
              <img ref={downArrow} src={downImg} alt='show revies' className={styles.hide} />
            </div>
          </h4>
          <div className={styles.reviewContainer} ref={reviewsRef}>
            <Review name='Иван Иванов' date='5 января 2019' text='' rating={4} />
            <Review
              name='Николай Качков'
              date='20 июня 2018'
              text='Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение современных методик предоставляет широкие возможности для позиций, занимаемых участниками в отношении поставленных задач. Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы будут в равной степени предоставлены сами себе. Вот вам яркий пример современных тенденций — глубокий уровень погружения создаёт предпосылки для своевременного выполнения сверхзадачи. И нет сомнений, что акционеры крупнейших компаний, инициированные исключительно синтетически, превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.'
              rating={4}
            />
            <Review name='Екатерина Беляева' date='18 февраля 2018' text='' rating={3} />
          </div>
          <button data-test-id='button-rating' className={styles.reviewBtn} type='button'>
            Оценить книгу
          </button>
        </div>
      </div>
    </section>
  );
};
