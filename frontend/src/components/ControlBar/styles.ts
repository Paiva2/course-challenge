import styled from "styled-components"

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

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  p {
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
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
