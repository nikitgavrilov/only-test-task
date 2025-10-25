import { createEventSlice } from "../factories/event.slice"

const { reducer, fetchItems } = createEventSlice("theatre")

export const fetchTheatre = fetchItems
export const theatreReducer = reducer
