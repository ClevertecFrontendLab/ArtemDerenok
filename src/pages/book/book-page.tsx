/* eslint-disable no-negated-condition */
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import downImg from '../../assets/down.png';
import otherImg from '../../assets/icon_other.png';
import upImg from '../../assets/up.png';
import { BookingBtn } from '../../components/booking-btn/booking-btn';
import { Rating } from '../../components/rating/rating';
import { Review } from '../../components/review/review';
import { Slider } from '../../components/slider/slider';
import { SliderTablet } from '../../components/slider/slider-tablet';
import books from '../../data/books.json';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useTypeSelector } from '../../hooks/use-type-selector';
import { getBookThunk } from '../../redux/slices/book-slice';

import styles from './book-page.module.scss';

export const BookPage = () => {
  const { bookId } = useParams();
  const reviewsRef = useRef<HTMLDivElement>(null);
  const downArrow = useRef<HTMLImageElement>(null);
  const upArrow = useRef<HTMLImageElement>(null);

  const data = books.find((elem) => elem.id === Number(bookId));

  const bookData = useTypeSelector((state) => state.bookReducer.book);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBookThunk(Number(bookId)));
  }, [bookId, dispatch]);

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

  const result =
    bookData !== null ? (
      <section className={styles.bookPage}>
        <div className={styles.bookPage_rout}>
          <p>
            {bookData?.categories[0]} / {bookData?.title}
          </p>
        </div>
        <div className={styles.bookPage_containerDescription}>
          <div className={data?.isImage ? styles.imageBookSlider : styles.imageBook}>
            {bookData.images ? (
              <React.Fragment>
                <div className={styles.desctopSlider}>
                  <Slider images={bookData.images} />
                </div>
                <div className={styles.mobileSlider}>
                  <SliderTablet images={bookData.images} />
                </div>
              </React.Fragment>
            ) : (
              <img src={otherImg} alt='book' />
            )}
          </div>
          <div>
            <h2>{bookData?.title}</h2>
            <p className={styles.author}>{data?.author}</p>
            <BookingBtn booking={bookData?.booking} delivery={bookData?.delivery} />
            <h4>О книге</h4>
            <p className={styles.text}>{bookData?.description}</p>
          </div>
        </div>
        <div className={styles.bookPage_containerInfo}>
          <h4 className={styles.ratingHeading}>Рейтинг</h4>
          <div className={styles.rating}>
            <Rating rating={bookData?.rating} />
          </div>
          <h4>Подробная информация</h4>
          <div className={styles.containerDetails}>
            <table>
              <thead>
                <tr>
                  <td>Издательство</td>
                  <td>{bookData?.publish}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Год издания</td>
                  <td>{bookData?.issueYear}</td>
                </tr>
                <tr>
                  <td>Страниц</td>
                  <td>{bookData?.pages}</td>
                </tr>
                <tr>
                  <td>Переплёт</td>
                  <td>{bookData?.cover}</td>
                </tr>
                <tr>
                  <td>Формат</td>
                  <td>{bookData?.format}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <td>Жанр</td>
                  <td>{bookData?.categories[0]}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Вес</td>
                  <td>{bookData?.weight} г</td>
                </tr>
                <tr>
                  <td>ISBN</td>
                  <td>{bookData?.ISBN}</td>
                </tr>
                <tr>
                  <td>Изготовитель</td>
                  <td>{bookData?.producer}</td>
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
                {bookData?.comments !== null ? (
                  <React.Fragment>
                    <img ref={upArrow} src={upImg} alt='hide reviews' />
                    <img ref={downArrow} src={downImg} alt='show revies' className={styles.hide} />
                  </React.Fragment>
                ) : (
                  <p className={styles.zeroReview}>0</p>
                )}
              </div>
            </h4>
            <div className={styles.reviewContainer} ref={reviewsRef}>
              {bookData?.comments !== null
                ? bookData?.comments.map((elem) => (
                    <Review
                      key={nanoid()}
                      name={`${elem.user.firstName} ${elem.user.lastName}`}
                      date={elem.createdAt}
                      text={elem.text}
                      rating={Number(elem.rating)}
                    />
                  ))
                : null}
            </div>
            <button data-test-id='button-rating' className={styles.reviewBtn} type='button'>
              Оценить книгу
            </button>
          </div>
        </div>
      </section>
    ) : null;

  return result;
};
