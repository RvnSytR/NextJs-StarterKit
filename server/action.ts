"use server";

import { redirect } from "next/navigation";
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

export async function ClientRedirect(path: string) {
  redirect(path);
}

export async function ClientRevalidatePath(path: string) {
  revalidatePath(path);
}
