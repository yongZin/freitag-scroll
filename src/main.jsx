import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { ScrollProvider } from "./components/context/ScrollContext.jsx";
import GlobalStyle from "./style/GlobalStyle.jsx";
import Theme from "./style/Theme.jsx";
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollProvider>
        <ThemeProvider theme={Theme}>
          <App />
          <GlobalStyle />
        </ThemeProvider>
      </ScrollProvider>
    </BrowserRouter>
  </StrictMode>,
)
