import { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { LegalPage, LEGAL_CONTACT_EMAIL } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use | ClickMasters",
  description:
    "The terms that apply when you use the ClickMasters website, including content use, estimates, third-party links, and limitations of liability.",
  alternates: { canonical: canonicalUrl("/terms") },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      intro="These terms apply to your use of this website. By using the site, you agree to them. If you do not agree, please do not use the site."
    >
      <section>
        <h2>About these terms</h2>
        <p>
          This website is operated by ClickMasters Application Development
          (&quot;ClickMasters&quot;, &quot;we&quot;, &quot;us&quot;). These
          terms cover the website only. Any software development, design, or
          support work we do for you is governed by a separate written agreement
          or statement of work, which takes priority over these terms.
        </p>
      </section>

      <section>
        <h2>Website content</h2>
        <p>
          The articles, guides, cost ranges, comparisons, and other content on
          this site are general information, not professional, legal, or
          financial advice. Prices, timelines, and estimates are indicative only
          and are not a quote or an offer. A binding price is only provided in a
          written proposal.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          The website, including its text, design, graphics, logos, and code, is
          owned by ClickMasters or its licensors and protected by intellectual
          property laws. You may view and share pages for personal or internal
          business use. You may not copy, republish, or sell site content
          without our written permission.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <ul>
          <li>Do not use the site for any unlawful purpose</li>
          <li>
            Do not attempt to gain unauthorized access to the site, its servers,
            or related systems
          </li>
          <li>
            Do not interfere with the site&apos;s operation, for example through
            malware, excessive automated requests, or denial-of-service attacks
          </li>
          <li>Do not submit false, misleading, or spam enquiries</li>
        </ul>
      </section>

      <section>
        <h2>Information you send us</h2>
        <p>
          Please do not send confidential information through our contact forms
          before a non-disclosure or service agreement is in place. How we
          handle personal information is described in our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section>
        <h2>Third-party links</h2>
        <p>
          The site may link to third-party websites and tools. We do not control
          them and are not responsible for their content, availability, or
          privacy practices.
        </p>
      </section>

      <section>
        <h2>Disclaimer and limitation of liability</h2>
        <p>
          The website is provided &quot;as is&quot; and &quot;as
          available&quot;, without warranties of any kind. To the fullest extent
          permitted by law, ClickMasters is not liable for any indirect,
          incidental, or consequential loss arising from your use of, or
          inability to use, the website or its content.
        </p>
      </section>

      <section>
        <h2>Changes to these terms</h2>
        <p>
          We may update these terms at any time. The &quot;Last updated&quot;
          date above shows when they last changed. Continued use of the site
          means you accept the updated terms.
        </p>
      </section>

      <section>
        <h2>Contact us</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a> or
          use our <Link href="/contact">contact page</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
