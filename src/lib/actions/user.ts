"use server";

import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "../auth";

export async function markOnboardingComplete() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    console.error(
      "Attempting to mark onboarding as complete for an unauthenticated user"
    );
    return;
  }
  await db.update(user).set({ id: session.user.id, finishedOnboarding: true });
}

export async function isOnboardingComplete(): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    console.error(
      "Attempting to mark onboarding as complete for an unauthenticated user"
    );
    return false;
  }
  const res = await db
    .select({
      onboardingComplete: user.finishedOnboarding,
    })
    .from(user)
    .where(eq(user.id, session.user.id));
  return res[0].onboardingComplete ?? false;
}
