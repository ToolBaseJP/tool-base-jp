import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ToolsPage from "./pages/ToolsPage";
import OthelloPage from "./pages/OthelloPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/othello" element={<OthelloPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}