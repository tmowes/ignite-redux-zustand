import { create } from 'zustand'

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
  load: () => Promise<void>
  play: (indexes: PlayerIndexes) => void
  next: () => void
}

export const initialState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true,
} as PlayerState

export const useStore = create<PlayerState>((set, get) => ({
  ...initialState,
  load: async () => {
    set({ isLoading: true })
    const { data } = await api.get('/courses/1')
    set({ course: data, isLoading: false })
  },

  play: ([moduleIndex, lessonIndex]: PlayerIndexes) => {
    set({ currentModuleIndex: moduleIndex, currentLessonIndex: lessonIndex })
  },
  next: () => {
    const { currentModuleIndex, currentLessonIndex, course } = get()
    const nextLessonIndex = currentLessonIndex + 1
    const currentModule = course?.modules[currentModuleIndex]

    if (nextLessonIndex < (currentModule?.lessons?.length ?? 0)) {
      set({ currentLessonIndex: nextLessonIndex })
      return
    }

    if (currentModuleIndex < (course?.modules?.length ?? 0) - 1) {
      set({ currentModuleIndex: currentModuleIndex + 1, currentLessonIndex: 0 })
    }
  },
}))

export const useCurrentLesson = () =>
  useStore((state) => {
    const { course, currentModuleIndex, currentLessonIndex } = state
    const currentModule = course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
