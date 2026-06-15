import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages/Landing/LandingPage";
import { LoginPage } from "../pages/Login/LoginPage";
import { RegisterPage } from "../pages/Register/RegisterPage";
import { DashboardPage } from "../pages/Dashboard/DashboardPage";
import { GeneratorPage } from "../pages/Generator/GeneratorPage";
import { DraftsPage } from "../pages/Drafts/DraftsPage";
import { HistoryPage } from "../pages/History/HistoryPage";
import { AnalyticsPage } from "../pages/Analytics/AnalyticsPage";
import { ProfilePage } from "../pages/Profile/ProfilePage";
import { SettingsPage } from "../pages/Settings/SettingsPage";
import { SchedulePage } from "../pages/Schedule/SchedulePage";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/generator" element={<GeneratorPage />} />
    <Route path="/drafts" element={<DraftsPage />} />
    <Route path="/history" element={<HistoryPage />} />
    <Route path="/analytics" element={<AnalyticsPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="/schedule" element={<SchedulePage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);