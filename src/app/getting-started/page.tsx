import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Onboarding } from "./onboarding";
import { isOnboardingComplete } from "@/lib/actions/user";

export default async function GettingStartedWrapper() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/signup");
  if (await isOnboardingComplete()) redirect("/home");

  return <Onboarding />;
}
