"use client";

import RoutingButton from "@/components/routing-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import TypingEffect from "@/components/typer";
import { PawPrint } from "lucide-react";
import { useState } from "react";

const typingTexts = [
  "Write easily with markdown",
  "Share your notes with friends",
];

export default function Home() {
  const [index, setIndex] = useState(0);

  return (
    <main className="min-h-screen relative flex flex-col">
      <nav className="flex h-[20%] items-center border-b border-b-border p-2">
        <div className="flex text-[#3B82F6] items-center gap-x-2">
          <PawPrint />
          <span className="font-bold text-lg">Nya Notes</span>
        </div>
        <div className="ml-auto flex items-center gap-x-2">
          <RoutingButton href="/get-started">Get started</RoutingButton>
          <ThemeSwitcher />
        </div>
      </nav>
      <div className="absolute left-1/2 top-1/2 -translate-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-extrabold">Nya Notes</h1>
        <TypingEffect
          typingEnd={async () => {
            setIndex((prev) => (prev + 1) % typingTexts.length);
          }}
          className="text-xl"
          text={typingTexts[index]}
        />
      </div>
    </main>
  );
}
