import styled from "styled-components"

export const ListItem = styled.li`
  background: #ffffff;
  width: 100%;
  padding: 1.875rem;
  display: flex;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  justify-content: space-between;
  gap: 0.9375rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

export const ActionButton = styled.button<{ $type: string }>`
  background-color: ${(props) => (props.$type === "pay" ? "#2b822b" : "#d12c2c")};
  border-radius: 100%;
  color: #fff;
  max-width: fit-content;
  font-weight: 600;
  padding: 0.4375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
`

export const PaidButton = styled.button`
  background-color: green;
  border-radius: 8px;
  color: #fff;
  max-width: fit-content;
  font-weight: 600;
  padding: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  cursor: default;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

export const ControlButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  button {
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`
