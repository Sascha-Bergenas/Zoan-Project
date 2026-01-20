import "./App.css";
import Dashboard from "./pages/DashboardPage";
import { Routes, Route } from "react-router-dom";

//Använd export default för att exportera en komponent från en fil

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/ststass" element={<statsssss />} /> */}
    </Routes>
    </>
  );
}
