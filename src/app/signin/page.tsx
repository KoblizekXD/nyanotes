import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Signin } from "./signin-page";

export default async function SigninWrapper() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/getting-started");

  return <Signin />;
}
