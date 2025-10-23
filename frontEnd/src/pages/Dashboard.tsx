// Dashboard page component
// Main dashboard view with animated tabs for Profile and Settings

import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { useTranslation } from "react-i18next";
import AnimatedTabs from "../components/AnimatedTabs";
import ProfileTab from "../components/dashboard/ProfileTab";
import SettingsTab from "../components/dashboard/SettingsTab";

export default function Dashboard() {
  const { user } = useAuth();
  const { loading } = useProfile();
  const { t } = useTranslation();

  // Get full name or fallback to email/Usuario
  const getGreeting = () => {
    if (user?.firstName && user?.lastName) {
      return t("dashboard.welcomeWithName", {
        name: `${user.firstName} ${user.lastName}`,
      });
    } else if (user?.firstName) {
      return t("dashboard.welcomeWithName", { name: user.firstName });
    } else if (user?.name) {
      return t("dashboard.hello", { name: user.name });
    }
    return t("dashboard.welcome");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Cargando perfil...</div>
      </div>
    );
  }

  // Define tabs
  const tabs = [
    {
      id: "profile",
      label: t("dashboard.tabs.profile"),
      content: <ProfileTab />,
    },
    {
      id: "settings",
      label: t("dashboard.tabs.settings"),
      content: <SettingsTab />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-6 p-6 pt-10">
      <h1 className="text-4xl font-bold text-gray-800">{getGreeting()}</h1>

      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">
          {t("dashboard.controlPanel")}
        </h2>

        <AnimatedTabs tabs={tabs} defaultTab="profile" />
      </div>
    </div>
  );
}
