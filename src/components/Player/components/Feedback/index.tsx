import { MessageCircle } from 'lucide-react'

export function Feedback() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded bg-orange-500 px-3 py-2 font-medium text-white transition-colors hover:bg-orange-600"
    >
      <MessageCircle className="h-4 w-4" />
      Deixar feedback
    </button>
  )
}
