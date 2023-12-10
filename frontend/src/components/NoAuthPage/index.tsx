"use client"

import { UserContextProvider } from "@/contexts/userContext"
import { useRouter } from "next/navigation"
import React, { Fragment, useContext, useLayoutEffect } from "react"

const NoAuthPage = ({ children }: { children: React.ReactNode }) => {
  const route = useRouter()

  const { userProfile } = useContext(UserContextProvider)

  useLayoutEffect(() => {
    if (userProfile.auth) {
      route.push("/")
    }
  }, [userProfile.auth])

  if (userProfile.auth === undefined || userProfile.auth) return <></>

  return <Fragment>{children}</Fragment>
}

export default NoAuthPage
