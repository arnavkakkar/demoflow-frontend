import Script from "next/script";
import { Geist } from "next/font/google";
import "./globals.css";

// PERFORMANCE & ACCESSIBILITY: Font Optimization (next/font/google)
// 1. Next.js automatically self-hosts the Geist font at build time (zero external requests to Google servers).
// 2. display: "swap" instructs the browser to show a system fallback font immediately while Geist loads,
//    preventing "Flash of Invisible Text" (FOIT) and eliminating Cumulative Layout Shift (CLS).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// SEO BASICS: Rich Metadata Export
// Next.js App Router injects these values into the server-rendered <head> tag.
// Search engine crawlers and social media platforms (Open Graph) use these for indexing and rich previews.
export const metadata = {
  title: "DemoFlow | Interactive Product Demos That Convert",
  description:
    "DemoFlow empowers marketing and growth teams to build interactive, self-serve product tours in minutes. Boost conversions and accelerate pipeline without code.",
  keywords: [
    "product demo",
    "interactive product tours",
    "SaaS landing page",
    "marketing web development",
    "A/B testing",
    "conversion rate optimization",
  ],
  authors: [{ name: "DemoFlow Team" }],
  openGraph: {
    title: "DemoFlow | Interactive Product Demos That Convert",
    description:
      "Turn casual website visitors into qualified pipeline with clickable, interactive product walkthroughs.",
    type: "website",
    locale: "en_US",
    siteName: "DemoFlow",
  },
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }) {
  return (
    // ACCESSIBILITY: Explicit language attribute declares content language to screen readers and translators
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white`}
      >
        {/* ACCESSIBILITY & GTM: <noscript> iframe fallback for browsers with JavaScript disabled */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}

        {children}

        {/* PERFORMANCE: GTM loader with afterInteractive strategy avoids blocking initial page render */}
        {gtmId && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
