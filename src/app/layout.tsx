import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title:
    "IT loyiha boshqaruvi va IT xizmatlari | Websayt, Mobil ilova - Shavkatov PM",
  description:
    "Shavkatov PM – IT loyihalarni 0 dan yakunigacha boshqarish va ishlab chiqish xizmati. Websayt yasash, mobil ilova ishlab chiqish, startap uchun IT jamoa va project management yechimlari.",
  applicationName: "Shavkatov PM",
  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
  keywords: [
    "Shavkatov PM",
    "IT loyiha ishlab chiqish",
    "Startap uchun IT yechimlar",
    "Onlayn biznes uchun websayt kerak",
    "IT loyiha boshqaruvi xizmati",
    "IT jamoa kerak",
    "web dasturlash xizmatlari",
    "mobil ilova ishlab chiqish",
    "Sayt yasash xizmati",
    "Website buyurtma berish",
    "O’zbekistonda top PM lar",
    "O’zbekistonda IT loyiha boshqarish",
    "IT Loyiha boshqaruvchi",
    "IT loyiha ishlab chiqish narxi",
    "Biznesga sayt kerak",
    "Website buyurtma",
  ],
  authors: [{ name: "Shovkatov Fayzulloh" }],
  creator: "Muhammad Yusuf Nasrulloh",
  publisher: "Muhammad Yusuf Nasrulloh",
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://www.shavkatovpm.uz"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "IT loyiha boshqaruvi va IT xizmatlari | Websayt, Mobil ilova - Shavkatov PM",
    description:
      "Shavkatov PM – IT loyihalarni 0 dan yakunigacha boshqarish va ishlab chiqish xizmati. Websayt yasash, mobil ilova ishlab chiqish, startap uchun IT jamoa va project management yechimlari",
    url: "/",
    siteName: "Shavkatov PM",
    images: [
      {
        url: "https://www.shavkatovpm.uz/logo.png",
        width: 1200,
        height: 630,
        alt: "Shavkatov PM - Web Site",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "IT loyiha boshqaruvi va IT xizmatlari | Websayt, Mobil ilova - Shavkatov PM",
    description:
      "Shavkatov PM – IT loyihalarni 0 dan yakunigacha boshqarish va ishlab chiqish xizmati. Websayt yasash, mobil ilova ishlab chiqish, startap uchun IT jamoa va project management yechimlari",
    images: ["https://www.shavkatovpm.uz/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#EDEBE6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <head>
        <meta name="author" content="Shavkatov PM" />
        <meta
          name="description"
          content="Shavkatov PM – IT loyihalarni 0 dan yakunigacha boshqarish va ishlab chiqish xizmati. Websayt yasash, mobil ilova ishlab chiqish, startap uchun IT jamoa va project management yechimlari"
        />
        <meta
          property="og:title"
          content="IT loyiha boshqaruvi va IT xizmatlari | Websayt, Mobil ilova - Shavkatov PM"
        />
        <meta
          property="og:description"
          content="Shavkatov PM – IT loyihalarni 0 dan yakunigacha boshqarish va ishlab chiqish xizmati. Websayt yasash, mobil ilova ishlab chiqish, startap uchun IT jamoa va project management yechimlari"
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Shavkatov PM" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Shavkatov PM" />
        <meta
          name="google-site-verification"
          content="9sx62z-QehItGBiQNF42wOqAq5l7BeujRJVDO6spfts"
        />
        {/* canonical is provided via metadata.alternates */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Shavkatov PM",
              url: "https://shavkatovpm.uz",
              logo: "https://shavkatovpm.uz/favicon/android-chrome-512x512.png",
            }),
          }}
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="https://www.shavkatovpm.uz/favicon/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
