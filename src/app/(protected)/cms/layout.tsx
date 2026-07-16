import { CmsSubNav } from "@/components/layout/cms-sub-nav";

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-6">
      <CmsSubNav />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
