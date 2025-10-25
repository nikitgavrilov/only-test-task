import styles from "./NavigationControls.module.scss"

interface NavigationControlsProps {
  total: string
  onPrev: () => void
  onNext: () => void
  currentEvent: number
  numberOfEvents: number
}

const NavigationControls = ({
  total,
  onPrev,
  onNext,
  currentEvent,
  numberOfEvents,
}: NavigationControlsProps) => {
  return (
    <div className={`${styles.navigation} ${styles.navigation_order_1}`}>
      <p className={styles.navigation__total}>{total}</p>
      <div className={styles.control_buttons}>
        <button
          className={`${styles.control_buttons__default} ${styles.control_buttons__prev}`}
          onClick={onPrev}
          disabled={currentEvent === 0}
        />
        <button
          className={`${styles.control_buttons__default} ${styles.control_buttons__next}`}
          onClick={onNext}
          disabled={currentEvent === numberOfEvents - 1}
        />
      </div>
    </div>
  )
}

export default NavigationControls
