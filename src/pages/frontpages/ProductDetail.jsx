import { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import { products } from "../../utils/data";

export default function ProductDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();

  // Ambil data produk berdasarkan state router atau cari dari data.js menggunakan slug
  const productData = location.state || products.find((p) => p.slug === slug) || products[0];

  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState([
    { id: 1, name: "Budi Santoso", comment: "Barang sangat berkualitas, pengiriman cepat dan rapi!", rating: 5 },
    { id: 2, name: "Siti Rahma", comment: "Sesuai dengan deskripsi, puas banget belanja di sini.", rating: 5 }
  ]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(productData);
    }
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    const reviewObj = {
      id: Date.now(),
      name: "Pengunjung MyShop",
      comment: newReview,
      rating: Number(newRating)
    };
    setReviews([reviewObj, ...reviews]);
    setNewReview("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-4">
      {/* Tombol Kembali */}
      <div>
        <Link to="/" className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
          ← Kembali ke Beranda Katalog
        </Link>
      </div>

      {/* Notifikasi Berhasil Masuk Keranjang */}
      {successMessage && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-4 rounded-xl flex items-center justify-between shadow-lg">
          <span className="font-medium">Berhasil menambahkan {qty} produk ke keranjang belanja!</span>
          <Link to="/cart" className="underline font-bold text-sm">Lihat Keranjang →</Link>
        </div>
      )}

      {/* Bagian Utama Detail Produk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl">
        {/* Gambar Produk */}
        <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 h-[380px] flex items-center justify-center">
          <img src={productData.img} alt={productData.name} className="w-full h-full object-cover" />
        </div>

        {/* Informasi & Aksi Produk */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
              {productData.category_name || "Koleksi Eksklusif"}
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-3 mb-2">{productData.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(productData.rating || 5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-slate-400 text-sm">({productData.rating || 5}.0 Ulasan Pelanggan)</span>
            </div>

            <p className="text-3xl font-extrabold text-blue-400 mb-4">
              Rp {productData.price.toLocaleString()}
            </p>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {productData.description || "Produk pilihan berkualitas tinggi dirancang khusus untuk memenuhi standar kenyamanan dan gaya hidup modern Anda."}
            </p>

            <div className="text-xs text-slate-400 space-y-1 mb-6 bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
              <p>✔ Stok Tersedia: <span className="text-white font-semibold">{productData.stock || 20} Unit</span></p>
              <p>✔ Garansi Resmi Toko 100% Original</p>
              <p>✔ Layanan Pengiriman Cepat & Aman</p>
            </div>
          </div>

          {/* Kontrol Kuantitas & Tombol Beli */}
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-300">Jumlah:</span>
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-700 transition-colors font-bold"
                >
                  -
                </button>
                <span className="px-4 text-white font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-700 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98]"
              >
                + Masukkan ke Keranjang
              </button>
              <Link
                to="/cart"
                className="px-6 py-3.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl text-center transition-all"
              >
                Lihat Keranjang
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Ulasan / Review Pelanggan */}
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-xl font-bold text-white">Ulasan Pembeli ({reviews.length})</h2>

        {/* Daftar Ulasan */}
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-slate-900/60 border border-slate-700/60 p-4 rounded-xl space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white text-sm">{rev.name}</span>
                <div className="text-yellow-400 text-xs">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-slate-300 text-sm">{rev.comment}</p>
            </div>
          ))}
        </div>

        {/* Form Tambah Ulasan */}
        <form onSubmit={handleAddReview} className="space-y-4 pt-4 border-t border-slate-700">
          <h3 className="text-md font-semibold text-white">Tulis Ulasan Anda</h3>
          <div className="flex gap-4 items-center">
            <label className="text-sm text-slate-300">Rating:</label>
            <select
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none"
            >
              <option value="5">5 Bintang (Sangat Puas)</option>
              <option value="4">4 Bintang (Puas)</option>
              <option value="3">3 Bintang (Cukup)</option>
            </select>
          </div>
          <textarea
            rows="3"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Bagikan pengalaman Anda menggunakan produk ini..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          ></textarea>
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md"
          >
            Kirim Ulasan
          </button>
        </form>
      </div>
    </div>
  );
}