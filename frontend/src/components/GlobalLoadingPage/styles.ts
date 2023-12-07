import styled, { keyframes } from "styled-components"

const rotateLoading = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`
export const LoaderOverlay = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: 100;
`

export const Loader = styled.div`
  margin: 0 auto;
  border: 5px solid #f3f3f3;
  border-radius: 100%;
  border-top: 5px solid #3a4374;
  width: 3.75rem;
  height: 3.75rem;
  animation: ${rotateLoading} 1s linear infinite;
`
