import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-24 pb-32 bg-background-base min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl font-display font-bold text-text-primary mb-4">
          Page Not Found
        </h1>
        <p className="text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-glow px-6 py-2 text-sm">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
