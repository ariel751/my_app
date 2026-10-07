import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { products } from "../../utils/data";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Banner Promosi Modern */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-xl flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold mb-2">Koleksi Produk Eksklusif MyShop</h1>
          <p className="text-blue-100 max-w-xl text-sm md:text-base">
            Pusat belanja online terpercaya dengan pilihan produk elektronik, fashion, dan gaya hidup terlengkap dan berkualitas tinggi.
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20 text-center">
          <span className="block text-xs text-blue-200 uppercase tracking-wider font-semibold">Total Katalog</span>
          <span className="text-3xl font-bold">{products.length} Produk</span>
        </div>
      </div>

      {/* Filter & Pencarian dengan Tema Gelap */}
      <div className="bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Cari produk impianmu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {["All", "Electronics", "Fashion", "Lifestyle", "Accessories"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Produk */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Daftar Produk</h2>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-800 rounded-xl border border-slate-700 shadow-sm">
            <p className="text-slate-400 text-lg">Maaf, produk yang kamu cari tidak ditemukan.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} p={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}