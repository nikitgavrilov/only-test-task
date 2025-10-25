import { createEventSlice } from "../factories/event.slice"

const { reducer, fetchItems } = createEventSlice("science")

export const fetchScience = fetchItems
export const scienceReducer = reducer
