export function getSiteUrl() {
  const deploymentHost =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://mksindico.com.br");

  return deploymentHost.startsWith("http")
    ? deploymentHost.replace(/\/$/, "")
    : `https://${deploymentHost}`;
}

