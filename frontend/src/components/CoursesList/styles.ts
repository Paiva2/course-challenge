import styled from "styled-components"

export const ListContainer = styled.div`
  width: 100%;
  max-width: 56.25rem;
`

export const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  max-height: 40.625rem;
  padding: 0.625rem;
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
