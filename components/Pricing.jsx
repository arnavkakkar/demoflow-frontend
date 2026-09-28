// NEXT.JS SPECIFIC: "use client" Directive
// Converted to Client Component to handle CTA button click tracking for GTM dataLayer and telemetry.
"use client";

// Import variant helper, telemetry, and GTM dataLayer helper
import { getVariant } from "@/lib/variant";
import { trackEvent } from "@/lib/track";
import { pushEvent } from "@/lib/gtm";

export default function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "$49",
      cadence: "/ month",
      description: "For early-stage startups and solo marketers looking to test interactive demos.",
      highlighted: false,
      buttonText: "Start 14-Day Trial",
      buttonHref: "#demo",
      features: [
        "Up to 3 active interactive tours",
        "1,000 monthly demo sessions",
        "Standard completion analytics",
        "DemoFlow watermark",
        "Community & email support",
      ],
    },
    {
      name: "Growth",
      price: "$149",
      cadence: "/ month",
      description: "For scaling marketing teams looking to drive higher pipeline conversion.",
      highlighted: true, // Most popular tier
      buttonText: "Request a Demo",
      buttonHref: "#demo",
      features: [
        "Unlimited interactive tours",
        "10,000 monthly demo sessions",
        "Advanced drop-off & step analytics",
        "Remove DemoFlow branding",
        "Custom domain & embeds",
        "HubSpot & CRM webhook integration",
      ],
    },
    {
      name: "Enterprise",
      price: "$399",
      cadence: "/ month",
      description: "For high-volume sales organizations requiring enterprise security and support.",
      highlighted: false,
      buttonText: "Contact Enterprise Sales",
      buttonHref: "#demo",
      features: [
        "Unlimited demo sessions",
        "Custom SLA & SOC2 Compliance",
        "Single Sign-On (SAML / SSO)",
        "Dedicated Success Manager",
        "Custom CRM integrations & Flask API support",
        "Role-based access permissions",
      ],
    },
  ];

  // STEP 5: Click event tracking for pricing buttons (button_location: "pricing")
  const handlePricingClick = () => {
    const currentVariant = getVariant();
    if (currentVariant) {
      // 1. Send click to Flask backend
      trackEvent("click", currentVariant);
      // 2. Push cta_click event to GTM dataLayer
      pushEvent("cta_click", {
        variant: currentVariant,
        button_location: "pricing",
      });
    }
  };

  return (
    // SEMANTIC HTML: Section tag with id for anchor navigation (#pricing)
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="border-t border-slate-800/80 bg-slate-950 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Transparent Pricing
          </p>
          {/* ACCESSIBILITY: <h2> heading follows <h1> hero heading */}
          <h2
            id="pricing-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Predictable Plans for High-Growth Teams
          </h2>
          <p className="mt-4 text-base text-slate-300 sm:text-lg">
            Choose the plan that fits your growth stage. Upgrade or cancel anytime.
          </p>
        </div>

        {/* 3 Pricing Tiers Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col justify-between rounded-2xl p-8 transition-all duration-300 ${
                tier.highlighted
                  ? "border-2 border-indigo-500 bg-slate-900 shadow-2xl shadow-indigo-500/20 lg:-translate-y-2"
                  : "border border-slate-800 bg-slate-900/60 hover:border-slate-750"
              }`}
            >
              {/* Highlight badge for Growth tier */}
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                {/* ACCESSIBILITY: <h3> headings for individual plan tiers */}
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <p className="mt-2 text-sm text-slate-300">{tier.description}</p>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-white">
                    {tier.price}
                  </span>
                  <span className="text-sm font-medium text-slate-400">{tier.cadence}</span>
                </div>

                {/* Feature Checklist */}
                <ul className="mt-8 space-y-3.5 border-t border-slate-800/80 pt-6 text-sm text-slate-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-emerald-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tier CTA Button with accessible label and visible focus outline */}
              <div className="mt-8 pt-4">
                <a
                  href={tier.buttonHref}
                  onClick={handlePricingClick}
                  aria-label={`Select ${tier.name} plan for ${tier.price} per month`}
                  className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                    tier.highlighted
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
                      : "border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-750 hover:text-white"
                  }`}
                >
                  {tier.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance text */}
        <p className="mt-12 text-center text-xs text-slate-400">
          All plans include a 14-day free trial. Need custom enterprise billing or volume discounts?{" "}
          <a
            href="#demo"
            onClick={handlePricingClick}
            className="text-indigo-400 underline hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-sm"
          >
            Talk to our team
          </a>
          .
        </p>
      </div>
    </section>
  );
}
