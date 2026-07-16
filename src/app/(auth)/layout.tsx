import { Logo } from "@/components/shared/logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-secondary">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[123px] bg-repeat-y opacity-70 md:block"
        style={{ backgroundImage: "url(/assets/images/pattern-left.png)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[138px] bg-repeat-y opacity-70 md:block"
        style={{ backgroundImage: "url(/assets/images/pattern-right.png)" }}
      />

      <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-16">
        <div className="mb-8">
          <Logo />
        </div>

        <div className="w-full max-w-[684px]">{children}</div>
      </div>
    </div>
  )
}
