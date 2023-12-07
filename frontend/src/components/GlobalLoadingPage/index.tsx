import React from "react"
import { Loader, LoaderOverlay } from "./styles"

const GlobalLoadingPage = () => {
  return (
    <LoaderOverlay>
      <Loader />
    </LoaderOverlay>
  )
}

export default GlobalLoadingPage
