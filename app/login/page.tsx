import Link from "next/link";
import { Metadata } from "next";

import { auth } from "@/lib/auth";
import { LoginForm, SignOutComponent } from "@/components/layout/auth";

import { label } from "@/components/content";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Login Page",
};

export default async function Page() {
  const session = await auth();

  return (
    <main className="container flex min-h-dvh items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="mb-1 text-center">
            <Link href="/" prefetch>
              Project Title
            </Link>
          </CardTitle>
          <CardDescription className="text-center">
            Hold up! 🔒 Who goes there? 🕵️‍♂️ Only logged-in members can enter the
            protected routes. So pop in your email and password below, and you
            good to go 🛤️
          </CardDescription>
          <SignOutComponent session={session} />
        </CardHeader>

        <CardContent className="flex flex-col gap-y-4">
          <Separator />

          <LoginForm />

          <Separator className="mt-2" />
        </CardContent>

        <CardFooter>
          <small className="mx-auto text-center">{label.copyright}</small>
        </CardFooter>
      </Card>
    </main>
  );
}
