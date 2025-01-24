// import { useContext } from "react";
// import { UserContext } from "./context/UserContext";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Container from "./components/Container/Container";
import UserSignIn from "./pages/Sign-In/UserSignIn";
import CaptainSignIn from "./pages/Sign-In/CaptainSignIn";
import UserSignUp from "./pages/Sign-Up/UserSignUp";
import CaptainSignUp from "./pages/Sign-Up/CaptainSignUp";
import Index from "./pages/Index/Index";
import Home from "./pages/Home/Home";

function App() {
  // const isAuthenticated = useContext(UserContext);
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Container>
              <Index />
            </Container>
          }
        />
        <Route
          path="/sign-in"
          element={
            !isAuthenticated ? (
              <Container>
                <UserSignIn />
              </Container>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/captain-sign-in"
          element={
            !isAuthenticated ? (
              <Container>
                <CaptainSignIn />
              </Container>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/sign-up"
          element={
            !isAuthenticated ? (
              <Container>
                <UserSignUp />
              </Container>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/captain-sign-up"
          element={
            !isAuthenticated ? (
              <Container>
                <CaptainSignUp />
              </Container>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/home"
          element={!isAuthenticated ? <Home /> : <Navigate to="/sign-up" />}
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
