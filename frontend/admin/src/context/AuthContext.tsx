"use client";
import { createContext, useContext, useState, useEffect } from "react";
interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}
const getInitialToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedToken = getInitialToken();
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("authToken") || "",
  );
  useEffect(() => {
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setToken(token);
  };
  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };
  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
