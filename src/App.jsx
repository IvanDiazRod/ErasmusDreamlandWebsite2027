import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import AboutUs from "./components/sections/Aboutus";
import BuyTickets from "./components/sections/BuyTickets";
import Gallery from "./components/sections/Gallery";
import Festivals from "./components/sections/Festivals";
import WhatsAppSection from "./components/sections/WhatsAppSection";
import ScrollToTop from "./data/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main className="pt-20 bg-gray-950">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/tickets" element={<BuyTickets />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/festivals" element={<Festivals/>} />
        <Route path="/WhatsAppSection" element={<WhatsAppSection/>} />
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App