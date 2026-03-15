import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />}
        />
      </Routes>
    </ErrorBoundary>
  );
}
