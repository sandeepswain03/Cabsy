import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Container from "./components/Container/Container";
import UserSignIn from "./pages/Sign-In/UserSignIn";
import CaptainSignIn from "./pages/Sign-In/CaptainSignIn";
import Home from "./pages/Home/Home";
import Index from "./pages/Index/Index";

function App() {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") == "true";

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
