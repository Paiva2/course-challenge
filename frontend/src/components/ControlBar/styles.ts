import styled, { keyframes } from "styled-components"

export const Bar = styled.div`
  background-color: #5a72e0;
  width: 100%;
  height: 4.375rem;
  border-radius: 8px;
  max-width: 56.25rem;
  display: flex;
  align-items: center;
  padding: 1.875rem;
`

export const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`

const rotateLoading = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  p {
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .loadingQuantity {
    border: 3px solid #e9e9e9;
    border-top: 3px #5a3ce8 solid;
    border-radius: 50%;
    height: 1.25rem;
    width: 1.25rem;
    -webkit-animation: ${rotateLoading} 1s linear infinite;
    animation: ${rotateLoading} 1s linear infinite;
  }
`

export const LeftSide = styled.div``

export const LoginLink = styled.a`
  color: #fff;
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`
