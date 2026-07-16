import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export function ResetPasswordSuccessDialog({ open }: { open: boolean }) {
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-sm text-center" showCloseButton={false}>
        <DialogHeader>
          <div className="mx-auto mb-2 flex size-20 items-center justify-center rounded-full bg-brand-skyblue-ghost">
            <ShieldCheck className="size-10 text-brand-skyblue" />
          </div>
          <DialogTitle className="text-center text-xl">Successful</DialogTitle>
          <DialogDescription className="text-center">
            Password reset was successful. Go ahead and log in again
          </DialogDescription>
        </DialogHeader>

        <Button
          variant="outline"
          className="mx-auto rounded-full border-brand-deepblue text-brand-deepblue"
          onClick={() => router.push("/login")}
        >
          Sign In
        </Button>
      </DialogContent>
    </Dialog>
  )
}
