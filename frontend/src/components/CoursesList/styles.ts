import styled, { keyframes } from "styled-components"

export const ListContainer = styled.div`
  width: 100%;
  max-width: 56.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
`

const rotateLoading = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-height: 35rem;

  .loadingCourses {
    border: 6px solid #e9e9e9;
    border-top: 6px #5a3ce8 solid;
    border-radius: 50%;
    height: 3.75rem;
    width: 3.75rem;
    -webkit-animation: ${rotateLoading} 1s linear infinite;
    animation: ${rotateLoading} 1s linear infinite;
  }
`

export const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
  max-height: 35rem;
  padding: 0.3125rem;
  padding-bottom: 0.9375rem;
  padding-left: 0;
  overflow-y: auto;

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
  align-items: center;
  gap: 0.625rem;
  font-size: 1.25rem;

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
`
