import React from "react"
import styles from "./Spinner.module.scss"

interface SpinnerProps {
  mainCircleRef: React.RefObject<HTMLDivElement>
  currentEvent: number
  numberOfEvents: number
  angle: number
  timeOfRotation: number
  onLoadThis: (index: number) => void
}

// Порядок заголовков — как в оригинале
const TITLES = ["Наука", "Литература", "Кино", "Театр", "Игры", "Космос"]

const Spinner = ({
  mainCircleRef,
  currentEvent,
  numberOfEvents,
  angle,
  timeOfRotation,
  onLoadThis,
}: SpinnerProps) => {
  return (
    <div className={styles.spinner}>
      <div
        ref={mainCircleRef}
        className={styles.spinner__main_circle}
        style={
          {
            "--count": numberOfEvents,
            "--angle": `${angle}deg`,
            "--time": `${timeOfRotation}ms`,
            "--delay": `${timeOfRotation + 300}ms`,
          } as React.CSSProperties
        }
      >
        {TITLES.map((title, index) => {
          const idx = index + 1
          return (
            <div
              key={index}
              className={`${styles.spinner__shoulder} ${
                currentEvent === index ? styles.spinner__shoulder_active : ""
              }`}
              style={{ "--i": idx } as React.CSSProperties}
              onClick={() => onLoadThis(index)}
            >
              <div className={styles.spinner__circle_area}>
                <p className={styles.spinner__circle}>
                  {idx}
                  <span className={styles.spinner__title}>{title}</span>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Spinner
