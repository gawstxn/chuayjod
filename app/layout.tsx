import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { APP_CONFIG } from "@/config/app"
import { ENV } from "@/config/env"
import type { Metadata } from "next"
import { IBM_Plex_Sans_Thai } from "next/font/google"
import "./globals.css"

const ibmThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-thai",
  subsets: ["latin", "thai"],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: `${APP_CONFIG.name} v${APP_CONFIG.version}`,
  description: APP_CONFIG.description,
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  if (ENV.isDev) console.log("Running in dev mode 🚧")
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmThai.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // default system
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}
