import { Navigate, Route, Routes } from "react-router-dom";
import Container from "./components/Container/Container";
import AuthLayout from "./components/AuthLayout";
import UserSignIn from "./pages/Sign-In/UserSignIn";
import CaptainSignIn from "./pages/Sign-In/CaptainSignIn";
import UserSignUp from "./pages/Sign-Up/UserSignUp";
import CaptainSignUp from "./pages/Sign-Up/CaptainSignUp";
import Index from "./pages/Index/Index";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthLayout authentication={false}>
            <Container>
              <Index />
            </Container>
          </AuthLayout>
        }
      />
      <Route
        path="/sign-in"
        element={
          <AuthLayout authentication={false}>
            <Container>
              <UserSignIn />
            </Container>
          </AuthLayout>
        }
      />
      <Route
        path="/captain-sign-in"
        element={
          <AuthLayout authentication={false}>
            <Container>
              <CaptainSignIn />
            </Container>
          </AuthLayout>
        }
      />
      <Route
        path="/sign-up"
        element={
          <AuthLayout authentication={false}>
            <Container>
              <UserSignUp />
            </Container>
          </AuthLayout>
        }
      />
      <Route
        path="/captain-sign-up"
        element={
          <AuthLayout authentication={false}>
            <Container>
              <CaptainSignUp />
            </Container>
          </AuthLayout>
        }
      />
      <Route
        path="/home"
        element={
          <AuthLayout authentication={false}>
            <Container>
              <Home />
            </Container>
          </AuthLayout>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
