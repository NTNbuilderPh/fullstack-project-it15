import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login, authLoading, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    email: "admin@uddn.edu.ph",
    password: "password123",
  });

  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
      general: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const result = await login(form);

    if (!result.success) {
      setErrors({ general: result.message });
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-container">
          <div className="login-left">
            <img src="/logo.png" alt="UDDN Logo" className="login-logo" />
            <h1>University of Davao Del Norte</h1>
            <p>
              Integrative Programming Final Project Dashboard
            </p>
            <p className="login-subtext">
              Real-time enrollment, attendance, course distribution, and weather insights.
            </p>
          </div>

          <div className="login-card">
            <h2>Sign in</h2>
            <p>Access the academic dashboard</p>

            {errors.general && <div className="alert error">{errors.general}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && <small className="field-error">{errors.email}</small>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                {errors.password && <small className="field-error">{errors.password}</small>}
              </div>

              <button type="submit" className="btn primary full" disabled={authLoading}>
                {authLoading ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="demo-box">
              <strong>Demo Credentials</strong>
              <p>Email: admin@uddn.edu.ph</p>
              <p>Password: password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}