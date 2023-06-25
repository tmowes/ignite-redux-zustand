import Player from 'react-player'

import { Loading } from '../../../Loading'
import { useStore } from '../../../../stores'

export function VideoPlayer() {
  const { isLessonLoading, currentLesson, next } = useStore((s) => ({
    isLessonLoading: s.isLoading,
    currentLesson: s.course?.modules[s.currentModuleIndex]?.lessons[s.currentLessonIndex],
    next: s.next,
  }))

  return (
    <div className="aspect-video w-full bg-zinc-950">
      {isLessonLoading || !currentLesson ? (
        <Loading />
      ) : (
        <Player
          width="100%"
          height="100%"
          onEnded={next}
          controls
          playing
          url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
        />
      )}
    </div>
  )
}
