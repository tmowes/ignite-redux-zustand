import { Video } from 'lucide-react'

import { LessonProps } from './types'

export function Lesson(props: LessonProps) {
  const { data, onPlay } = props
  const { title, duration } = data
  return (
    <button
      onClick={onPlay}
      className="flex items-center gap-3 px-4 py-2 text-zinc-400 transition-colors hover:text-white"
      type="button"
    >
      <Video className="h-4 w-4 text-zinc-500" />
      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">{duration}</span>
    </button>
  )
}
