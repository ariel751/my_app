export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard Admin</h2>
        <p className="text-slate-400">Selamat datang di panel kontrol pengelola MyShop.</p>
      </div>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
          <h3 className="text-slate-400 font-medium mb-2">Total Pendapatan</h3>
          <p className="text-3xl font-extrabold text-white">Rp 12.500.000</p>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
          <h3 className="text-slate-400 font-medium mb-2">Total Pesanan</h3>
          <p className="text-3xl font-extrabold text-blue-400">
            45 <span className="text-sm font-normal text-slate-500">pesanan bulan ini</span>
          </p>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
          <h3 className="text-slate-400 font-medium mb-2">Produk Aktif</h3>
          <p className="text-3xl font-extrabold text-emerald-400">
            16 <span className="text-sm font-normal text-slate-500">item di katalog</span>
          </p>
        </div>
      </div>

      {/* Tabel Pesanan Terbaru */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-white">Pesanan Terbaru</h3>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">Lihat Semua</button>
        </div>
        <div className="p-10 text-center text-slate-500">
          <div className="text-4xl mb-3">🗂️</div>
          <p>Belum ada data pesanan riil.</p>
          <p className="text-sm mt-1">Data akan muncul setelah dihubungkan dengan Database Backend (Laravel/MySQL) pada modul praktikum selanjutnya.</p>
        </div>
      </div>
    </div>
  );
}