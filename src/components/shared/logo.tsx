import Image from "next/image"

import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/assets/images/logo.png"
      alt="Prime Edge"
      width={488}
      height={209}
      priority
      className={cn("h-11 w-auto", className)}
    />
  )
}
