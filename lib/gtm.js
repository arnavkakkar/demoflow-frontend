/**
 * Google Tag Manager (GTM) & dataLayer Helper (Step 5)
 *
 * WHAT IS GOOGLE TAG MANAGER (GTM)?
 * GTM is a tag management platform that lets marketers deploy and update marketing tags
 * (e.g. Google Analytics 4, Google Ads, Meta Pixel, LinkedIn Insight) from a web dashboard
 * without waiting for developers to ship code releases.
 *
 * WHAT IS THE dataLayer?
 * The dataLayer is a global JavaScript array (window.dataLayer) that acts as a secure,
 * standardized bridge between your Next.js application and GTM.
 * Whenever you push an event into window.dataLayer, GTM detects it and can trigger
 * any marketing tag you've configured in the GTM interface.
 *
 * WHY USE pushEvent()?
 * 1. Checks that 'window' is defined to prevent errors during Next.js server-side rendering (SSR).
 * 2. Ensures window.dataLayer exists as an array (window.dataLayer = window.dataLayer || []).
 * 3. Enforces the standard GTM event format: { event: eventName, ...params }.
 */

/**
 * Pushes a custom event object to window.dataLayer for GTM.
 *
 * @param {string} eventName - The name of the event (e.g. "ab_variant_view", "cta_click", "form_submit")
 * @param {object} [params={}] - Additional payload metadata (e.g. { variant: "A", button_location: "hero_primary" })
 */
export function pushEvent(eventName, params = {}) {
  // Safety check: ensure code is executing in the browser, not during Next.js SSR
  if (typeof window === "undefined") {
    return;
  }

  // Initialize dataLayer array if it hasn't been created yet
  window.dataLayer = window.dataLayer || [];

  // Push the event object according to standard Google Tag Manager specifications
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}
