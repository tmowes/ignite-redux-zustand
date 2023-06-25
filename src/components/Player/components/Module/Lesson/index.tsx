import { PlayCircle, Video } from 'lucide-react'

import { LessonProps } from './types'

export function Lesson(props: LessonProps) {
  const { data, onPlay, isPlaying = false } = props
  const { title, duration } = data

  return (
    <button
      onClick={onPlay}
      data-active={isPlaying}
      disabled={isPlaying}
      className="group/item flex items-center gap-3 px-4 py-1 text-zinc-400 transition-colors data-[active=true]:text-orange-500 enabled:hover:text-zinc-300"
      type="button"
    >
      {isPlaying ? (
        <PlayCircle className="h-4 w-4 text-orange-500" />
      ) : (
        <Video className="h-4 w-4 text-zinc-400 group-hover/item:text-zinc-200" />
      )}
      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">{duration}</span>
    </button>
  )
}
