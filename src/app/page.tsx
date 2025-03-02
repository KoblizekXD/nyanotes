"use client";

import DynamicCommand from "@/components/dynamic-command";
import RoutingButton from "@/components/routing-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import TypingEffect from "@/components/typer";
import { Notebook } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const typingTexts = [
  "Write easily with markdown",
  "Share your notes with friends",
  "Attach tags for easy searching",
  "Use it on any device",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const commandRef = useRef<{ open: () => void; close: () => void }>(null);

  return (
    <main className="min-h-screen relative flex flex-col">
      <DynamicCommand
        openOnCombination={(event) => {
          if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            return true;
          }
          return false;
        }}
        ref={commandRef}
      />
      <nav className="flex relative h-[20%] items-center border-b border-b-border p-2">
        <div className="flex text-[#3B82F6] items-center gap-x-2">
          <Notebook />
          <span className="font-bold text-lg">Nya Notes</span>
        </div>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          onClick={() => {
            if (commandRef.current) commandRef.current.open();
          }}
          className="border select-none w-[30%] flex items-center cursor-pointer p-1 rounded absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="text-muted-foreground">Search...</span>
          <span className="bg-muted ml-auto border rounded font-mono p-1">
            ⌘ + K
          </span>
        </div>
        <div className="ml-auto flex items-center gap-x-2">
          <RoutingButton href="/get-started">Get started</RoutingButton>
          <ThemeSwitcher />
        </div>
      </nav>
      <div className="absolute w-full px-48 flex left-1/2 top-1/2 -translate-1/2 -translate-y-1/2">
        <div className="flex justify-center basis-1/2 flex-col gap-y-4">
          <h1 className="text-7xl font-mono font-semibold">Nya Notes</h1>
          <TypingEffect
            typingEnd={async () => {
              setIndex((prev) => (prev + 1) % typingTexts.length);
            }}
            className="text-2xl"
            text={typingTexts[index]}
          />
          <div className="flex items-center gap-x-2">
            <RoutingButton className="text-md w-fit" href="/get-started">
              Okay!
            </RoutingButton>
            <RoutingButton
              variant={"secondary"}
              className="text-md w-fit"
              href="/explore"
            >
              Browse
            </RoutingButton>
          </div>
        </div>
        <div className="basis-1/2 w-fit flex justify-center items-center">
          <div className="relative flex items-center justify-center w-96 h-96">
            <Image
              alt="Testing"
              src={"/preview.svg"}
              fill
              className="scale-125 hover:scale-150 cursor-pointer transition-transform"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
