import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'

import { Lesson } from './Lesson'
import { ModuleProps } from './types'
import { play, useAppDispatch, useAppSelector } from '../../../../stores'

export function Module(props: ModuleProps) {
  const { data, moduleIndex } = props
  const { title } = data
  const dispatch = useAppDispatch()
  const lessons = useAppSelector((state) => state.player.course.modules[moduleIndex].lessons)

  const amountOfLessons = lessons?.length

  return (
    <Collapsible.Root className="group">
      <Collapsible.Trigger
        className="flex w-full items-center gap-3 rounded bg-zinc-800 p-4 text-zinc-50 transition-colors hover:bg-zinc-700"
        type="button"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>
        <div className="flex flex-col gap-1 text-left">
          <strong>{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>
        <ChevronDown className="ml-auto h-5 w-5 text-zinc-400 transition-all group-data-[state=open]:rotate-180" />
      </Collapsible.Trigger>
      <Collapsible.Content className="relative flex flex-col gap-4">
        {lessons?.map((lesson, lessonIndex) => (
          <Lesson
            key={lesson.id}
            data={lesson}
            onPlay={() => dispatch(play([moduleIndex, lessonIndex]))}
          />
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
