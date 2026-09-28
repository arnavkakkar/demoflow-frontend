// NEXT.JS SPECIFIC: Server Component
// The Footer is completely static, so it runs on the server and generates zero JavaScript in the user's browser.

export default function Footer() {
  return (
    // SEMANTIC HTML: <footer> element represents the footer for its nearest sectioning content or root
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white shadow-sm">
                <svg
                  className="h-4 w-4"
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
              <span>
                Demo<span className="text-indigo-400">Flow</span>
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-300">
              Interactive product demo platform designed for high-velocity marketing web developers and growth teams.
            </p>
          </div>

          {/* Navigation Column 1: Product (ACCESSIBILITY: <h3> for section column headers) */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Product
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-sm"
                >
                  Interactive Demos
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-sm"
                >
                  Behavioral Analytics
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-sm"
                >
                  Pricing Plans
                </a>
              </li>
              <li>
                <a
                  href="#demo"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-sm"
                >
                  Request a Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Resources (ACCESSIBILITY: <h3> for section column headers) */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Resources
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-sm"
                >
                  Interactive Tour Examples
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-sm"
                >
                  Marketing Developer Guide
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-sm"
                >
                  API Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Legal & Security (ACCESSIBILITY: <h3> for section column headers) */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Company & Trust
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-sm"
                >
                  Security & SOC2
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-sm"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-12 border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 DemoFlow, Inc. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with Next.js App Router & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
