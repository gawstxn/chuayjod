import type { Metadata } from "next"
import { IBM_Plex_Sans_Thai } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import packageJson from '@/package.json'
import "./globals.css"

const ibmThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-thai",
  subsets: ["latin", "thai"],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: `Chuayjod v${packageJson.version}`,
  description: "Chuayjod Description...",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmThai.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
