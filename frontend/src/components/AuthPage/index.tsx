"use client"

import React, { Fragment, useContext, useLayoutEffect, useState } from "react"
import { UserContextProvider } from "@/contexts/userContext"
import { useRouter } from "next/navigation"

interface IAuthpage {
  children: React.ReactNode
  validRoles: string[]
}

const AuthPage = ({ children, validRoles }: IAuthpage) => {
  const route = useRouter()

  const { userProfile } = useContext(UserContextProvider)
  const [showPage, setShowPage] = useState(false)

  useLayoutEffect(() => {
    if (userProfile.auth === undefined || userProfile.data.role === undefined) return

    if (!userProfile.auth || !validRoles.includes(userProfile.data.role)) {
      return route.push("/")
    }

    setShowPage(true)
  }, [userProfile])

  if (!showPage) return <></>

  return <Fragment>{children}</Fragment>
}

export default AuthPage
