import styled from "styled-components"

export const Card = styled.a`
  text-decoration: none;
  background: #ffffff;
  width: 100%;
  padding: 1.875rem;
  height: 9.375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

export const CourseDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: #3f3d3d;

  p {
    color: #898989;
  }
`

export const Title = styled.h1`
  font-size: 1.25rem;
  margin-bottom: 0.625rem;
`

export const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 0.3125rem;
`

export const LaunchDate = styled.p`
  font-size: 0.875rem;
`

export const CourseQuestions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;

  span {
    color: #3f3d3d;
    font-size: 1.125rem;
    font-weight: 700;
  }
`
