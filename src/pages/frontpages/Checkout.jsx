import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../utils/CartContext";

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl text-center space-y-4">
        <div className="w-16 h-16 bg-green-500/20 border border-green-500/40 text-green-400 rounded-full flex items-center justify-center mx-auto text-3xl">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-white">Pesanan Berhasil Dibuat!</h2>
        <p className="text-slate-400 text-sm">Terima kasih telah berbelanja di MyShop. Pesanan Anda sedang diproses oleh sistem.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all shadow-lg"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Formulir Checkout Pesanan</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Nama Lengkap</label>
          <input
            type="text"
            required
            placeholder="Masukkan nama lengkap Anda..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Alamat Pengiriman</label>
          <textarea
            required
            rows="3"
            placeholder="Masukkan alamat lengkap pengiriman..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Metode Pembayaran</label>
          <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <option value="transfer">Transfer Bank (BCA / Mandiri / BNI)</option>
            <option value="ewallet">E-Wallet (GoPay / OVO / DANA)</option>
            <option value="cod">Bayar di Tempat (COD)</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98]"
        >
          Place Order (Bayar Sekarang)
        </button>
      </form>
    </div>
  );
}