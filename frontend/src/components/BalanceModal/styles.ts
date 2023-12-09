import styled, { css, keyframes } from "styled-components"

export const BalanceOverlay = styled.div<{ $openOverlay: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.$openOverlay ? "1" : "0")};
  visibility: ${(props) => (props.$openOverlay ? "visible" : "hidden")};

  @media (max-width: 768px) {
    padding: 1.25rem;

    p {
      font-size: 1rem;
    }

    h1 {
      font-size: 1.5rem;
    }
  }
`

export const BalanceContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 28.125rem;
  overflow: hidden;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  background-color: #f7f8fd;
  border-radius: 8px;
  padding: 1.875rem;
  gap: 0.9375rem;
  justify-content: space-between;
  position: relative;
`

export const BalanceTitle = styled.h1`
  color: #434343;
  font-size: 1.75rem;
  align-self: center;
`
const rotateLoading = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`

export const BalanceContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.3125rem;
  gap: 1.3125rem;
  font-size: 1.125rem;
  word-break: normal;
  max-width: 25rem;
  overflow-y: auto;
  height: 70%;
  justify-content: center;

  .loadingBalance {
    border: 3px solid #e9e9e9;
    border-top: 3px #5a3ce8 solid;
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    align-self: center;
    -webkit-animation: ${rotateLoading} 1s linear infinite;
    animation: ${rotateLoading} 1s linear infinite;
  }

  &::-webkit-scrollbar {
    width: 0.4375rem;
    height: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #d9dde5;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #5a72e0;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    padding: 0.625rem;
  }
`

export const BackButton = styled.button`
  background-color: #5a72e0;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8125rem;
  height: 2.8125rem;
  transition: all 0.2s ease-in-out;
  align-self: center;

  &:hover {
    background-color: #2644cf;
  }
`

export const RefreshButton = styled.button<{ $refreshing: boolean }>`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 100%;
  background-color: #5a72e0;
  border-radius: 8px;
  max-width: fit-content;
  color: #fff;
  font-weight: 600;
  padding: 0.625rem;
  text-align: center;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.125rem;
  text-decoration: none;

  .refreshIcon {
    -webkit-animation: ${(props) =>
      props.$refreshing
        ? css`
            ${rotateLoading} 1s linear infinite
          `
        : ""};

    animation: ${(props) =>
      props.$refreshing
        ? css`
            ${rotateLoading} 1s linear infinite
          `
        : ""};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &:hover {
    background-color: #2644cf;
  }
`
