import { BottomNav } from "@/components/shell/bottom-nav";
import { TopBar } from "@/components/shell/top-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-mist">
      <div className="mx-auto min-h-full max-w-lg bg-fog shadow-[0_0_0_1px_rgba(7,26,20,0.04)]">
        <TopBar />
        <div className="pb-[calc(4.25rem+env(safe-area-inset-bottom))]">{children}</div>
        <BottomNav />
      </div>
    </div>
  );
}
