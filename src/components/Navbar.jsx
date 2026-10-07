import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const location = useLocation();
  // State untuk membuka/menutup menu di HP
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-white tracking-wider flex items-center gap-2">
          <span className="bg-blue-600 text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">M</span>
          MyShop
        </Link>

        {/* Tombol Hamburger (Hanya muncul di HP) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-slate-300 hover:text-white focus:outline-none"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Menu Navigasi (Responsif) */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } sm:flex absolute sm:static top-20 left-0 w-full sm:w-auto bg-slate-900 sm:bg-transparent flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-0 border-b border-slate-800 sm:border-none shadow-xl sm:shadow-none transition-all font-medium text-sm`}
        >
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`w-full sm:w-auto text-center px-4 py-2 rounded-xl transition-all ${
              isActive("/") ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className={`w-full sm:w-auto flex justify-center relative px-4 py-2 rounded-xl transition-all items-center gap-2 ${
              isActive("/cart") ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Keranjang
            {totalItems > 0 && (
              <span className="absolute -top-1.5 right-1/3 sm:-right-1.5 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg shadow-red-500/50 animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to="/checkout"
            onClick={() => setIsOpen(false)}
            className={`w-full sm:w-auto text-center px-4 py-2 rounded-xl transition-all ${
              isActive("/checkout") ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Checkout
          </Link>

          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className={`w-full sm:w-auto text-center px-4 py-2 rounded-xl border transition-all ${
              isActive("/admin")
                ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30"
                : "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Admin Area
          </Link>
        </div>
      </div>
    </nav>
  );
}