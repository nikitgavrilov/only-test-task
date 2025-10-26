import React, { useRef, useEffect, useState, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks"
import {
  fetchScience,
  fetchLiterature,
  fetchCinema,
  fetchTheatre,
  fetchGames,
  fetchSpace,
} from "../../store/slices"
import HistoricDatesHeading from "../../components/HistoricDatesHeading/HistoricDatesHeading"
import DateRange from "../../components/DateRange/DateRange"
import Spinner from "../../components/Spinner/Spinner"
import NavigationControls from "../../components/NavigationControls/NavigationControls"
import EventSlider from "../../components/EventSlider/EventSlider"
import MobileEventButtons from "../../components/MobileEventButtons/MobileEventButtons"
import styles from "./MainPage.module.scss"

const CATEGORIES = [
  { key: "science", title: "Наука" },
  { key: "literature", title: "Литература" },
  { key: "cinema", title: "Кино" },
  { key: "theatre", title: "Театр" },
  { key: "games", title: "Игры" },
  { key: "space", title: "Космос" },
] as const

const MainPage = () => {
  const dispatch = useAppDispatch()
  const sliderRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const mainCircleRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const startDateRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const endDateRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const [isSliderVisible, setIsSliderVisible] = useState(false)

  // Загрузка всех данных
  useEffect(() => {
    dispatch(fetchScience())
    dispatch(fetchLiterature())
    dispatch(fetchCinema())
    dispatch(fetchTheatre())
    dispatch(fetchGames())
    dispatch(fetchSpace())
  }, [dispatch])

  // Получаем данные из Redux
  const science = useAppSelector(state => state.science.items)
  const literature = useAppSelector(state => state.literature.items)
  const cinema = useAppSelector(state => state.cinema.items)
  const theatre = useAppSelector(state => state.theatre.items)
  const games = useAppSelector(state => state.games.items)
  const space = useAppSelector(state => state.space.items)

  // Собираем все категории в массив как в оригинале
  const historicData = useMemo(() => {
    return CATEGORIES.map(cat => {
      let events = []
      switch (cat.key) {
        case "science":
          events = science
          break
        case "literature":
          events = literature
          break
        case "cinema":
          events = cinema
          break
        case "theatre":
          events = theatre
          break
        case "games":
          events = games
          break
        case "space":
          events = space
          break
      }
      return {
        title: cat.title,
        events,
      }
    })
  }, [science, literature, cinema, theatre, games, space])

  // Состояние для навигации
  const [currentEvent, setCurrentEvent] = useState<number>(0)
  const numberOfEvents = historicData.length
  const angleBetweenDots = 360 / numberOfEvents
  const defaultTimeOfRotation = 300
  const [angle, setAngle] = useState<number>(angleBetweenDots)
  const [timeOfRotation, setTimeOfRotation] = useState<number>(defaultTimeOfRotation)

  // Состояние для дат
  const [startDate, setStartDate] = useState<number>(0)
  const [endDate, setEndDate] = useState<number>(0)

  // Обновляем даты при изменении текущей категории
  useEffect(() => {
    const currentCategory = historicData[currentEvent]
    if (currentCategory && currentCategory.events.length > 0) {
      const firstDate = Number(currentCategory.events[0].date)
      const lastDate = Number(currentCategory.events[currentCategory.events.length - 1].date)
      setStartDate(firstDate)
      setEndDate(lastDate)
    }
  }, [historicData, currentEvent]) // ✅ Следим за данными и текущим событием

  // Анимация появления слайдера
  useEffect(() => {
    setIsSliderVisible(false)
    const timer = setTimeout(() => {
      setIsSliderVisible(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [currentEvent])

  const loadThis = (index: number): void => {
    if (index < 0 || index >= numberOfEvents) return
    setCurrentEvent(index)
  }

  const loadPrev = (): void => loadThis(currentEvent - 1)
  const loadNext = (): void => loadThis(currentEvent + 1)

  const getTotal = (length: number, index: number): string => {
    return `${String(index + 1).padStart(2, "0")}/${String(length).padStart(2, "0")}`
  }

  return (
    <main className={styles.main}>
      <section className={styles.historicDates}>
        <HistoricDatesHeading />
        <DateRange
          startDateRef={startDateRef}
          endDateRef={endDateRef}
          startDate={startDate}
          endDate={endDate}
        />
        <Spinner
          mainCircleRef={mainCircleRef}
          currentEvent={currentEvent}
          numberOfEvents={numberOfEvents}
          angle={angle}
          timeOfRotation={timeOfRotation}
          onLoadThis={loadThis}
        />
        <NavigationControls
          total={getTotal(numberOfEvents, currentEvent)}
          onPrev={loadPrev}
          onNext={loadNext}
          currentEvent={currentEvent}
          numberOfEvents={numberOfEvents}
        />
        <EventSlider
          sliderRef={sliderRef}
          currentEventData={historicData[currentEvent]}
          isVisible={isSliderVisible}
        />
        <MobileEventButtons
          numberOfEvents={numberOfEvents}
          currentEvent={currentEvent}
          onLoadThis={loadThis}
        />
      </section>
    </main>
  )
}

export default MainPage
