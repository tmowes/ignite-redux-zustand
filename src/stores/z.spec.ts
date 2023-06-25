import { describe, it, expect, beforeEach } from 'vitest'

import { useStore } from '.'

const store = useStore

const initialTestState = {
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: 'Iniciando com React',
        lessons: [
          { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
          { id: 'w-DW4DhDfcw', title: 'Estilização do Post', duration: '10:05' },
        ],
      },
      {
        id: 2,
        title: 'Estrutura da aplicação',
        lessons: [
          { id: 'gE48FQXRZ_o', title: 'Componente: Comment', duration: '13:45' },
          { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false,
}

describe('Player with Zustand', () => {
  beforeEach(() => {
    store.setState(initialTestState)
  })
  it('should be able to play', () => {
    const { play } = store.getState()
    play([1, 2])
    const state = store.getState()
    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(2)
  })
  it('should be able to play next lesson video', () => {
    const { next } = store.getState()
    next()
    const state = store.getState()
    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })
  it('should be able to play next module lesson video', () => {
    store.setState({ currentLessonIndex: 1 })
    const { next } = store.getState()
    next()
    const state = store.getState()
    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(0)
  })
  it('should not be able to play next module lesson video if is end of playlist', () => {
    store.setState({ currentLessonIndex: 1, currentModuleIndex: 1 })
    const { next } = store.getState()
    next()
    const state = store.getState()
    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(1)
  })
})
