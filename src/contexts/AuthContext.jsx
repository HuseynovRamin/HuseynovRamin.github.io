import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Mock logged-in user
  const [currentUser] = useState({ uid: "123", displayName: "Тестовый Пользователь" });

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
}
