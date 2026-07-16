import { MapPin, FileCheck, FileClock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IPendingTask } from "@/types/dashboard.types"

export function PendingTasks({ tasks }: { tasks: IPendingTask[] }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Pending Tasks</h2>
        <Button variant="link" size="sm" className="text-brand-skyblue">
          See all
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {tasks.map(task => {
          const Icon = task.icon === "kyc" ? FileCheck : FileClock

          return (
            <div key={task.id} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.subtitle}</p>
                </div>
              </div>

              <p className="text-sm font-medium text-foreground">{task.property}</p>
              <p className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                {task.location}
              </p>

              <Button variant="outline" className="w-full rounded-full">
                {task.action_label}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
