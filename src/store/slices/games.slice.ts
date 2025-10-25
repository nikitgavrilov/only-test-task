import { createEventSlice } from "../factories/event.slice"

const { reducer, fetchItems } = createEventSlice("games")

export const fetchGames = fetchItems
export const gamesReducer = reducer
