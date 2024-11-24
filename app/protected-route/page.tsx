import { auth } from "@/lib/auth";
import { ThemeToggle } from "@/components/global/theme-provider";
import { CustomButton } from "@/components/global/custom-button";

export default async function Page() {
  const session = await auth();

  return (
    <div className="container flex min-h-dvh flex-col items-center justify-center gap-y-4">
      <p>Hello from Protected Route!</p>

      <ThemeToggle />

      <p>{JSON.stringify(session)}</p>

      <CustomButton data={{ customType: "logout" }} variant="outline">
        Logout
      </CustomButton>
    </div>
  );
}
