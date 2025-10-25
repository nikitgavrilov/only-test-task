export interface HistoricEvent {
  date: string
  description: string
}

export interface HistoricCategory {
  title: string
  events: HistoricEvent[]
}

export type HistoricDates = HistoricCategory[]
