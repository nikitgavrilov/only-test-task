import { configureStore } from "@reduxjs/toolkit"
import { scienceReducer } from "./slices/science.slice"
import { literatureReducer } from "./slices/literature.slice"
import { cinemaReducer } from "./slices/cinema.slice"
import { theatreReducer } from "./slices/theatre.slice"
import { gamesReducer } from "./slices/games.slice"
import { spaceReducer } from "./slices/space.slice"

const store = configureStore({
  reducer: {
    science: scienceReducer,
    literature: literatureReducer,
    cinema: cinemaReducer,
    theatre: theatreReducer,
    games: gamesReducer,
    space: spaceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
