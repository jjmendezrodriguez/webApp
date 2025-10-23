// Password strength calculator
// Calculates password strength based on various criteria

export type PasswordStrength = "weak" | "medium" | "strong";

export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number;
  feedback: string[];
}

/**
 * Calculate password strength score
 * @param password - Password to evaluate
 * @returns Strength score (0-100)
 */
const calculateScore = (password: string): number => {
  let score = 0;

  // Length bonus
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;

  // Character variety bonuses
  if (/[a-z]/.test(password)) score += 10; // lowercase
  if (/[A-Z]/.test(password)) score += 15; // uppercase
  if (/\d/.test(password)) score += 15; // numbers
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 20; // special chars

  return Math.min(score, 100);
};

/**
 * Get strength level from score
 * @param score - Password score (0-100)
 * @returns Strength level (weak | medium | strong)
 */
const getStrengthLevel = (score: number): PasswordStrength => {
  if (score < 40) return "weak";
  if (score < 70) return "medium";
  return "strong";
};

/**
 * Generate feedback messages for password improvement
 * @param password - Password to evaluate
 * @returns Array of i18n keys for feedback messages
 */
const generateFeedback = (password: string): string[] => {
  const feedback: string[] = [];

  if (password.length < 8) {
    feedback.push("auth.errors.passwordTooShort");
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push("auth.errors.passwordNoUppercase");
  }
  if (!/\d/.test(password)) {
    feedback.push("auth.errors.passwordNoNumber");
  }

  return feedback;
};

/**
 * Calculate comprehensive password strength
 * @param password - Password to evaluate
 * @returns Object with strength level, score, and feedback
 */
export const calculatePasswordStrength = (
  password: string,
): PasswordStrengthResult => {
  if (!password || password.length === 0) {
    return {
      strength: "weak",
      score: 0,
      feedback: ["auth.errors.invalidValue"],
    };
  }

  const score = calculateScore(password);
  const strength = getStrengthLevel(score);
  const feedback = generateFeedback(password);

  return {
    strength,
    score,
    feedback,
  };
};

/**
 * Get color class for password strength indicator
 * @param strength - Password strength level
 * @returns Tailwind color classes
 */
export const getStrengthColor = (strength: PasswordStrength): string => {
  switch (strength) {
    case "weak":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "strong":
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
};

/**
 * Get text color class for password strength label
 * @param strength - Password strength level
 * @returns Tailwind text color classes
 */
export const getStrengthTextColor = (strength: PasswordStrength): string => {
  switch (strength) {
    case "weak":
      return "text-red-600";
    case "medium":
      return "text-yellow-600";
    case "strong":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};
