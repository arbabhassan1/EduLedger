import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PrivateRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import UpdatePassword from "./pages/auth/UpdatePassword";
import DashboardPage from "./pages/dashboard/DashboardPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
