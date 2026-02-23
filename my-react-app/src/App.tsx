import "./App.css";
import { Routes, Route } from "react-router-dom";
import History from "./pages/history/HistoryPage";
import Dashboard from "./pages/dashboard/DashboardPage";
import Header from "./components/layout/Header";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { useEffect } from "react";
import SettingsPage from "./pages/settings/SettingsPage";

export default function App() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeContext must be used inside ThemeProvider");

  const { theme } = context;
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </>
  );
}
