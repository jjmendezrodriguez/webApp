// useAuth hook
// Custom hook to access authentication context

import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/authContext";

/**
 * useAuth hook
 * Access authentication context in components
 * @throws Error if used outside AuthProvider
 * @returns Authentication context with user state and methods
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
