import { CustomButton } from "@/components/custom/custom-button";
import { ThemeToggle } from "@/components/custom/theme";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FlaskConical, LayoutDashboard } from "lucide-react";

// export const metadata: Metadata = {
//   title: "Current Page",
// };

export default function Page() {
  return (
    <div className="container flex min-h-dvh flex-col items-center justify-center gap-y-4 py-8 text-center">
      <ThemeToggle />

      <CustomButton
        customType="nav"
        href="/dashboard"
        icon={<LayoutDashboard />}
        variant="outline"
        text="Go To Dashboard"
      />

      <CustomButton
        customType="nav"
        href="/coverage"
        icon={<FlaskConical />}
        variant="outline"
        text="Go to Testing Page (Coverage)"
      />

      <Separator />

      <h1>Hello World</h1>
      <h2>Hello World</h2>
      <h3>Hello World</h3>
      <h4>Hello World</h4>
      <h5>Hello World</h5>
      <h6>Hello World</h6>
      <p>Hello World</p>
      <small>Hello World</small>
      <code>Hello World</code>
      <blockquote>Hello World</blockquote>

      <Separator />

      <div className="flex gap-x-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Success</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>

      <div className="flex gap-x-2">
        <Badge variant="success">Success</Badge>
        <Badge variant="outline_success">Success Outline</Badge>
      </div>

      <div className="flex gap-x-2">
        <Badge variant="warning">Warning</Badge>
        <Badge variant="outline_warning">Warning Outline</Badge>
      </div>

      <div className="flex gap-x-2">
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline_destructive">Destructive Outline</Badge>
      </div>
    </div>
  );
}
