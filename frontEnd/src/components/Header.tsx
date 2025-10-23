// Header component
// Main navigation bar with logo, nav links, language switcher and auth button

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { LoginModal, SignupModal, ForgotPasswordModal } from "./auth";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { isAuthenticated, login, logout, user } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  /**
   * Get user's full name from profile or user metadata
   */
  const getUserName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.name || "User";
  };

  /**
   * Check if current route is active
   */
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  /**
   * Handle authentication button click
   * Opens login modal if not authenticated, logout if authenticated
   * Navigates to home before logout to prevent AlertModal from showing
   */
  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate("/");
      logout();
    } else {
      setShowLoginModal(true);
    }
  };

  /**
   * Handle successful login
   * Called by LoginModal after authentication succeeds
   */
  const handleLoginSuccess = (
    userId: string,
    userName: string,
    userEmail: string,
    firstName?: string,
    lastName?: string,
  ) => {
    login(userId, userName, userEmail, firstName, lastName);
    setShowLoginModal(false);
  };

  /**
   * Handle switch to signup
   * Closes login modal and opens signup modal
   */
  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  /**
   * Handle switch to login
   * Closes signup modal and opens login modal
   */
  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  /**
   * Handle switch to forgot password
   * Closes login modal and opens forgot password modal
   */
  const handleSwitchToForgotPassword = () => {
    setShowLoginModal(false);
    setShowForgotPasswordModal(true);
  };

  /**
   * Handle switch from forgot password to login
   * Closes forgot password modal and opens login modal
   */
  const handleSwitchFromForgotPasswordToLogin = () => {
    setShowForgotPasswordModal(false);
    setShowLoginModal(true);
  };

  return (
    <>
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Logo / Brand name - Left side */}
          <div className="text-xl font-bold">
            <Link to="/" className="hover:text-gray-600">
              WebApp
            </Link>
          </div>

          {/* Navigation links - Center */}
          <nav className="flex gap-6">
            <Link
              to="/"
              className={`transition-colors hover:text-gray-600 ${
                isActiveRoute("/") ? "border-b-2 border-blue-600 pb-1" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/info"
              className={`transition-colors hover:text-gray-600 ${
                isActiveRoute("/info") ? "border-b-2 border-blue-600 pb-1" : ""
              }`}
            >
              Info
            </Link>
            {isAuthenticated && (
              <Link
                to="/user"
                className={`font-medium transition-colors hover:text-gray-600 ${
                  isActiveRoute("/user")
                    ? "border-b-2 border-blue-600 pb-1"
                    : "text-gray-700"
                }`}
              >
                {getUserName()}
              </Link>
            )}
          </nav>

          {/* Auth button and Language Switcher - Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button className="btn" onClick={handleAuthClick}>
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignup={handleSwitchToSignup}
        onSwitchToForgotPassword={handleSwitchToForgotPassword}
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        onSwitchToLogin={handleSwitchFromForgotPasswordToLogin}
      />
    </>
  );
}
