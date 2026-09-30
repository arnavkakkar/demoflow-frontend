// NEXT.JS SPECIFIC: "use client" Directive
// 1. By default, Next.js components in the app/ directory are React Server Components (RSC).
// 2. Server components execute on the server during build/request time, where "window",
//    "document.cookie", and "sessionStorage" DO NOT EXIST.
// 3. Adding "use client" tells Next.js to package this component for browser execution,
//    allowing us to use client-side hooks like useState and useEffect.
"use client";

import { useState, useEffect } from "react";
// Import cookie/variant helper from frontend/lib/variant.js
import { getVariant } from "@/lib/variant";
// Import backend event tracking helper from frontend/lib/track.js (Step 4)
import { trackEvent } from "@/lib/track";
// Import Google Tag Manager dataLayer helper from frontend/lib/gtm.js (Step 5)
import { pushEvent } from "@/lib/gtm";

export default function Hero() {
  // STATE: variant starts as null on initial render (both server SSR and initial client load).
  // It will be set to "A" or "B" once useEffect runs in the browser.
  const [variant, setVariant] = useState(null);

  // NEXT.JS SPECIFIC: Why useEffect is required for cookies & A/B testing:
  // 1. Next.js still pre-renders this component to HTML on the server.
  // 2. If we read document.cookie or sessionStorage during component execution, the server would crash
  //    or create a "Hydration Error" (HTML mismatch between server & browser).
  // 3. useEffect ONLY executes in the browser AFTER the component has mounted into the DOM.
  useEffect(() => {
    const assignedVariant = getVariant();
    setVariant(assignedVariant);

    // STEP 4 & 5: SEND ONE "VIEW" EVENT PER BROWSER SESSION
    // WHY USE sessionStorage:
    // 1. In development, React Strict Mode runs useEffect twice to detect unintended side-effects.
    // 2. By storing a flag in sessionStorage, we ensure that exactly ONE "view" event is dispatched
    //    for this browser session/tab, preventing double-counting or page refresh inflation.
    // 3. Dispatches to both the Flask backend (/event) and Google Tag Manager (dataLayer).
    if (typeof window !== "undefined") {
      const alreadyTracked = sessionStorage.getItem("demoflow_view_tracked");
      if (!alreadyTracked) {
        sessionStorage.setItem("demoflow_view_tracked", "true");
        // 1. Backend telemetry
        trackEvent("view", assignedVariant);
        // 2. GTM dataLayer custom event (Step 5)
        pushEvent("ab_variant_view", { variant: assignedVariant });
      }
    }
  }, []);

  // Content configuration for each variant:
  // Variant A: Original control (feature-focused headline + "Request a Demo" CTA)
  // Variant B: Challenger (benefit-focused headline + "See It in Action" CTA)
  const variants = {
    A: {
      headlineLead: "Interactive Product Demos That ",
      headlineHighlight: "Close Deals Faster",
      buttonText: "Request a Demo",
    },
    B: {
      headlineLead: "Convert 2x More Pipeline with ",
      headlineHighlight: "Interactive Product Tours",
      buttonText: "See It in Action",
    },
  };

  // If variant is not yet known, fallback to Variant A's layout dimensions to preserve spacing
  const activeContent = variant ? variants[variant] : variants.A;

  // STEP 5: Click event tracking handlers with button_location metadata
  const handleNavbarClick = () => {
    if (variant) {
      trackEvent("click", variant);
      pushEvent("cta_click", { variant, button_location: "navbar" });
    }
  };

  const handleHeroPrimaryClick = () => {
    if (variant) {
      trackEvent("click", variant);
      pushEvent("cta_click", { variant, button_location: "hero_primary" });
    }
  };

  const handleHeroSecondaryClick = () => {
    if (variant) {
      trackEvent("click", variant);
      pushEvent("cta_click", { variant, button_location: "hero_secondary" });
    }
  };

  return (
    <>
      {/* SEMANTIC HTML: Top Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Brand Logo with clear focus styles */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white rounded-lg p-1 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            aria-label="DemoFlow Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white shadow-md shadow-indigo-500/20">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Demo<span className="text-indigo-400">Flow</span>
            </span>
          </a>

          {/* Navigation Links with visible keyboard focus styling */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a
              href="#features"
              className="rounded-md px-2 py-1 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="rounded-md px-2 py-1 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Pricing
            </a>
            <a
              href="#demo"
              className="rounded-md px-2 py-1 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Request Demo
            </a>
          </nav>

          {/* Quick Header CTA button with keyboard focus outline */}
          <div className="flex items-center gap-3">
            <a
              href="#demo"
              onClick={handleNavbarClick}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 transition-colors"
            >
              {activeContent.buttonText}
            </a>
          </div>
        </div>
      </header>

      {/* SEMANTIC HTML: Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32" aria-labelledby="hero-heading">
        {/* Subtle Background Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-600/20 via-sky-500/15 to-transparent blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 
            ANTI-FLICKER STRATEGY:
            - When the page first loads, variant is null (opacity-0).
            - The content still takes up the exact same physical space in the layout, so the page does not jump.
            - Once useEffect assigns variant "A" or "B", opacity becomes 100 with a quick transition.
            - This prevents the visitor from seeing a jarring "flash" of the wrong variant!
          */}
          <div
            className={`mx-auto max-w-3xl text-center transition-opacity duration-150 ${
              variant ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Announcement Pill / Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3.5 py-1.5 text-xs font-medium text-indigo-300 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" aria-hidden="true" />
              <span>Interactive Demos for Marketing Web Teams</span>
            </div>

            {/* ACCESSIBILITY: Single primary <h1> heading for the entire page */}
            <h1
              id="hero-heading"
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl sm:leading-tight min-h-[3.5rem]"
            >
              {activeContent.headlineLead}
              <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                {activeContent.headlineHighlight}
              </span>
            </h1>

            {/* Short Subtext with high WCAG AA contrast (slate-300 on dark slate > 9:1 ratio) */}
            <p className="mt-6 text-lg text-slate-300 leading-relaxed sm:text-xl">
              Turn website visitors into engaged buyers. DemoFlow lets marketing teams create
              clickable, interactive product walkthroughs in minutes—no developer sprints or complex code required.
            </p>

            {/* Call to Action Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* Primary CTA button with visible focus styles and accessible label */}
              <a
                href="#demo"
                onClick={handleHeroPrimaryClick}
                aria-label={`${activeContent.buttonText} - Jump to Demo Request Form`}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all duration-200"
              >
                {activeContent.buttonText}
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              {/* Secondary Exploratory Link with visible focus styles */}
              <a
                href="#features"
                onClick={handleHeroSecondaryClick}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 px-8 py-4 text-base font-semibold text-slate-200 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all duration-200"
              >
                Explore Features
              </a>
            </div>

            {/* Key Value Highlights */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                5-minute setup
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Integrates with any stack
              </span>
            </div>
          </div>

          {/* Visual Showcase / Product Mockup */}
          {/* ACCESSIBILITY: Uses semantic paragraph tags instead of jumping to <h4> to preserve heading hierarchy */}
          <div className="mt-16 mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-2xl backdrop-blur-sm sm:p-4">
            <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-4 sm:p-6">
              {/* Mock Window Controls */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" aria-hidden="true" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" aria-hidden="true" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" aria-hidden="true" />
                  <span className="ml-3 text-xs font-mono text-slate-400">app.demoflow.io/preview/saas-tour</span>
                </div>
                <span className="rounded bg-emerald-950 px-2.5 py-0.5 text-xs font-medium text-emerald-300 border border-emerald-800/40">
                  Live Interactive Demo
                </span>
              </div>

              {/* Mock Tour Interactive Canvas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                <div className="rounded-lg border border-slate-800 bg-slate-900/90 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Step 1: Capture</div>
                  <p className="mt-1 text-sm font-semibold text-white">Record Any User Flow</p>
                  <p className="mt-1 text-xs text-slate-300">Record in browser clicks, forms, and pages with our light extension.</p>
                </div>
                <div className="rounded-lg border border-indigo-500/50 bg-indigo-950/30 p-4 relative">
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Step 2: Customize</div>
                  <p className="mt-1 text-sm font-semibold text-white">Add Guided Hotspots</p>
                  <p className="mt-1 text-xs text-slate-200">Highlight key ROI moments with interactive tooltips and badges.</p>
                  <span className="absolute -top-2 right-2 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white">Active</span>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/90 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-sky-400">Step 3: Convert</div>
                  <p className="mt-1 text-sm font-semibold text-white">Capture Qualified Leads</p>
                  <p className="mt-1 text-xs text-slate-300">Gate high-intent actions with custom demo request forms.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        DEVELOPMENT ONLY: Floating badge to easily test and see current A/B variant.
        ACCESSIBILITY: Uses role="status" and aria-label for assistive technologies.
      */}
      {variant && (
        <aside
          role="status"
          aria-label="Development A/B Test Variant Indicator"
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-indigo-500/40 bg-slate-900/95 px-3.5 py-1.5 text-xs font-mono font-medium text-indigo-300 shadow-xl backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          <span>Variant: {variant}</span>
        </aside>
      )}
    </>
  );
}
