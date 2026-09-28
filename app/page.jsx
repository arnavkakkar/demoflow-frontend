// NEXT.JS SPECIFIC: The Page Component (app/page.jsx)
// 1. In the Next.js App Router, file paths define URL routes:
//    - "app/page.jsx" maps to the root URL ("/") of your application.
// 2. Server Component by default: This page runs on the server, importing and stacking
//    both Server Components (Features, Pricing) and Client Components (Hero, LeadForm).
// 3. Next.js automatically creates the JavaScript bundles for client components while
//    keeping static server components as lightweight HTML.

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    // SEMANTIC HTML: <main> represents the dominant content of the <body>
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <main className="flex-grow">
        {/* Step 1 & 2: Hero with A/B testing and nav header */}
        <Hero />

        {/* Step 1: Features showcase */}
        <Features />

        {/* Step 1: Pricing plans */}
        <Pricing />

        {/* Step 3: Demo Request Section with LeadForm */}
        <section
          id="demo"
          aria-labelledby="demo-heading"
          className="border-t border-slate-800/80 bg-slate-900/40 py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Experience DemoFlow
              </p>
              <h2
                id="demo-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Request a Live Demo
              </h2>
              <p className="mt-4 text-base text-slate-300">
                Ready to accelerate your marketing pipeline? Tell us about your product, and our team will prepare an interactive walkthrough tailored to your flows.
              </p>
            </div>

            {/* Interactive Lead Capture Form */}
            <LeadForm />
          </div>
        </section>
      </main>

      {/* Semantic footer component */}
      <Footer />
    </div>
  );
}
