import { CustomButton } from "@/components/custom/custom-button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-y-8">
      <div className="flex flex-col items-center gap-x-8 gap-y-4 font-extrabold lg:flex-row">
        <h1 className="animate-fade-right text-9xl">404</h1>

        <h1 className="animate-fade-left text-center text-4xl md:text-6xl lg:text-start">
          Oops, looks like
          <br />
          there&apos;s nobody here!
        </h1>
      </div>

      <div className="animate-fade-up">
        <CustomButton
          customType="nav"
          href="/"
          variant="outline"
          size="lg"
          className="h-16 gap-4 rounded-full border-4 px-8 text-xl font-bold hover:border-primary [&_svg]:size-5"
          text="Go To Main Page"
          loadText="Going to Main Page..."
        />
      </div>
    </div>
  );
}
