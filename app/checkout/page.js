"use client";

import { useRouter } from "next/navigation";
import { useShoppingCart } from "../../context/ShoppingCartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartSummary } = useShoppingCart();

  const subtotal = cartSummary.reduce((sum, item) => sum + item.price * item.count, 0);
  const salesTax = subtotal * 0.05;
  const total = subtotal + salesTax;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <button
        className="absolute top-4 left-4 text-yellow-400 font-bold hover:underline"
        onClick={() => router.push("/")}
      >
        &larr; Back to Home
      </button>
      <div className="w-full max-w-4xl border border-gray-700 rounded-3xl shadow-2xl px-8 py-10 bg-gradient-to-br from-gray-800 to-black mt-20">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">Checkout</h1>
        <div className="p-4 max-h-72 overflow-y-auto">
          {cartSummary.length === 0 ? (
            <div className="text-gray-500 text-center py-8">Your cart is empty.</div>
          ) : (
            cartSummary.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4 border-b pb-2 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center">
                  <img
                    src={item.image} // Display the image address correctly
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="ml-2 text-xs text-gray-500">x{item.count}</span>
                  </div>
                </div>
                <span className="font-semibold">${(item.price * item.count).toFixed(2)}</span>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-gray-200 mt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold">Subtotal:</span>
            <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold">Sales Tax (5%):</span>
            <span className="font-bold text-lg">${salesTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-xl text-yellow-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
