import Player from 'react-player'

import { Loading } from '../../../Loading'
import { useAppSelector } from '../../../../stores'

export function VideoPlayer() {
  const currentLesson = useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player
    return state.player.course.modules[currentModuleIndex].lessons[currentLessonIndex]
  })
  const isLessonLoading = false
  return (
    <div className="aspect-video w-full bg-zinc-950">
      {isLessonLoading ? (
        <Loading />
      ) : (
        <Player
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
        />
      )}
    </div>
  )
}
