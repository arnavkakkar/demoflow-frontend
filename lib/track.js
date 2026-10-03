/**
 * Event Tracking Helper for DemoFlow (Step 4)
 *
 * This module sends telemetry events to the Flask backend on port 5001.
 *
 * EVENT TYPES EXPLAINED:
 * 1. "view":
 *    Sent once when a visitor loads the landing page and is exposed to variant A or B.
 *    Used as the denominator for calculating Click Rate and Conversion Rate.
 * 2. "click":
 *    Sent whenever a visitor interacts with a primary CTA button ("Request a Demo" or "See It in Action").
 *    Used to measure immediate visitor intent.
 */

/**
 * Sends a telemetry event to the Flask backend.
 *
 * CRITICAL ANALYTICS PRINCIPLE:
 * Analytics tracking should NEVER degrade or break the user experience.
 * If the backend is unreachable or a network request fails, we silently catch
 * and ignore the error so the page continues functioning seamlessly.
 *
 * @param {"view" | "click"} eventType - The action being tracked
 * @param {"A" | "B"} variant - The user's active A/B test variant
 */
export async function trackEvent(eventType, variant) {
  if (!eventType || !variant) {
    return;
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  try {
    await fetch(`${API_URL}/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: eventType,
        variant: variant,
      }),
    });
  } catch (err) {
    // Silent fail: Never crash or alert the user if an analytics event fails
  }
}
