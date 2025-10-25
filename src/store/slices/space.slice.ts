import { createEventSlice } from "../factories/event.slice"

const { reducer, fetchItems } = createEventSlice("space")

export const fetchSpace = fetchItems
export const spaceReducer = reducer
