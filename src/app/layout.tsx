import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'

const mPlusRounded = localFont({
  src: [
    { path: './fonts/m-plus-rounded-1c-400.ttf', weight: '400' },
    { path: './fonts/m-plus-rounded-1c-500.ttf', weight: '500' },
    { path: './fonts/m-plus-rounded-1c-700.ttf', weight: '700' },
  ],
  variable: '--font-m-plus-rounded',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nft.fluffyhugs.io'),
  title: 'Fluffy HUGS',
  description: 'Fluffy HUGS interactive picture-book experience built with React, CSS, GSAP, and Tailwind CSS.',
  icons: { icon: '/favicon.png', shortcut: '/favicon.png', apple: '/favicon.png' },
  openGraph: {
    title: 'Fluffy HUGS',
    description: 'Fluffy HUGS interactive picture-book experience.',
    images: [{ url: '/ogp.png', width: 1200, height: 630, alt: 'Fluffy HUGS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fluffy HUGS',
    description: 'Fluffy HUGS interactive picture-book experience.',
    images: ['/ogp.png'],
  },
}

const resetScrollScript = "history.scrollRestoration = 'manual'; window.scrollTo(0, 0);"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={mPlusRounded.variable}>
      <body className="font-sans">
        <Script id="reset-scroll" strategy="beforeInteractive">
          {resetScrollScript}
        </Script>
        {children}
      </body>
    </html>
  )
}
