import { redirect } from "next/navigation";
import { ValidateSession } from "@/server/action";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!(await ValidateSession())) redirect("/login");
  return children;
}
