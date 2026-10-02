// NEXT.JS SPECIFIC: "use client" Directive
// Forms require client-side state management (useState) and browser event handlers (onSubmit, onChange),
// so this component must be marked as a Client Component.
"use client";

import { useState } from "react";
// Import getVariant from lib/variant.js to tag each lead with their active A/B test variant
import { getVariant } from "@/lib/variant";
// Import pushEvent to push form_submit event to GTM dataLayer (Step 5)
import { pushEvent } from "@/lib/gtm";

export default function LeadForm() {
  // FORM STATE:
  // - formData: tracks the user's typed input values (name, email, company)
  // - isSubmitting: toggles button loading state and prevents duplicate submissions
  // - status: stores success or error messages displayed to the user
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // format: { type: "success" | "error", message: string }

  // Generic input change handler: updates the corresponding field by name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // FORM SUBMISSION HANDLER
  const handleSubmit = async (e) => {
    // Prevent default browser form reloading behavior
    e.preventDefault();
    setStatus(null);

    // Frontend validation: name and email are required, email must contain "@"
    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus({
        type: "error",
        message: "Please provide both your name and email address.",
      });
      return;
    }

    if (!formData.email.includes("@")) {
      setStatus({
        type: "error",
        message: "Please provide a valid email address containing '@'.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Read the user's active A/B test variant ("A" or "B") from cookies
      const activeVariant = getVariant();

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        variant: activeVariant,
      };

      // Step 2: HOW THE FETCH CALL WORKS:
      // - fetch() is the standard browser API for making asynchronous HTTP network requests.
      // - Target endpoint: http://localhost:5001/lead (our Flask backend)
      // - method: "POST" signals that we are sending new data to create a lead record.
      // - headers: "Content-Type: application/json" informs Flask to parse request body as JSON.
      // - body: JSON.stringify(...) converts our JavaScript object into a JSON string payload.
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
      const response = await fetch(`${API_URL}/lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Parse JSON response from Flask backend
      const data = await response.json();

      if (!response.ok) {
        // If HTTP status is not 2xx (e.g. 400 Bad Request), display backend's error message
        throw new Error(data.error || "Failed to submit demo request.");
      }

      // Step 3: Success handling
      setStatus({
        type: "success",
        message: "Thank you! Your demo request has been received. Our team will contact you shortly.",
      });

      // GTM dataLayer Event (Step 5):
      // Push 'form_submit' with the active variant now that the lead is successfully saved in SQLite
      pushEvent("form_submit", { variant: activeVariant });

      // Clear the form fields after successful submission
      setFormData({
        name: "",
        email: "",
        company: "",
      });
    } catch (err) {
      // Step 4: Error handling (network failures, invalid inputs, or offline backend)
      setStatus({
        type: "error",
        message:
          err.message ||
          "Could not connect to the backend server. Please verify the Flask server is running.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
      {/* ACCESSIBILITY: Status Feedback Notification with role="alert" and aria-live="polite" */}
      {status && (
        <div
          id="form-status"
          role="alert"
          aria-live="polite"
          className={`mb-6 rounded-xl p-4 text-sm font-medium ${
            status.type === "success"
              ? "border border-emerald-500/40 bg-emerald-950/60 text-emerald-200"
              : "border border-rose-500/40 bg-rose-950/60 text-rose-200"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Accessible Lead Capture Form */}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Full Name Field: explicitly linked htmlFor with id */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-200 mb-1.5"
          >
            Full Name <span className="text-rose-400" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            aria-required="true"
            aria-describedby={status ? "form-status" : undefined}
            placeholder="e.g. Jane Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Work Email Field: explicitly linked htmlFor with id */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-200 mb-1.5"
          >
            Work Email <span className="text-rose-400" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            aria-describedby={status ? "form-status" : undefined}
            placeholder="e.g. jane@company.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Company Field (Optional): explicitly linked htmlFor with id */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-slate-200 mb-1.5"
          >
            Company Name <span className="text-slate-400 text-xs font-normal">(Optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="e.g. Acme Technologies"
            value={formData.company}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Submit Button with aria-busy state and visible focus styling */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Submitting Request...
              </span>
            ) : (
              "Submit Demo Request"
            )}
          </button>
        </div>

        {/* Privacy note */}
        <p className="text-center text-xs text-slate-400 pt-1">
          We respect your privacy. No spam, unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
