"use client"

import GlobalStyle from "@/global/globalStyles"
import { Roboto } from "next/font/google"

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <GlobalStyle />
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
