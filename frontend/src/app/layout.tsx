"use client"

import { Roboto } from "next/font/google"
import { QueryClient, QueryClientProvider } from "react-query"
import CourseContext from "@/contexts/courseContext"
import StyledComponentsRegistry from "./registry"
import UserContext from "@/contexts/userContext"

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"] })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <QueryClientProvider client={queryClient}>
        <UserContext>
          <CourseContext>
            <body suppressHydrationWarning={true} className={roboto.className}>
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </body>
          </CourseContext>
        </UserContext>
      </QueryClientProvider>
    </html>
  )
}
