import "./App.css";
import { Routes, Route } from "react-router-dom";
import History from "./pages/HistoryPage";
import Dashboard from "./pages/DashboardPage";


//Använd export default för att exportera en komponent från en fil

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
}
