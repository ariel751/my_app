import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Simpan data keranjang (sekaligus menyimpan ke Local Storage agar tidak hilang saat di-refresh)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // State untuk mengontrol notifikasi Toast
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fungsi untuk memunculkan notifikasi selama 3 detik
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
    
    // Panggil notifikasi melayang saat tombol diklik
    showToast(`${product.name} berhasil ditambahkan!`);
  };

  const updateQty = (id, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart }}>
      {children}

      {/* UI Notifikasi Melayang (Toast Alert) */}
      {toast && (
        <div className="fixed bottom-10 right-10 z-[100] animate-bounce">
          <div className="bg-slate-800/95 backdrop-blur-md border border-emerald-500/50 text-emerald-400 px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-500/20 flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-full font-bold">
              ✓
            </div>
            <p className="text-sm font-semibold">{toast}</p>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}