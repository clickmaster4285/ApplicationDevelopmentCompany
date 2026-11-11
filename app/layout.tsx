import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/landingPage/Nav";
import { Footer } from "@/components/landingPage/Footer";
import { ErpPageEdits } from "@/components/cms/ErpPageEdits";
import { getCmsSiteInfo, getEditedPageSlugs } from "@/lib/cms/client";
import { toFooterColumns, toHeaderNav } from "@/lib/cms/navigation";
import { safeColor } from "@/lib/cms/sanitize";
import { erpAntiFlickerCss, erpAntiFlickerScript } from "@/lib/cms/anti-flicker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clickmastersapplicationdevelopment.com"),
  title: "Application development company USA - Clickmasters",
  description:
    "ClickMasters is a US application development company building digital products, improving business systems, and supporting growth.",
  icons: {
    icon: "/images/logo-app.webp",
    shortcut: "/images/logo-app.webp",
    apple: "/images/logo-app.webp",
  },
  verification: {
    google: "gNfCYQJTRuy2Ot2iF5ME4PmBagxr1Z1rHWzO1_ptOvc",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ERP CMS (optional): resolves to null / [] when unconfigured or unreachable,
  // in which case everything below renders exactly as before.
  const [cmsSite, editedSlugs] = await Promise.all([
    getCmsSiteInfo(),
    getEditedPageSlugs(),
  ]);
  const cmsHeaderNav = toHeaderNav(cmsSite?.navigation?.header);
  const cmsFooterColumns = toFooterColumns(cmsSite?.navigation?.footer);
  const erpPrimary = safeColor(
    cmsSite?.design?.colors?.primary ?? cmsSite?.website?.primaryColor,
  );
  const erpSecondary = safeColor(
    cmsSite?.design?.colors?.secondary ?? cmsSite?.website?.secondaryColor,
  );
  const erpThemeVars = {
    ...(erpPrimary ? { "--erp-primary": erpPrimary } : {}),
    ...(erpSecondary ? { "--erp-secondary": erpSecondary } : {}),
  } as React.CSSProperties;
  const antiFlicker = process.env.CMS_ANTI_FLICKER !== "off";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={erpThemeVars}
      // The anti-flicker <head> script may set data-erp-pending before hydration.
      suppressHydrationWarning
    >
      <head>
        {editedSlugs.length > 0 && antiFlicker && (
          <>
            <style dangerouslySetInnerHTML={{ __html: erpAntiFlickerCss }} />
            <script
              dangerouslySetInnerHTML={{
                __html: erpAntiFlickerScript(editedSlugs),
              }}
            />
          </>
        )}
        <link rel="icon" href="/images/logo-app.webp" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo-app.webp" />
        <meta name="theme-color" content="#000000" />
        
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="gNfCYQJTRuy2Ot2iF5ME4PmBagxr1Z1rHWzO1_ptOvc" />

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5KDWQXP7');
          `}
        </Script>
      </head>

      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5KDWQXP7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <div>
          {/* Must stay before {children}: see ErpPageEdits for why. */}
          <ErpPageEdits editedSlugs={editedSlugs} antiFlicker={antiFlicker} />
          <Nav cmsItems={cmsHeaderNav} />
          {children}
          <Footer cmsColumns={cmsFooterColumns} />
        </div>
      </body>
    </html>
  );
}
