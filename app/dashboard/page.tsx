import { supabaseAdmin } from "@/lib/supabase/admin";
import { StatCard } from "@/components/stat-card";

async function getStats() {
  const [{ count: leadsCount }, { count: clientsCount }] = await Promise.all([
    supabaseAdmin.from("leads").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("clients").select("*", { count: "exact", head: true })
  ]);

  const { data: latestLeads } = await supabaseAdmin
    .from("leads")
    .select("full_name, service_needed, source, status, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  return {
    leadsCount: leadsCount ?? 0,
    clientsCount: clientsCount ?? 0,
    latestLeads: latestLeads ?? []
  };
}

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="container-app py-10">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total leads" value={String(stats.leadsCount)} />
        <StatCard label="Active clients" value={String(stats.clientsCount)} />
        <StatCard label="Lead value target" value="$25+" hint="Average sell-through target per qualified lead" />
      </div>

      <section className="card mt-8 p-6">
        <h2 className="text-xl font-semibold">Latest leads</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b text-slate-500">
              <tr>
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Service</th>
                <th className="pb-3 pr-4">Source</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Created</th>
              </tr>
            </thead>
            <tbody>
              {stats.latestLeads.map((lead) => (
                <tr key={`${lead.full_name}-${lead.created_at}`} className="border-b border-slate-100">
                  <td className="py-3 pr-4">{lead.full_name}</td>
                  <td className="py-3 pr-4">{lead.service_needed}</td>
                  <td className="py-3 pr-4">{lead.source}</td>
                  <td className="py-3 pr-4">{lead.status}</td>
                  <td className="py-3 pr-4">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
