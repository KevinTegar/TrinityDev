import Link from "next/link";

export default function NotFound() {
  return (
    <section data-world="ink" className="flex min-h-svh flex-col items-start justify-end px-4 pb-10 md:px-10">
      <h1 className="font-display text-display-2xl uppercase">404</h1>
      <Link href="/" className="mt-6 font-mono text-meta uppercase underline">
        Back home
      </Link>
    </section>
  );
}
