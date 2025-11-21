// Profile service
// CRUD operations for user profiles

import { supabase } from "@/services/supabase/db";
import { logger } from "@/utils/logger";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  updated_at: string;
  created_at: string;
}

export interface ProfileUpdate {
  first_name?: string;
  last_name?: string;
  bio?: string;
  avatar_url?: string;
}

/**
 * Get current user's profile
 * @returns Profile data or null if not found
 */
export const getProfile = async (): Promise<Profile | null> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No authenticated user");
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      logger.error("Error fetching profile", error, { userId: user.id });
      return null;
    }

    return data;
  } catch (err) {
    logger.error("Error in getProfile", err);
    return null;
  }
};

/**
 * Update current user's profile
 * @param updates - Profile fields to update
 * @returns Updated profile or null if failed
 */
export const updateProfile = async (
  updates: ProfileUpdate,
): Promise<Profile | null> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No authenticated user");
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      logger.error("Error updating profile", error, { userId: user.id });
      return null;
    }

    return data;
  } catch (err) {
    logger.error("Error in updateProfile", err);
    return null;
  }
};

/**
 * Check if profile exists for current user
 * @returns true if profile exists, false otherwise
 */
export const profileExists = async (): Promise<boolean> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return false;

    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (error) return false;

    return !!data;
  } catch {
    return false;
  }
};
