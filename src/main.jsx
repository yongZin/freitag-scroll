import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import App from "./App.jsx";
import GlobalStyle from "./components/style/GlobalStyle.jsx";
import Theme from "./components/style/Theme.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <App />
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
