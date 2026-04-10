import Link from "next/link";
import { StatCard } from "@/components/stat-card";

export default function HomePage() {
  return (
    <div className="container-app py-10">
      <section className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
        <div className="card p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-orange">Cayman market intelligence</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Sell insights, subscriptions, and qualified leads instead of guessing where demand is.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            CDIP helps operators, investors, and service businesses understand rental demand, pricing movement,
            and lead quality across Cayman.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pricing" className="rounded-xl bg-brand-navy px-4 py-2 font-medium text-white">View pricing</Link>
            <Link href="/lead-capture" className="rounded-xl border border-slate-300 px-4 py-2 font-medium">Request a demo</Link>
          </div>
        </div>
        <div className="grid gap-4">
          <StatCard label="Average lead sale" value="$25" hint="Per qualified rental inquiry routed to operators" />
          <StatCard label="Target monthly MRR" value="$10,000" hint="20 Pro clients or a blended lead + report model" />
          <StatCard label="Monthly report price" value="$149" hint="Base Cayman rental intelligence report" />
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="card p-6">
          <h2 className="font-semibold">Lead marketplace</h2>
          <p className="mt-2 text-sm text-slate-600">Capture inbound requests and route them to paying operators.</p>
        </div>
        <div className="card p-6">
          <h2 className="font-semibold">Subscription dashboard</h2>
          <p className="mt-2 text-sm text-slate-600">Publish live demand trends, pricing, and lead conversion data.</p>
        </div>
        <div className="card p-6">
          <h2 className="font-semibold">Premium reports</h2>
          <p className="mt-2 text-sm text-slate-600">Sell monthly PDFs and custom market briefs to businesses.</p>
        </div>
      </section>
    </div>
  );
}
