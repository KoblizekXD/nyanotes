import { ThemeSwitcher } from "@/components/theme-switcher"
import { PawPrint } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col">
      <nav className="flex h-[20%] items-center border-b border-b-border p-2">
        <div className="flex text-[#3B82F6] items-center gap-x-2">
          <PawPrint />
          <span className="font-bold text-lg">Nya Notes</span>
        </div>
        <span className="ml-auto"><ThemeSwitcher /></span>
      </nav>
      <div className="absolute left-1/2 top-1/2 -translate-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-extrabold">Nya Notes</h1>
      </div>
    </main>
  );
}
