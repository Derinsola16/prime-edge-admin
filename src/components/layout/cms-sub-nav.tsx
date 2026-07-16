"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const items = [
  { label: "Overview", href: "/cms" },
  { label: "Projects", href: "/cms/projects" },
  { label: "Testimonials", href: "/cms/testimonials" },
  { label: "FAQs", href: "/cms/faqs" },
]

export function CmsSubNav() {
  const pathname = usePathname()

  return (
    <div className="flex w-[190px] shrink-0 flex-col gap-1 rounded-xl border border-border bg-card p-3">
      {items.map(item => {
        const active =
          item.href === "/cms" ? pathname === "/cms" : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium text-foreground",
              active && "bg-brand-skyblue-ghost text-brand-deepblue"
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
