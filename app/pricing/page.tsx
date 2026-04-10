import Link from "next/link";

const plans = [
  {
    name: "Basic",
    price: "$49/mo",
    envKey: "STRIPE_PRICE_BASIC",
    features: ["1 seat", "Weekly report access", "25 routed leads included", "Email support"]
  },
  {
    name: "Pro",
    price: "$149/mo",
    envKey: "STRIPE_PRICE_PRO",
    features: ["3 seats", "Live dashboard", "100 routed leads included", "Priority support"]
  },
  {
    name: "Enterprise",
    price: "$499/mo",
    envKey: "STRIPE_PRICE_ENTERPRISE",
    features: ["Unlimited seats", "Custom exports", "Custom research requests", "Dedicated onboarding"]
  }
];

export default function PricingPage() {
  return (
    <div className="container-app py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
      <p className="mt-2 text-slate-600">Stripe Checkout is wired. Add your live Price IDs in environment variables.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="card p-6">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mt-2 text-3xl font-bold">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {plan.features.map((feature) => <li key={feature}>• {feature}</li>)}
            </ul>
            <form action="/api/stripe/checkout" method="POST" className="mt-6">
              <input type="hidden" name="plan" value={plan.name.toLowerCase()} />
              <button className="rounded-xl bg-brand-navy px-4 py-2 font-medium text-white">Start {plan.name}</button>
            </form>
            <p className="mt-3 text-xs text-slate-500">Mapped env var: {plan.envKey}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/lead-capture" className="text-sm font-medium text-brand-orange">Need a custom setup instead?</Link>
      </div>
    </div>
  );
}
