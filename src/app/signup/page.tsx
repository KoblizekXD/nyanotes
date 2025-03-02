import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Signup } from "./signup-page";

export default async function SignupWrapper() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (session) redirect("/getting-started");

  return <Signup />;
}