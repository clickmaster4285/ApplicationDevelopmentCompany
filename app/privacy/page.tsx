import { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { LegalPage, LEGAL_CONTACT_EMAIL } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | ClickMasters",
  description:
    "How ClickMasters collects, uses, and protects the personal information you share through our website and contact forms.",
  alternates: { canonical: canonicalUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This policy explains what personal information ClickMasters collects when you use this website, how we use it, and the choices you have."
    >
      <section>
        <h2>Information we collect</h2>
        <p>
          <strong>Information you give us.</strong> When you contact us or
          request a quote, we collect the details you enter, such as your name,
          email address, phone number, company name, and your message.
        </p>
        <p>
          <strong>Information collected automatically.</strong> Like most
          websites, we collect technical data such as your browser type, device,
          pages visited, and approximate location, through cookies and similar
          technologies (see Analytics and cookies below).
        </p>
      </section>

      <section>
        <h2>How we use your information</h2>
        <ul>
          <li>To respond to your enquiry and discuss your project</li>
          <li>To prepare proposals, estimates, and agreements you request</li>
          <li>To manage our client and lead records</li>
          <li>To understand how the website is used and improve it</li>
          <li>To protect the website against fraud, spam, and abuse</li>
          <li>To meet legal and regulatory obligations</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </section>

      <section>
        <h2>Analytics and cookies</h2>
        <p>
          We use Google Tag Manager and Google Analytics to measure website
          traffic and usage. These services may set cookies and collect usage
          data on our behalf. You can block or delete cookies in your browser
          settings, and you can opt out of Google Analytics with Google&apos;s
          browser add-on.
        </p>
      </section>

      <section>
        <h2>Who we share information with</h2>
        <p>
          We share personal information only with service providers that help
          us run our business, such as email delivery, customer relationship
          management (CRM), hosting, and analytics providers. They may use it
          only to provide services to us. We may also disclose information when
          required by law or to protect our rights.
        </p>
      </section>

      <section>
        <h2>How long we keep information</h2>
        <p>
          We keep enquiry and client information for as long as needed to
          respond to you, provide our services, and meet legal, accounting, or
          reporting requirements. When it is no longer needed, we delete or
          anonymize it.
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          We use reasonable technical and organizational measures to protect
          personal information. No method of transmission or storage is
          completely secure, so we cannot guarantee absolute security. Read more
          on our <Link href="/about/security">Security page</Link>.
        </p>
      </section>

      <section>
        <h2>Your rights and choices</h2>
        <p>
          Depending on where you live, you may have the right to access,
          correct, delete, or receive a copy of your personal information, and
          to object to or restrict certain processing. To make a request,
          email us. We will respond within the time required by applicable law.
        </p>
      </section>

      <section>
        <h2>Children&apos;s privacy</h2>
        <p>
          This website is intended for businesses and is not directed at
          children under 16. We do not knowingly collect their personal
          information.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The &quot;Last
          updated&quot; date above shows when it was last changed.
        </p>
      </section>

      <section>
        <h2>Contact us</h2>
        <p>
          Questions about this policy or your information? Email{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a> or
          use our <Link href="/contact">contact page</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
