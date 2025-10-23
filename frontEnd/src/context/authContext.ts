// Auth context definition
// Separate file for context to avoid Fast Refresh issues

import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | null;
  login: (
    userId: string,
    userName: string,
    userEmail: string,
    firstName?: string,
    lastName?: string,
  ) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
