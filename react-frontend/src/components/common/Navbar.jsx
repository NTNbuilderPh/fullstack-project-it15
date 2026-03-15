<<<<<<< HEAD
import { useAuth } from "../../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="UDDN Logo" className="navbar-logo" />
        <div>
          <h2>University of Davao Del Norte</h2>
          <p>Academic Dashboard 2025-2026</p>
        </div>
      </div>

      <div className="navbar-right">
        <span className="user-pill">{user?.name}</span>
        <button className="btn danger" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}

=======
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="UDDN Logo" className="navbar-logo" />
        <div>
          <h2>University of Davao Del Norte</h2>
          <p>Academic Dashboard 2025–2026</p>
        </div>
      </div>

      <div className="navbar-right">
        <span className="user-pill">{user?.name}</span>
        <button className="btn danger" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
