"use client";

import { Search } from "lucide-react";
import { useRef } from "react";
import DynamicCommand from "./dynamic-command";
import { ThemeSwitcher } from "./theme-switcher";
import { SidebarTrigger } from "./ui/sidebar";

export function Navbar() {
  const ref = useRef<{ open: () => void; close: () => void }>(null);

  return (
    <nav className="flex border-b-border border-b px-2 backdrop-blur-[1px] w-full items-center gap-x-3 h-[5%]">
      <DynamicCommand
        openOnCombination={(event) => {
          if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            return true;
          }
          return false;
        }}
        ref={ref}
      />
      <SidebarTrigger />
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        onClick={() => ref.current?.open()}
        className="border gap-x-2 px-2 p-1 w-full md:w-1/3 rounded-md cursor-pointer flex items-center"
      >
        <Search size={18} className="text-muted-foreground" />
        <span className="text-muted-foreground text-sm">Search...</span>
        <span className="bg-muted px-0.5 ml-auto border rounded font-mono">
          ⌘ + K
        </span>
      </div>
      <div className="ml-auto">
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
