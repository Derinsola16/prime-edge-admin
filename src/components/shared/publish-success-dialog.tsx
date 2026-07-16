import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export function PublishSuccessDialog({
  open,
  onOpenChange,
  description = "A new property has been successfully published. Go to \"Properties Management\" to see the new addition.",
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  description?: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm text-center">
        <DialogHeader>
          <div className="mx-auto mb-2 flex size-20 items-center justify-center rounded-full bg-brand-skyblue-ghost">
            <ShieldCheck className="size-10 text-brand-skyblue" />
          </div>
          <DialogTitle className="text-center text-xl">
            Successfully Published
          </DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>

        <Button
          variant="outline"
          className="mx-auto rounded-full border-brand-deepblue text-brand-deepblue"
          onClick={() => onOpenChange(false)}
        >
          Thank you
        </Button>
      </DialogContent>
    </Dialog>
  )
}
