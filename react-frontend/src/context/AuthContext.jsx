import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./authContextStore";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, user]);

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await api.get("/me");
        setUser(response.data.user);
      } catch (error) {
        console.error("Fetch user failed:", error);
        setToken(null);
        setUser(null);
      }
    }

    if (token && !user) {
      fetchMe();
    }
  }, [token, user]);

  const login = async (credentials) => {
    setAuthLoading(true);
    try {
      const response = await api.post("/login", credentials);
      setToken(response.data.token);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data?.errors?.email?.[0] ||
          "Login failed. Please try again.",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      authLoading,
      login,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [user, token, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
