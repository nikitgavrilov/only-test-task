import { useState } from "react"
import { HistoricDates } from "./../types/historic-dates"

interface UseSpinnerNavigationProps {
  historicDates: HistoricDates
  defaultTimeOfRotation?: number
}

export const useSpinnerNavigation = ({
  historicDates,
  defaultTimeOfRotation = 300,
}: UseSpinnerNavigationProps) => {
  const numberOfEvents = historicDates.length
  const angleBetweenDots = 360 / numberOfEvents

  const [currentEvent, setCurrentEvent] = useState<number>(0)
  const [angle, setAngle] = useState<number>(angleBetweenDots)
  const [timeOfRotation, setTimeOfRotation] = useState<number>(defaultTimeOfRotation)

  const loadThis = (index: number): void => {
    if (index < 0 || index >= numberOfEvents) return

    const angleOfRotation = angleBetweenDots - index * angleBetweenDots
    setTimeOfRotation(Math.abs(currentEvent - index) * defaultTimeOfRotation)

    setTimeout(() => {
      setAngle(angleOfRotation)
      setCurrentEvent(index)
    }, 300)
  }

  const loadPrev = (): void => loadThis(currentEvent - 1)
  const loadNext = (): void => loadThis(currentEvent + 1)

  const getTotal = (length: number, index: number): string => {
    return `${String(index + 1).padStart(2, "0")}/${String(length).padStart(2, "0")}`
  }

  return {
    currentEvent,
    angle,
    timeOfRotation,
    numberOfEvents,
    angleBetweenDots,
    defaultTimeOfRotation,
    loadThis,
    loadPrev,
    loadNext,
    getTotal,
  }
}
