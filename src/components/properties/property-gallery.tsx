"use client"

import Image from "next/image"
import { useState } from "react"
import { Share2, Heart, ImagePlus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PropertyGallery({ images }: { images: string[] }) {
  const [saved, setSaved] = useState(false)

  return (
    <div>
      <div className="grid h-[471px] grid-cols-[470px_291px_291px] gap-2 overflow-hidden rounded-xl">
        <div className="relative h-full">
          <Image src={images[0]} alt="" fill className="object-cover" />
        </div>

        <div className="grid grid-rows-2 gap-2">
          <div className="relative">
            <Image src={images[1] ?? images[0]} alt="" fill className="object-cover" />
          </div>
          <div className="relative">
            <Image src={images[2] ?? images[0]} alt="" fill className="object-cover" />
          </div>
        </div>

        <div className="relative flex flex-col gap-2">
          <div className="relative h-[399px]">
            <Image src={images[3] ?? images[0]} alt="" fill className="object-cover" />
          </div>
          <Button variant="secondary" size="sm" className="w-full">
            <ImagePlus className="size-4" />
            Add More Image
          </Button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <button className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          <Share2 className="size-4" />
          Share
        </button>
        <button
          onClick={() => setSaved(s => !s)}
          className="flex items-center gap-1.5 text-sm font-medium text-foreground"
        >
          <Heart className={saved ? "size-4 fill-destructive text-destructive" : "size-4"} />
          Save
        </button>
      </div>
    </div>
  )
}
