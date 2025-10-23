// AuthInput component
// Reusable input with validation error display

import { type InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  labelKey?: string;
}

/**
 * AuthInput component
 * Reusable input with label and error message display
 * @param label - Label text (can be i18n key)
 * @param error - Error message i18n key
 * @param labelKey - Optional i18n key for label
 * @param props - Standard HTML input props
 */
export default function AuthInput({
  label,
  error,
  labelKey,
  id,
  ...props
}: AuthInputProps) {
  const { t } = useTranslation();

  const displayLabel = labelKey ? t(labelKey) : label;
  const displayError = error ? t(error) : null;

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {displayLabel}
      </label>
      <input
        id={id}
        className={`w-full rounded-lg border px-3 py-2 placeholder-gray-300 focus:outline-none ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        }`}
        {...props}
      />
      {displayError && (
        <p className="mt-1 text-sm text-red-600">{displayError}</p>
      )}
    </div>
  );
}
