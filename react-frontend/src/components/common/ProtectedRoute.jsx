import { Navigate } from "react-router-dom";
<<<<<<< HEAD
import { useAuth } from "../../context/useAuth";
=======
import { useAuth } from "../../context/AuthContext";
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
<<<<<<< HEAD
}
=======
}
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
