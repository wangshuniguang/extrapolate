import "@/styles/globals.css";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Viewport } from "next";
import Footer from "@/components/layout/footer";
import cx from "classnames";
import Navbar from "@/components/layout/navbar";
import Script from "next/script";

const clash = localFont({
  src: "../styles/ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// const CRISP_SCRIPT = `window.$crisp=[];window.CRISP_WEBSITE_ID="90ba947c-995a-46b5-a829-437e81c72cfa";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cx(clash.variable, inter.variable)}>
      {/* <Script
        id="script-crisp"
        dangerouslySetInnerHTML={{
          __html: CRISP_SCRIPT,
        }}
        strategy="lazyOnload"
      /> */}
      <body>
        <div className="fixed -z-10 h-screen w-screen bg-gradient-to-br from-emerald-100 via-blue-50 to-rose-100" />
        <Navbar />
        <main className="min-h-screen py-32 antialiased">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
