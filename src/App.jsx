import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./utils/CartContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Front Pages
import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";

// Admin Pages
import AdminDashboard from "./pages/adminpages/AdminDashboard";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Rute untuk Halaman Toko Depan */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* Rute untuk Halaman Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}