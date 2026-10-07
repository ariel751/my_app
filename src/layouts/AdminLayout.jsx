import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-200 font-sans">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-black text-white tracking-wider flex items-center gap-2">
            <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/30">A</span>
            MyAdmin
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="block px-4 py-3 bg-indigo-600/10 text-indigo-400 rounded-xl font-semibold border border-indigo-500/20 transition-all">
            Dashboard Panel
          </Link>
          <Link to="/" className="block px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
            ← Kembali ke Toko
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          Admin Panel &copy; 2026
        </div>
      </aside>

      {/* Konten Utama Admin */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}