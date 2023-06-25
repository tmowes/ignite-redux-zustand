export type LessonProps = {
  data: {
    title: string
    duration: string
  }
  onPlay: () => void
  isPlaying?: boolean
}
