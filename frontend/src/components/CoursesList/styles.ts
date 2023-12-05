import styled from "styled-components"

export const ListContainer = styled.div`
  width: 100%;
  max-width: 56.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
`

export const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  max-height: 40.625rem;
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
    height: 20px;
    width: 20px;
    text-align: center;
    border-radius: 10px;
    transition: 0.2s ease-in-out;

    &:hover {
      background-color: #223cb8;
    }
  }
`
