import styled, { keyframes } from "styled-components"

const rotateLoading = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`

export const LoadingWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  inset: 0;
  background-color: #f7f8fd;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoadingState = styled.div`
  border: 6px solid #e9e9e9;
  border-top: 6px #5a3ce8 solid;
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
  -webkit-animation: ${rotateLoading} 1s linear infinite;
  animation: ${rotateLoading} 1s linear infinite;
`
