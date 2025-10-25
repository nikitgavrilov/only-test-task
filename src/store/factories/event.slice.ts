import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IEventItem } from "../../types/IEventItem"

interface EventState {
  items: IEventItem[]
  loading: boolean
  error: string | null
}

export const createEventSlice = (name: string) => {
  const initialState: EventState = {
    items: [],
    loading: false,
    error: null,
  }

  const fetchItems = createAsyncThunk<IEventItem[], void, { rejectValue: string }>(
    `${name}/fetchAll`,
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:4173/${name}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error: any) {
        return rejectWithValue(error.message || "Failed to fetch data")
      }
    }
  )

  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(fetchItems.pending, state => {
          state.loading = true
          state.error = null
        })
        .addCase(fetchItems.fulfilled, (state, action: PayloadAction<IEventItem[]>) => {
          state.items = action.payload
          state.loading = false
        })
        .addCase(fetchItems.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload || "Unknown error"
        })
    },
  })

  return {
    reducer: slice.reducer,
    fetchItems,
  }
}
