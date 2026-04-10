import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container-app flex items-center justify-between py-4">
        <Link href="/" className="font-semibold tracking-tight">
          Cayman Data Intelligence Platform
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link href="/pricing">Pricing</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/lead-capture">Lead Capture</Link>
        </nav>
      </div>
    </header>
  );
}
