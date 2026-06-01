import { NotFoundIllustration } from "@/components/ui/not-found-illustration";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-background px-6 py-16 text-center">
      <div className="flex w-full max-w-2xl flex-col items-center">
        <NotFoundIllustration />
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
          Oops!
        </h1>

        <h2 className="mt-6 text-2xl font-bold text-foreground sm:text-3xl">
          Something went wrong
        </h2>

        <p className="mt-3 text-base text-muted-foreground">
          The page you&apos;re looking for isn&apos;t found, we suggest you back to home.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Back to home page
        </Link>
      </div>
    </main>
  );
}

