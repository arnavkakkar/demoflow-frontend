/**
 * A/B Testing Logic for DemoFlow (Step 2)
 *
 * This module manages assigning and persisting A/B test variants:
 * - "A": Control (Feature-focused headline, "Request a Demo" button)
 * - "B": Challenger (Benefit-focused headline, "See It in Action" button)
 */

/**
 * HELPER: Reads a cookie by name from document.cookie.
 *
 * How it works:
 * 1. In browser environments, document.cookie is a string of semicolon-separated pairs:
 *    e.g., "theme=dark; demoflow_variant=A; analytics_id=123"
 * 2. We split by ";" to get each pair, trim extra whitespace, and split by "=".
 * 3. If the key matches the requested name, we decode and return the value.
 * 4. Returns null if the cookie does not exist or if running on the server.
 */
export function getCookie(name) {
  if (typeof document === "undefined") {
    return null; // Safety check: document only exists in the browser
  }

  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [key, ...valueParts] = cookie.trim().split("=");
    if (key === name) {
      return decodeURIComponent(valueParts.join("="));
    }
  }

  return null;
}

/**
 * MAIN FUNCTION: Returns the user's assigned variant ("A" or "B").
 *
 * How it works:
 * 1. Checks if the "demoflow_variant" cookie already exists with "A" or "B".
 *    If yes, returns it so returning visitors always see the exact same variant.
 * 2. If no valid cookie exists, randomly picks "A" or "B" (50/50 split using Math.random).
 * 3. Saves the chosen variant into a cookie with:
 *    - expires: 30 days in the future (Date calculation)
 *    - path=/: available on all pages of the site
 *    - SameSite=Lax: standard browser security practice
 * 4. Returns the chosen variant string ("A" or "B").
 */
export function getVariant() {
  const COOKIE_NAME = "demoflow_variant";

  // Step 1: Check existing cookie
  const existingVariant = getCookie(COOKIE_NAME);
  if (existingVariant === "A" || existingVariant === "B") {
    return existingVariant;
  }

  // Step 2: Pick randomly (50% chance for A, 50% for B)
  const assignedVariant = Math.random() < 0.5 ? "A" : "B";

  // Step 3: Save cookie with 30-day expiration
  if (typeof document !== "undefined") {
    const days = 30;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${COOKIE_NAME}=${assignedVariant}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
  }

  return assignedVariant;
}
