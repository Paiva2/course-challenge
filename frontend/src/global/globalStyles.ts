import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F7F8FD;
    height: 100vh;
  }

  input {
    outline: none;
  }

  button {
    all: unset;
    cursor: pointer;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }
`

export default GlobalStyle
