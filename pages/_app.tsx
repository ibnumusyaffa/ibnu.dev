import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

import { JetBrains_Mono, Inter } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export const inter = Inter({
  subsets: ["latin"],
  // weight: ["400","600", "700"],
  variable: "--font-inter",
});


export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}
    >
      <Layout>
        <Component {...pageProps} />
        <SpeedInsights />
        <Analytics />
      </Layout>
    </main>
  );
}
