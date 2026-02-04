import "./App.css";
import { Routes, Route } from "react-router-dom";
import History from "./pages/HistoryPage";
import Dashboard from "./pages/dashboard/DashboardPage";
import Header from "./components/layout/Header";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { useEffect } from "react";

export default function App() {
  const { theme } = useContext(ThemeContext);

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
      </Routes>
    </>
  );
}
