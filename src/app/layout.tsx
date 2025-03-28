import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Provider from "./providers"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Toaster } from "react-hot-toast"
import { Suspense } from "react"
import "react-tooltip/dist/react-tooltip.css"

const roobert = localFont({
  src: [
    {
      path: "/fonts/Roobert-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/Roobert-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
})

export const metadata: Metadata = {
  title: "SuperSwap",
  description:
    "SuperSwap is a DEX aggregator on Ink Chain, uniting liquidity across DEXs to ensure the best rates, low slippage, and high returns. Simple, secure, and user-friendly trading at its best!",
  openGraph: {
    images: [
      {
        url: "https://raw.githubusercontent.com/SuperSwapink/SuperSwap-UI/refs/heads/main/public/metadata.jpg",
        width: 1280,
        height: 426,
        alt: "SuperSwap",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon-180x180.png"
        />
        <link
          rel="icon"
          href="/android-chrome-192x192.png"
          sizes="192x192"
          type="image/png"
        />
        <link
          rel="icon"
          href="/android-chrome-512x512.png"
          sizes="512x512"
          type="image/png"
        />
      </head>
      <body className={roobert.className}>
        <Suspense fallback={<div />}>
          <Provider>
            <Header />
            <main className="relative min-h-[calc(100vh-96px)] pb-[290px]">
              {children}
              <Footer />
            </main>
            <Toaster position="top-right" />
          </Provider>
        </Suspense>
      </body>
    </html>
  )
}
