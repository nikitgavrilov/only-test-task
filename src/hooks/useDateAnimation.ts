import { RefObject, useState } from "react"
import gsap from "gsap"

interface HistoricCategory {
  title: string
  events: { date: string; description: string }[]
}

interface UseDateAnimationProps {
  initialStartDate: number
  initialEndDate: number
  startDateRef: RefObject<HTMLDivElement>
  endDateRef: RefObject<HTMLDivElement>
}

export const useDateAnimation = ({
  initialStartDate,
  initialEndDate,
  startDateRef,
  endDateRef,
}: UseDateAnimationProps) => {
  const [startDate, setStartDate] = useState<number>(initialStartDate)
  const [endDate, setEndDate] = useState<number>(initialEndDate)

  const animateDatesRange = (category: HistoricCategory, timeOfRotation: number): void => {
    if (category.events.length === 0) return

    const newStartDate = Number(category.events[0].date)
    const newEndDate = Number(category.events[category.events.length - 1].date)
    const startRange = newStartDate - startDate
    const endRange = newEndDate - endDate
    const animationTime = (timeOfRotation + 300) / 1000

    gsap.to(startDateRef.current, {
      duration: animationTime,
      textContent: `+=${startRange}`,
      roundProps: "textContent",
      ease: "none",
      onUpdate: () => setStartDate(newStartDate),
    })

    gsap.to(endDateRef.current, {
      duration: animationTime,
      textContent: `+=${endRange}`,
      roundProps: "textContent",
      ease: "none",
      onUpdate: () => setEndDate(newEndDate),
    })
  }

  return {
    startDate,
    endDate,
    animateDatesRange,
  }
}
