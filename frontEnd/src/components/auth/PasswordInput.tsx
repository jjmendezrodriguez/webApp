// PasswordInput component
// Password input with visibility toggle and optional strength meter

import { useState, type InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import {
  calculatePasswordStrength,
  getStrengthColor,
  getStrengthTextColor,
} from "@/utils/passwordStrength";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  labelKey?: string;
  showStrengthMeter?: boolean;
}

/**
 * PasswordInput component
 * Password input with eye toggle and optional strength indicator
 * @param label - Label text (can be i18n key)
 * @param error - Error message i18n key
 * @param labelKey - Optional i18n key for label
 * @param showStrengthMeter - Show password strength bar (default: false)
 * @param props - Standard HTML input props
 */
export default function PasswordInput({
  label,
  error,
  labelKey,
  showStrengthMeter = false,
  id,
  value,
  ...props
}: PasswordInputProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const displayLabel = labelKey ? t(labelKey) : label;
  const displayError = error ? t(error) : null;

  // Calculate password strength if meter is enabled
  const strengthResult =
    showStrengthMeter && value
      ? calculatePasswordStrength(String(value))
      : null;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {displayLabel}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          className={`w-full rounded-lg border px-3 py-2 pr-10 placeholder-gray-300 focus:outline-none ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label={
            showPassword
              ? t("auth.login.hidePassword")
              : t("auth.login.showPassword")
          }
        >
          {showPassword ? (
            // Eye open icon
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          ) : (
            // Eye closed icon
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Error message */}
      {displayError && (
        <p className="mt-1 text-sm text-red-600">{displayError}</p>
      )}

      {/* Password strength meter */}
      {showStrengthMeter &&
        strengthResult &&
        value &&
        String(value).length > 0 && (
          <div className="mt-2">
            {/* Strength bar */}
            <div className="h-1.5 w-full rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full transition-all duration-300 ${getStrengthColor(strengthResult.strength)}`}
                style={{ width: `${strengthResult.score}%` }}
              />
            </div>
            {/* Strength label */}
            <p
              className={`mt-1 text-xs font-medium ${getStrengthTextColor(strengthResult.strength)}`}
            >
              {t(`auth.signup.passwordStrength.${strengthResult.strength}`)}
            </p>
          </div>
        )}
    </div>
  );
}
