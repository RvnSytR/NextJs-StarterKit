// import { CustomButton } from "@/components/global/custom-button";
import { ThemeToggle } from "@/components/global/theme-provider";

export default async function Page() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-y-4">
      <p>Hello from Homepage!</p>
      <p>This page is public and everyone can access it</p>
      <ThemeToggle />

      <p>
        Want to enter the Protected Route? This button below will direct you to
        go there! 🚀
      </p>

      <p>
        But hold on—if you&apos;re not signed in, you&apos;ll need to log in
        first. No free passes here! 🔒
      </p>

      {/* <CustomButton customType="nav" variant="outline" href="/protected-route">
        🤖 Time to Find Out
      </CustomButton> */}
    </div>
  );
}
