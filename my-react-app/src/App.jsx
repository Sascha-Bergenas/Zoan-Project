import "./App.css";
import { Routes, Route } from "react-router-dom";
import History from "./pages/HistoryPage";
import Dashboard from "./pages/dashboard/DashboardPage";
import Header from "./components/layout/Header";
import StatusPanel from "./components/Features/status/StatusPanel";

//Använd export default för att exportera en komponent från en fil

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <StatusPanel />
    </>
  );
}
