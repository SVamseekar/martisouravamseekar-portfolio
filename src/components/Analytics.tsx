import { GoogleAnalytics } from "@next/third-parties/google";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

export function Analytics() {
  if (!GA_MEASUREMENT_ID || process.env.NODE_ENV !== "production") {
    return null;
  }

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}