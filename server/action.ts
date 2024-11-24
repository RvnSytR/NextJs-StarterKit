"use server";

import { redirect, type RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { state } from "@/lib/db/state";

export async function ValidateSession() {
  const session = await auth();
  if (!session) return false;
  const { id_user, username, email, role } = session.user;
  const [res] = await state.user.getById.execute({ id_user: id_user });
  return res.username == username && res.email === email && res.role === role;
}

export async function ClientRedirect(url: string, type?: RedirectType) {
  redirect(url, type);
}

export async function ClientRevalidatePath(
  originalPath: string,
  type?: "layout" | "page",
) {
  revalidatePath(originalPath, type);
}
