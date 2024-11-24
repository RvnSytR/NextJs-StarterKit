import { CustomButton } from "@/components/global/custom-button";
import { ThemeToggle } from "@/components/global/theme-provider";

export default async function Page() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-y-4">
      <p>Hello World!</p>

      <ThemeToggle />

      <CustomButton
        data={{ customType: "nav", href: "/protected-route" }}
        variant="outline"
      >
        Protected Route
      </CustomButton>
    </div>
  );
}
