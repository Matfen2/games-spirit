import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListGames from "./pages/ListGames";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#0a0914] text-gray-100 font-heading">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<ListGames />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}