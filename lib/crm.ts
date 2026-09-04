// ClickMasters CRM lead submission (see team guide: "How to Connect Your
// Website to ClickMasters CRM").
//
// The lead is posted directly from the visitor's browser so the CRM can
// capture the real IP address, device, operating system and geo location
// automatically. Submission is fire-and-forget: if the CRM is unreachable,
// the contact form's own email flow is NOT affected.

export const CRM_WEBSITE = "clickmastersapplicationdevelopment.com";
export const CRM_SERVICE = "Software Development";

const CRM_ENDPOINT =
  process.env.NEXT_PUBLIC_CRM_LEAD_ENDPOINT ??
  "https://crm.clickmasters.pk/api/leads";

export type CrmLead = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  service?: string;
};

const getUtm = (param: string): string =>
  new URLSearchParams(window.location.search).get(param) || "";

/**
 * Sends a lead to the central ClickMasters CRM.
 * Never throws — failures are logged to the console only.
 */
export function submitLeadToCrm(lead: CrmLead): void {
  if (typeof window === "undefined") return;

  const formData = {
    name: lead.name ?? "",
    email: lead.email ?? "",
    phone: lead.phone ?? "",
    company: lead.company ?? "",
    message: lead.message ?? "",
    website: CRM_WEBSITE,
    service: lead.service || CRM_SERVICE,
    landingPage: window.location.href,
    referrer: document.referrer,
    utm_source: getUtm("utm_source"),
    utm_medium: getUtm("utm_medium"),
    utm_campaign: getUtm("utm_campaign"),
    utm_term: getUtm("utm_term"),
    utm_content: getUtm("utm_content"),
  };

  void fetch(CRM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    keepalive: true,
  })
    .then(async (res) => {
      if (!res.ok) {
        // e.g. {"error": "Validation failed"} — log the CRM's message so
        // problems can be diagnosed from the browser console.
        const err = await res.json().catch(() => ({}));
        console.error("[crm] Lead submission failed:", err);
      }
    })
    .catch((err) => {
      console.error("[crm] Lead submission network error:", err);
    });
}
