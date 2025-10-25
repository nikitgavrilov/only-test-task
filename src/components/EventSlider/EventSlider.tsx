import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { HistoricCategory } from "../../types/historic-dates"
import styles from "./EventSlider.module.scss"

interface EventSliderProps {
  sliderRef: React.RefObject<HTMLDivElement>
  currentEventData: HistoricCategory
  isVisible: boolean
}

const EventSlider = ({ sliderRef, currentEventData, isVisible }: EventSliderProps) => {
  return (
    <div
      ref={sliderRef}
      className={`${styles.slider} ${isVisible ? styles.slider_show : ""} ${styles.slider_order_2}`}
    >
      <p className={styles.slider__mobile_title}>{currentEventData.title}</p>
      <button className={`${styles.slider__btn} ${styles.slider__btn_prev}`}></button>
      <Swiper
        modules={[Navigation]}
        spaceBetween={80}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1.5, spaceBetween: 25 },
          769: { slidesPerView: 3, spaceBetween: 80 },
          1025: { slidesPerView: 4, spaceBetween: 80 },
        }}
        navigation={{
          prevEl: `.${styles.slider__btn_prev}`,
          nextEl: `.${styles.slider__btn_next}`,
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {currentEventData.events.map((item, index) => (
          <SwiperSlide
            key={index}
            className={styles.slider__slide}
          >
            <p className={styles.slider__year}>{item.date}</p>
            <p className={styles.slider__description}>{item.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={`${styles.slider__btn} ${styles.slider__btn_next}`}></button>
    </div>
  )
}

export default EventSlider
