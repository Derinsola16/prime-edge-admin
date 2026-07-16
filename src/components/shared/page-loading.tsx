import { Loader2 } from "lucide-react"

export default function PageLoading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Loader2 className="size-6 animate-spin text-brand-deepblue" />
    </div>
  )
}
