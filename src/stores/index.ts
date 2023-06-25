import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

type PlayerIndexes = [number, number]

const initialState = {
  course: {
    modules: [
      {
        id: '1',
        title: 'Iniciando com React',
        lessons: [
          { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
          { id: 'w-DW4DhDfcw', title: 'Estilização do Post', duration: '10:05' },
          { id: 'D83-55LUdKE', title: 'Componente: Header', duration: '06:33' },
          { id: 'W_ATsETujaY', title: 'Componente: Sidebar', duration: '09:12' },
          { id: 'Pj8dPeameYo', title: 'CSS Global', duration: '03:23' },
          { id: '8KBq2vhwbac', title: 'Form de comentários', duration: '11:34' },
        ],
      },
      {
        id: '2',
        title: 'Estrutura da aplicação',
        lessons: [
          { id: 'gE48FQXRZ_o', title: 'Componente: Comment', duration: '13:45' },
          { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
          { id: 'h5JA3wfuW1k', title: 'Interações no JSX', duration: '06:33' },
          { id: '1G0vSTqWELg', title: 'Utilizando estado', duration: '09:12' },
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
}

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
      const currentModule = course.modules[currentModuleIndex]

      if (nextLessonIndex < currentModule.lessons.length) {
        draft.currentLessonIndex = nextLessonIndex
        return
      }

      if (currentModuleIndex < course.modules.length - 1) {
        draft.currentModuleIndex = currentModuleIndex + 1
        draft.currentLessonIndex = 0
      }
    },
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
