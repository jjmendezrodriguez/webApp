// Authentication provider component
// Manages user authentication state with Supabase Auth

import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./authContext";
import { supabase } from "../services/supabase/db";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider component
 * Wraps the app to provide authentication state with Supabase integration
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session on mount
    checkSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name:
            session.user.user_metadata?.display_name ||
            session.user.email ||
            "Usuario",
          firstName: session.user.user_metadata?.firstName,
          lastName: session.user.user_metadata?.lastName,
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Check for existing session
   * Runs on app initialization
   */
  const checkSession = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setIsAuthenticated(true);
        setUser({
          id: session.user.id,
          name:
            session.user.user_metadata?.display_name ||
            session.user.email ||
            "Usuario",
          email: session.user.email || "",
          firstName: session.user.user_metadata?.firstName,
          lastName: session.user.user_metadata?.lastName,
        });
      }
    } catch (error) {
      console.error("Error checking session:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user
   * Updates local state - actual auth handled by LoginModal
   * @param userId - User ID from Supabase
   * @param userName - User name or email
   * @param userEmail - User email address
   * @param firstName - Optional first name from user_metadata
   * @param lastName - Optional last name from user_metadata
   */
  const login = (
    userId: string,
    userName: string,
    userEmail: string,
    firstName?: string,
    lastName?: string,
  ) => {
    setIsAuthenticated(true);
    setUser({
      id: userId,
      name: userName,
      email: userEmail,
      firstName,
      lastName,
    });
  };

  /**
   * Logout user
   * Signs out from Supabase and clears local state
   */
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Show loading state while checking session
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
