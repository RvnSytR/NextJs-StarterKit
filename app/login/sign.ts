"use server";

import { signIn, signOut } from "@/lib/auth";

export async function LoginHandler(email: string, password: string) {
  await signIn("credentials", {
    email: email,
    password: password,
    redirect: false,
  });
}

export async function LogoutHandler() {
  await signOut({ redirect: false });
}
