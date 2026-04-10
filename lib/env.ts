const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_APP_URL"
] as const;

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`Missing env var: ${key}`);
  }
}

export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "CDIP",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  stripePriceBasic: process.env.STRIPE_PRICE_BASIC ?? "",
  stripePricePro: process.env.STRIPE_PRICE_PRO ?? "",
  stripePriceEnterprise: process.env.STRIPE_PRICE_ENTERPRISE ?? "",
  n8nLeadWebhookUrl: process.env.N8N_LEAD_WEBHOOK_URL ?? "",
  whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID ?? "",
  whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN ?? "",
  whatsappTemplateName: process.env.WHATSAPP_TEMPLATE_NAME ?? "",
  whatsappTemplateLang: process.env.WHATSAPP_TEMPLATE_LANG ?? "en_US",
  whatsappAlertTo: process.env.WHATSAPP_ALERT_TO ?? ""
};
