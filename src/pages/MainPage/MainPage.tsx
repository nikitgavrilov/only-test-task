import HistoricDatesHeading from "../../components/HistoricDatesHeading/HistoricDatesHeading"
import styles from "./MainPage.module.scss"

const MainPage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.historicDates}>
        <HistoricDatesHeading />
      </section>
    </main>
  )
}

export default MainPage
