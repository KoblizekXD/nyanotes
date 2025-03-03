"use client";

import DynamicCommand from "@/components/dynamic-command";
import RoutingButton from "@/components/routing-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import TypingEffect from "@/components/typer";
import { Notebook } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const typingTexts = [
  "Write easily with markdown",
  "Share your notes with friends",
  "Attach tags for easy searching",
  "Use it on any device",
];

export default function Home() {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const commandRef = useRef<{ open: () => void; close: () => void }>(null);

  useEffect(() => setMounted(true), []);

  return (
    <main className="min-h-screen relative flex flex-col">
      {mounted && theme.theme === "light" ? (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      ) : (
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]" />
      )}
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
      <nav className="flex backdrop-blur-[1px] gap-x-2 bg-background relative h-[20%] items-center border-b border-b-border p-2">
        <div className="hidden md:flex text-[#3B82F6] items-center gap-x-2">
          <Notebook />
          <span className="font-bold text-lg">Nya Notes</span>
        </div>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          onClick={() => {
            if (commandRef.current) commandRef.current.open();
          }}
          className="border select-none md:w-[30%] w-full flex items-center cursor-pointer p-1 rounded md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        >
          <span className="text-muted-foreground">Search...</span>
          <span className="bg-muted ml-auto border rounded font-mono p-1">
            ⌘ + K
          </span>
        </div>
        <div className="ml-auto flex items-center gap-x-2">
          <RoutingButton href="/getting-started">Get started</RoutingButton>
          <ThemeSwitcher />
        </div>
      </nav>
      <div className="absolute w-full lg:px-48 items-center justify-center flex lg:flex-row flex-col left-1/2 top-1/2 -translate-1/2 -translate-y-1/2">
        <div className="flex justify-center basis-1/2 flex-col gap-y-4">
          <h1 className="text-7xl font-mono font-semibold">Nya Notes</h1>
          <TypingEffect
            typingEnd={async () => {
              setIndex((prev) => (prev + 1) % typingTexts.length);
            }}
            className="text-2xl"
            text={typingTexts[index]}
          />
          <div className="flex items-center lg:self-start self-center gap-x-2">
            <RoutingButton className="text-md basis-1/2 w-fit" href="/getting-started">
              Okay!
            </RoutingButton>
            <RoutingButton
              variant={"secondary"}
              className="text-md basis-1/2 w-fit"
              href="/explore"
            >
              Browse
            </RoutingButton>
          </div>
        </div>
        <div className="basis-1/2 mt-24 w-fit flex justify-center items-center">
          <div className="relative flex items-center justify-center w-48 h-48 md:w-96 md:h-96">
            <Image
              alt="Testing"
              src={"/preview.svg"}
              fill
              className="lg:scale-125 -rotate-[10deg] -translate-x-24 lg:hover:scale-150 overflow-hidden cursor-pointer transition-transform"
            />
            <Image
              alt="Testing"
              src={"/preview-2.svg"}
              fill
              className="md:scale-100 lg:scale-125 rotate-[10deg] translate-x-24 lg:hover:scale-150 cursor-pointer transition-transform"
            />
          </div>
        </div>
      </div>
      <div className="mt-auto text-muted-foreground text-lg self-center mb-12">
        Made with ❤️ by aa55h. Discover more at{" "}
        <Link className="text-blue-500" href="/about">
          here
        </Link>
        .
      </div>
    </main>
  );
}
