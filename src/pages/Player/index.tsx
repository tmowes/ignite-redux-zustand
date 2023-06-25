import { useEffect } from 'react'

import { Header } from '../../components/Player/components/Header'
import { Feedback } from '../../components/Player/components/Feedback'
import { VideoPlayer } from '../../components/Player/components/VideoPlayer'
import { Module } from '../../components/Player/components/Module'
import { loadCourse, useAppDispatch, useAppSelector } from '../../stores'

export function Player() {
  const dispatch = useAppDispatch()
  const modules = useAppSelector((state) => state.player.course?.modules)

  useEffect(() => {
    dispatch(loadCourse())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950 text-zinc-50">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <Feedback />
        </div>
        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 pr-80 shadow">
          <div className="flex-1">
            <VideoPlayer />
          </div>
          <aside className="absolute bottom-0 right-0 top-0 w-80 divide-y-2 divide-zinc-900 overflow-y-auto border-l border-zinc-800 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {modules?.map((module, moduleIndex) => (
              <Module key={module.id} data={module} moduleIndex={moduleIndex} />
            ))}
          </aside>
        </main>
      </div>
    </div>
  )
}
