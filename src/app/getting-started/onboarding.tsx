"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { markOnboardingComplete } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Onboarding() {
  const router = useRouter();
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      {mounted && theme.theme === "dark" ? (
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />
      ) : (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]" />
      )}
      <div className="absolute left-1 top-1">
        <ThemeSwitcher />
      </div>
      <div className="bg-background flex p-2 md:p-12 flex-col border rounded-xl w-[70%] h-[60%] md:h-[80%]">
        <h1 className="font-semibold text-xl md:text-3xl">
          Let's finish setting up your account
        </h1>
        <div className="h-full relative overflow-x-clip my-2">
          <div
            className={cn(
              "absolute w-full transition-transform duration-500 ease-in-out h-full",
              step === 0
                ? "transform translate-x-0"
                : step === 1
                ? "transform -translate-x-full"
                : step === 2
                ? "transform -translate-x-[200%]"
                : "transform -translate-x-[300%]"
            )}
          >
            <Step1 />
            <Step2 />
            <Step3 />
            <Step4 />
          </div>
        </div>
        <div className="hidden md:flex w-full gap-x-2 mt-auto">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary">Skip onboarding</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Skip onboarding?</AlertDialogTitle>
                <AlertDialogDescription>
                  All of the options can be set-up later, but the onboarding
                  itself can't be repeated. Are you sure you want to skip?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={async () => {
                    await markOnboardingComplete();
                  }}
                >
                  Yes
                </AlertDialogAction>
                <AlertDialogCancel>No</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="ml-auto flex items-center gap-x-2">
            <span className="text-muted-foreground">{step + 1} / 4</span>
            <Button
              disabled={step === 0}
              onClick={() => setStep((prev) => (prev - 1) as 0 | 1 | 2 | 3)}
              className="mr-2"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                if (step === 3) {
                  markOnboardingComplete().then(() => {
                    toast.success("Onboarding completed!");
                    router.push("/home");
                  });
                } else setStep((prev) => (prev + 1) as 0 | 1 | 2 | 3);
              }}
              className="ml-auto"
            >
              {step === 3 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex absolute bottom-2 left-2 right-2 flex-col md:hidden gap-y-2">
        <div className="flex items-center gap-x-2">
          <Button
            disabled={step === 0}
            onClick={() => setStep((prev) => (prev - 1) as 0 | 1 | 2 | 3)}
            className="mr-2"
          >
            Back
          </Button>
          <span className="text-muted-foreground">{step + 1} / 4</span>
          <Button
            onClick={() => {
              if (step === 3) {
                markOnboardingComplete().then(() => {
                  toast.success("Onboarding completed!");
                  router.push("/home");
                });
              } else setStep((prev) => (prev + 1) as 0 | 1 | 2 | 3);
            }}
            className="ml-auto"
          >
            {step === 3 ? "Finish" : "Next"}
          </Button>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary">Skip onboarding</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Skip onboarding?</AlertDialogTitle>
              <AlertDialogDescription>
                All of the options can be set-up later, but the onboarding
                itself can't be repeated. Are you sure you want to skip?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={async () => {
                  await markOnboardingComplete();
                }}
              >
                Yes
              </AlertDialogAction>
              <AlertDialogCancel>No</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}

function Step1() {
  return (
    <div className="w-full h-full absolute">
      <h1>Step 1</h1>
    </div>
  );
}

function Step2() {
  return (
    <div className="w-full h-full absolute bg-red-500 left-[100%]">
      <h1>Step 2</h1>
    </div>
  );
}

function Step3() {
  return (
    <div className="w-full h-full absolute bg-red-500 left-[200%]">
      <h1>Step 3</h1>
    </div>
  );
}

function Step4() {
  return (
    <div className="w-full h-full absolute bg-red-500 left-[300%]">
      <h1>Step 4</h1>
    </div>
  );
}
