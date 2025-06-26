import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrintPage from "./Pages/PrintPage";
import VanPhongPham from "./Pages/StationeryPage";
import MainMenu from "./Pages/MainPage";
import PrintCashierPage from "./Pages/PrintCashierPage";
import SupportServicePage from "./Pages/SupportServicePage";
import AdminLogin from "./Authen/AdminLogin";
import ProductAdminPage from "./Authen/ProductAdminPage";
import SearchPage from "./Pages/SearchPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/in-an" element={<PrintPage />} />
        <Route path="/van-phong-pham" element={<VanPhongPham />} />
        <Route path="/ban-may-moc" element={<PrintCashierPage />} />
        <Route path="/ho-tro-khach-hang" element={<SupportServicePage />} />
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/page" element={<ProductAdminPage/>}/>
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
