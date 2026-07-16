import { cn } from "@/lib/utils"

export function BoxedRadioOption({
  label,
  checked,
  onSelect,
}: {
  label: string
  checked: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex flex-1 items-center gap-2 rounded-lg border border-border px-4 py-3 text-left text-sm font-medium text-foreground",
        checked && "border-brand-deepblue"
      )}
    >
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-full border border-border",
          checked && "border-brand-deepblue"
        )}
      >
        {checked && <span className="size-2 rounded-full bg-brand-deepblue" />}
      </span>
      {label}
    </button>
  )
}

export function BoxedCheckboxOption({
  label,
  checked,
  onToggle,
}: {
  label: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex flex-1 items-center gap-2 rounded-lg border border-border px-4 py-3 text-left text-sm font-medium text-foreground"
    >
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-border",
          checked && "border-brand-deepblue bg-brand-deepblue text-primary-foreground"
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
            <path
              d="M2 6l2.5 2.5L10 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label}
    </button>
  )
}
