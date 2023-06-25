import { PayloadAction, configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

import { api } from '../libs/api'

type PlayerIndexes = [number, number]
type Lesson = {
  id: string
  title: string
  duration: string
}

type Module = {
  id: number
  title: string
  lessons: Lesson[]
}
type Course = {
  id: number
  modules: Module[]
}

export type PlayerState = {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean
}

export const initialState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true,
} as PlayerState

export const loadCourse = createAsyncThunk('player/load', async () => {
  const { data } = await api.get('/courses/1')
  return data
})

const todoSlice = createSlice({
  name: 'todo',
  initialState: ['Fazer café', 'Estudar React'],
  reducers: {
    addTodo: (state, { payload }) => {
      state.push(payload)
    },
  },
})

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play: (draft, { payload: [moduleIndex, lessonIndex] }: PayloadAction<PlayerIndexes>) => {
      draft.currentModuleIndex = moduleIndex
      draft.currentLessonIndex = lessonIndex
    },
    next: (draft) => {
      const { currentModuleIndex, currentLessonIndex, course } = draft
      const nextLessonIndex = currentLessonIndex + 1
      const currentModule = course?.modules[currentModuleIndex]

      if (nextLessonIndex < (currentModule?.lessons?.length ?? 0)) {
        draft.currentLessonIndex = nextLessonIndex
        return
      }

      if (currentModuleIndex < (course?.modules?.length ?? 0) - 1) {
        draft.currentModuleIndex = currentModuleIndex + 1
        draft.currentLessonIndex = 0
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCourse.pending, (draft) => {
      draft.isLoading = true
    })

    builder.addCase(loadCourse.fulfilled, (draft, { payload }) => {
      draft.course = payload
      draft.isLoading = false
    })
  },
})

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
    player: playerSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const { play, next } = playerSlice.actions

export const { addTodo } = todoSlice.actions

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
