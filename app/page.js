"use client";

import { useState, useEffect } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import ShoppingCart from "../components/ShoppingCart";
import VendingMachineOption from "../components/VendingMachineOption";
import { ToastProvider } from "../components/ui/toast";

export default function VendingMachine() {
  const { cart, addToCart, removeFromCart, clearCart, cartSummary } = useShoppingCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const drinksRes = await fetch("http://localhost:5000/api/drinks");
        const drinksData = await drinksRes.json();
        setDrinks(drinksData);

        const snacksRes = await fetch("http://localhost:5000/api/snacks");
        const snacksData = await snacksRes.json();
        setSnacks(snacksData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white p-6">
        <ShoppingCart
          cart={cart}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          cartSummary={cartSummary}
          handleRemoveFromCart={removeFromCart}
          handleClearCart={clearCart}
        />
        <div className="w-full max-w-4xl border border-gray-700 rounded-3xl shadow-2xl px-8 py-10 bg-gradient-to-br from-gray-800 to-black mt-20">
          <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">Vending Machine</h1>
          <h2 className="text-2xl font-bold mb-4 text-yellow-300">Drinks</h2>
          <VendingMachineOption
            items={drinks}
            onAddToCart={(item) => addToCart({ ...item, image: item.img })} // Pass image address correctly
          />
          <h2 className="text-2xl font-bold mt-8 mb-4 text-yellow-300">Snacks</h2>
          <VendingMachineOption
            items={snacks}
            onAddToCart={(item) => addToCart({ ...item, image: item.img })} // Pass image address correctly
          />
        </div>
      </div>
    </ToastProvider>
  );
}