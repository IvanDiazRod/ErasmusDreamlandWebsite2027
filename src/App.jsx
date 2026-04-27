import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Login from "./pages/login";
import Register from "./pages/register";
import Destination from "./pages/destination";
import DestinationDetail from "./pages/DestinationDetails";
import Tours from "./pages/Tours";
import UserProfile from "./pages/UserProfile";
import TourDetail from "./pages/TourDetail";
import GroupsPage from "./pages/GroupsPage";
import CityGroups from "./pages/CityGroups";
import ScrollToTop from "./layout/ScrollToTop";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Header />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />      
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />
        <Route path="/Tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetail />} />
        <Route path="UserProfile" element={<UserProfile />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:city" element={<CityGroups />} />
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;