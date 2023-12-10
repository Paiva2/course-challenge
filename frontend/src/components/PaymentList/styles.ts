import styled from "styled-components"

export const PaymentListContainer = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.875rem;
  padding: 1.25rem;
`

export const PaymentListWrapper = styled.div`
  width: 100%;
  display: flex;
  max-width: 43.75rem;
  flex-direction: column;
  gap: 0.9375rem;
  height: 35rem;
  padding: 0.3125rem;
  padding-bottom: 0.9375rem;
  padding-left: 0;
`

export const Title = styled.h1`
  font-size: 1.875rem;
  color: #4a4a4a;
`

export const ListControl = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
`

export const ControlButton = styled.button<{ $hightlight: boolean }>`
  width: 100%;
  background-color: ${(props) => (props.$hightlight ? "#2644cf" : "#5a72e0")};
  border-radius: 8px;
  color: #fff;
  max-width: fit-content;
  font-weight: 600;
  padding: 0.9375rem 1.25rem;
  text-align: center;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &:hover {
    background-color: #2644cf;
  }
`

export const ListItems = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.25rem;
  height: 100%;
  overflow-y: auto;
  padding: 10px;

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
`

export const PaginationWrapper = styled.div`
  display: flex;
  gap: 0.625rem;
  font-size: 1.25rem;
  max-width: 100%;
  padding-bottom: 0.9375rem;
  padding-top: 0.5rem;
  padding-right: 0.625rem;
  padding-left: 0.625rem;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 0 auto;

  button {
    background-color: #5a72e0;
    color: #fff;
    padding: 0.625rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.125rem;
    width: 1.125rem;
    border-radius: 10px;
    transition: 0.2s ease-in-out;

    &:disabled {
      opacity: 0.6;
      cursor: default;
    }

    &:hover {
      background-color: #223cb8;
    }
  }

  @media (max-width: 768px) {
    justify-content: initial;
    height: 5rem;

    button {
      padding: 0.75rem;
    }
  }
`

export const PageNumber = styled.button<{ $highlight: boolean }>`
  background-color: ${(props) =>
    props.$highlight ? "#223cb8" : "#5a72e0"} !important;
`

export const BackLink = styled.a`
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
