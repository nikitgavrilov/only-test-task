import { createEventSlice } from "../factories/event.slice"

const { reducer, fetchItems } = createEventSlice("cinema")

export const fetchCinema = fetchItems
export const cinemaReducer = reducer
