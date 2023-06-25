import { Loader } from 'lucide-react'

export function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Loader className="h-6 w-6 animate-spin text-zinc-400" />
    </div>
  )
}
