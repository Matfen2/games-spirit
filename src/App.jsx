import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import GamesPage from "./pages/GamesPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0914] text-gray-100 font-heading">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GamesPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}