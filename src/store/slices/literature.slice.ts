import { createEventSlice } from "../factories/event.slice"

const { reducer, fetchItems } = createEventSlice("literature")

export const fetchLiterature = fetchItems
export const literatureReducer = reducer
