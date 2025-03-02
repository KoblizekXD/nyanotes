"use client";

import RoutingButton from "@/components/routing-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import TypingEffect from "@/components/typer";
import { PawPrint } from "lucide-react";
import Image from "next/image";
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
      <div className="absolute w-full px-48 flex left-1/2 top-1/2 -translate-1/2 -translate-y-1/2">
        <div className="flex basis-1/2 flex-col gap-y-4">
          <h1 className="text-7xl font-semibold">Nya Notes</h1>
          <TypingEffect
            typingEnd={async () => {
              setIndex((prev) => (prev + 1) % typingTexts.length);
            }}
            className="text-2xl"
            text={typingTexts[index]}
          />
          <RoutingButton className="text-md w-fit" href="/get-started">
            Okay!
          </RoutingButton>
        </div>
        <div className="basis-1/2 w-fit flex justify-center items-center">
          <div className="relative flex items-center justify-center w-96 h-96">
            <Image alt="Testing" src={"/preview.svg"} fill className="hover:scale-125 cursor-pointer transition-transform" />
          </div>
        </div>
      </div>
    </main>
  );
}
