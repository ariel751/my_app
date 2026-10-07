import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Gambar Produk dengan Efek Zoom Halus */}
        <div className="relative overflow-hidden h-52 bg-slate-900">
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
          <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700 text-blue-400 text-xs px-3 py-1 rounded-full font-semibold shadow-md">
            {p.category_name}
          </span>
        </div>

        {/* Informasi Produk */}
        <div className="p-5">
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-yellow-400 text-sm">
              {[...Array(p.rating || 5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <span className="text-slate-400 text-xs ml-1 font-medium">({p.rating || 5}.0)</span>
          </div>

          <h2 className="font-bold text-white text-lg mb-1.5 line-clamp-1 group-hover:text-blue-400 transition-colors">
            {p.name}
          </h2>
          <p className="text-blue-400 font-extrabold text-lg mb-3">
            Rp {p.price.toLocaleString()}
          </p>
          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
            {p.description || "Produk pilihan berkualitas tinggi siap melengkapi gaya hidup modern Anda."}
          </p>
        </div>
      </div>

      {/* Tombol Aksi dengan Efek Interaktif */}
      <div className="p-5 pt-0 flex items-center gap-3">
        <Link
          to={`/product/${p.slug}`}
          state={p}
          className="flex-1 text-center py-2.5 px-3 border border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500 rounded-xl text-sm font-semibold transition-all"
        >
          Detail
        </Link>
        <button
          onClick={() => addToCart(p)}
          className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all active:scale-95"
        >
          + Keranjang
        </button>
      </div>
    </div>
  );
}