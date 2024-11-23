import { CustomButton } from "@/components/global/custom-button";
import { ThemeToggle } from "@/components/global/theme-provider";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="container flex min-h-dvh flex-col items-center justify-center gap-y-4">
      <p>Hello from Protected Route!</p>

      <ThemeToggle />

      <p>{JSON.stringify(session)}</p>

      <CustomButton customType="logout" variant="outline">
        Logout
      </CustomButton>
    </div>
  );
}
