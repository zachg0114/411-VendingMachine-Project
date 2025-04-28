"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartSummary, clearCart } = useShoppingCart();
  const [toast, setToast] = useState(null); // State for toast notifications

  const subtotal = cartSummary.reduce((sum, item) => sum + item.price * item.count, 0);
  const salesTax = subtotal * 0.05;
  const total = subtotal + salesTax;
  const totalItems = cartSummary.reduce((sum, item) => sum + item.count, 0);

  const handlePlaceOrder = async () => {
    if (cartSummary.length === 0) {
      setToast({
        message: "Please add items to the cart before attempting to check out.",
        type: "error", // Red toast notification
      });
      return;
    }

    try {
      // Prepare the order data
      const orderData = {
        subtotal,
        total,
        items: cartSummary.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.count,
          price: item.price,
          image: item.image, // Include image link
        })),
        date: new Date().toISOString(),
      };

      // Save the order to the backend
      const saveResponse = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save the order");
      }

      const savedOrder = await saveResponse.json();
      clearCart();

      // Display success toast with the order number
      setToast({
        message: `Order placed successfully! Your Order Number is ${savedOrder.orderId}.`,
        type: "success", // Green toast notification
      });
    } catch (error) {
      console.error("Error placing order:", error);
      setToast({
        message: "Failed to place the order. Please try again.",
        type: "error", // Red toast notification
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <button
        className="absolute top-4 left-4 text-yellow-400 font-bold hover:underline"
        onClick={() => router.push("/")}
      >
        &larr; Back to Home
      </button>
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Checkout</h1>
      <div className="w-full max-w-4xl border border-gray-700 rounded-3xl shadow-2xl px-8 py-10 bg-gradient-to-br from-gray-800 to-black mt-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-yellow-400">Order Summary</h2>
          <span className="text-sm text-gray-400">Total Items: {totalItems}</span>
        </div>
        <div className="p-4">
          {cartSummary.length === 0 ? (
            <div className="text-red-500 text-center py-8 font-bold">
              Please add items to the cart before attempting to check out.
            </div>
          ) : (
            cartSummary.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4 border-b pb-2 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
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
        <button
          className="w-full mt-4 bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
      {toast && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
            toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
