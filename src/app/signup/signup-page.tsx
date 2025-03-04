"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import RoutingButton from "@/components/routing-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export function Signup() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const theme = useTheme();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  function onSubmit(values: z.infer<typeof signupSchema>) {
    startTransition(async () => {
      const { data, error } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.username,
      });

      if (error) {
        console.info("Could not sign up: ", error);
        toast.error("Could not sign up.", {
          position: "top-center",
          description: error.message,
        });
      } else {
        toast.success("Welcome to Nya Notes!", {
          position: "top-center",
        });
        router.push("/getting-started");
      }
    });
  }

  return (
    <main className="h-screen flex items-center justify-center">
      {mounted && theme.theme === "dark" ? (
        <div className="absolute overflow-hidden h-full w-full bg-black">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]" />
        </div>
      ) : (
        <div className="absolute h-full w-full bg-white">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
      )}
      <div className="absolute bg-background gap-x-2 p-1 left-1 top-1 border rounded-md flex items-center">
        <Link href={"/"} className="flex items-center">
          <ArrowLeft size={18} />
          Home
        </Link>
        <ThemeSwitcher />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 md:w-1/3 z-50 bg-background border p-3 rounded-md"
        >
          <span className="font-semibold text-2xl">Create an account</span>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Darnation"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="john.doe@spst.eu"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input disabled={isPending} type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input disabled={isPending} type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-x-2 items-center">
            <Checkbox required id="terms" />
            <Label htmlFor="terms" className="text-muted-foreground">
              I agree to the terms and conditions
            </Label>
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              disabled={isPending}
              type="submit"
              className="flex items-center"
            >
              {isPending && <Loader2 className="animate-spin" />}
              Register!
            </Button>
            <RoutingButton type="button" variant={"secondary"} href="/signin">
              Wait, I have an account!
            </RoutingButton>
          </div>
        </form>
      </Form>
    </main>
  );
}
