import { CursorDot } from "@/components/cursor-dot";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Providers } from "@/components/providers";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Doto, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const doto = Doto({
  subsets: ["latin"],
  axes: ["ROND"],
  variable: "--font-doto",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
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
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        id="top"
        className={cn(
          "relative min-h-screen bg-background font-sans antialiased",
          spaceGrotesk.variable,
          spaceMono.variable,
          doto.variable,
        )}
      >
        <Providers>
          <div
            aria-hidden
            className="dot-grid pointer-events-none fixed inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          />
          <CursorDot />
          <Navbar />
          <div className="relative z-10 mx-auto max-w-4xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28">
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
