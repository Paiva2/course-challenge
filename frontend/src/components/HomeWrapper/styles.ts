import styled from "styled-components"

export const HomeContainer = styled.main`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  max-width: 75rem;
  display: flex;
  align-items: center;
  padding-top: 3.125rem;
  gap: 0.625rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  @media (max-width: 768px) {
    padding: 0;
    gap: 0;
  }
`
