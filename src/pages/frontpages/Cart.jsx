import { useCart } from "../../utils/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-12 text-center bg-slate-800 rounded-2xl border border-slate-700 shadow-xl max-w-2xl mx-auto my-12">
        <h2 className="text-2xl font-bold text-white mb-2">Keranjang Belanja Kosong</h2>
        <p className="text-slate-400 mb-6">Belum ada produk yang ditambahkan ke keranjang.</p>
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold text-white">Keranjang Belanja Anda</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-slate-800 border border-slate-700 p-5 rounded-2xl shadow-md gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-slate-900 border border-slate-700" />
              <div>
                <h2 className="font-bold text-white text-lg">{item.name}</h2>
                <p className="text-blue-400 font-semibold">Rp {item.price.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <input
                type="number"
                value={item.qty}
                min="1"
                className="w-16 bg-slate-900 border border-slate-700 rounded-lg text-center text-white py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 1)}
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-600 hover:text-white font-medium text-sm transition-all"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ringkasan Total */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-slate-400 text-sm">Total Pembayaran:</p>
          <p className="text-2xl font-extrabold text-white">Rp {totalPrice.toLocaleString()}</p>
        </div>
        <Link
          to="/checkout"
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 shadow-lg shadow-blue-600/30 text-center transition-all"
        >
          Lanjut ke Checkout →
        </Link>
      </div>
    </div>
  );
}