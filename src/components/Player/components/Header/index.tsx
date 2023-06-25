import { useEffect } from 'react'

import { useAppSelector } from '../../../../stores'

export function Header() {
  const { currentModule, currentLesson } = useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player
    return {
      currentModule: state.player.course?.modules[currentModuleIndex],
      currentLesson:
        state.player.course?.modules[currentModuleIndex].lessons[currentLessonIndex],
    }
  })

  useEffect(() => {
    if (!currentLesson) return
    document.title = `Assistindo ${currentLesson.title}`
  }, [currentLesson])

  if (!currentLesson || !currentModule) return <div className="flex flex-col gap-1" />

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
      <span className="text-sm text-zinc-400">Módulo &quot;{currentModule?.title}&quot;</span>
    </div>
  )
}
