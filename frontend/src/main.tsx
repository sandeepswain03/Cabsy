import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";
import { CaptainContextProvider } from "./context/CaptainContext.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <CaptainContextProvider>
        <UserContextProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </UserContextProvider>
      </CaptainContextProvider>
    </Router>
  </StrictMode>
);
