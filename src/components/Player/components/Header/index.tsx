import { useEffect } from 'react'

import { useCurrentLesson, useStore } from '../../../../stores'

export function Header() {
  const { isLoading } = useStore((s) => ({ isLoading: s.isLoading }))
  const { currentLesson, currentModule } = useCurrentLesson()

  useEffect(() => {
    if (!currentLesson) return
    document.title = `Assistindo ${currentLesson.title}`
  }, [currentLesson])

  if (isLoading) return <div className="flex flex-col gap-1" />

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
      <span className="text-sm text-zinc-400">Módulo &quot;{currentModule?.title}&quot;</span>
    </div>
  )
}
