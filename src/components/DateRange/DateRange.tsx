import React from "react"
import styles from "./DateRange.module.scss"

interface DateRangeProps {
  startDateRef: React.RefObject<HTMLDivElement>
  endDateRef: React.RefObject<HTMLDivElement>
  startDate: number
  endDate: number
}

const DateRange = ({ startDateRef, endDateRef, startDate, endDate }: DateRangeProps) => {
  return (
    <div className={styles.range}>
      <p
        className={styles.range_start}
        ref={startDateRef}
      >
        {startDate}
      </p>
      <p
        className={styles.range_end}
        ref={endDateRef}
      >
        {endDate}
      </p>
    </div>
  )
}

export default DateRange
