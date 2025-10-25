import styles from "./MobileEventButtons.module.scss"

interface MobileEventButtonsProps {
  numberOfEvents: number
  currentEvent: number
  onLoadThis: (index: number) => void
}

const MobileEventButtons = ({
  numberOfEvents,
  currentEvent,
  onLoadThis,
}: MobileEventButtonsProps) => {
  return (
    <div className={`${styles.events__control_buttons} ${styles.events__control_buttons_order_3}`}>
      {Array.from({ length: numberOfEvents }).map((_, index) => (
        <button
          key={index}
          className={`${styles.events__button} ${
            currentEvent === index ? styles.events__button_active : ""
          }`}
          onClick={() => onLoadThis(index)}
        />
      ))}
    </div>
  )
}

export default MobileEventButtons
