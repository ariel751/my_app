import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      {/* Menu Navigasi Atas */}
      <Navbar />
      
      {/* Konten Halaman (Dashboard, Cart, dll) akan dirender di dalam main ini */}
      <main className="flex-grow p-4 sm:p-8">
        <Outlet />
      </main>

      {/* Footer Portofolio Pribadi */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-8 text-center mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-slate-400 text-sm mb-2">
            &copy; 2026 MyShop E-Commerce. All rights reserved.
          </p>
          <p className="text-slate-300 text-sm font-medium tracking-wide">
            Designed & Built with React by <span className="text-blue-400 font-bold">Ariel Fadly Purba</span>
          </p>
        </div>
      </footer>
    </div>
  );
}