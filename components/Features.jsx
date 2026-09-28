 // NEXT.JS SPECIFIC: Server Component
// Like Hero.jsx, this component does not require interactivity hooks (like useState),
// so Next.js renders it directly to static HTML during compilation, delivering optimal SEO and performance.

export default function Features() {
  const features = [
    {
      title: "Zero-Code Flow Builder",
      description:
        "Capture web application screens and interactions instantly. Add guided tooltips, hotspot highlights, and branching click paths without writing a line of code.",
      badge: "No-Code",
      icon: (
        <svg
          className="h-6 w-6 text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Drop-Off & Intent Analytics",
      description:
        "See exactly where prospects engage, what steps cause drop-off, and which product features trigger high purchasing intent before sales calls.",
      badge: "Insights",
      icon: (
        <svg
          className="h-6 w-6 text-sky-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "Instant CRM & Pipeline Routing",
      description:
        "Automatically route lead contact details and engagement scores directly into your CRM, marketing automation, or custom Flask API backend.",
      badge: "Automation",
      icon: (
        <svg
          className="h-6 w-6 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
    },
  ];

  return (
    // SEMANTIC HTML: Section tag with unique identifier for anchor navigation (#features)
    <section
      id="features"
      aria-labelledby="features-heading"
      className="border-t border-slate-800/80 bg-slate-900/40 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Why Marketing Teams Choose DemoFlow
          </p>
          <h2
            id="features-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Built to Showcase Product Value Upfront
          </h2>
          <p className="mt-4 text-base text-slate-300 sm:text-lg">
            Traditional demo requests lose 70% of potential buyers waiting for a scheduled call. 
            DemoFlow gives prospects self-serve, interactive experiences that accelerate decisions.
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-indigo-500/10"
            >
              {/* Feature Icon Container */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-inner group-hover:scale-105 transition-transform duration-200">
                {feature.icon}
              </div>

              {/* Tag / Badge */}
              <div className="mt-6">
                <span className="inline-block rounded-md bg-indigo-950/80 px-2.5 py-1 text-xs font-medium text-indigo-300 border border-indigo-800/40">
                  {feature.badge}
                </span>
              </div>

              {/* Feature Title & Description */}
              <h3 className="mt-4 text-xl font-semibold text-white group-hover:text-indigo-200 transition-colors">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
