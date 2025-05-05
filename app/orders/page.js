"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [toast, setToast] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${orderNumber}`);
      if (!response.ok) {
        throw new Error("Invalid Order Number");
      }
      const data = await response.json();
      setOrderDetails(data);
      setToast(null);
    } catch (error) {
      setOrderDetails(null);
      setToast({
        message: "Failed to retrieve order. Your Order Number was invalid.",
        type: "error",
      });
    }
  };

  const handleCancelOrder = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${orderDetails.orderId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }
      setOrderDetails(null);
      setToast({
        message: "Order successfully canceled.",
        type: "success",
      });
    } catch (error) {
      setToast({
        message: "Failed to cancel order. Please try again.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <button
        className="absolute top-4 left-4 text-yellow-400 font-bold hover:underline"
        onClick={() => router.push("/")}
      >
        &larr; Back to Home
      </button>
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Orders</h1>
      <div className="flex items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter Order Number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-white"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Search
        </button>
      </div>
      {toast && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center justify-between ${
            toast.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-4 text-lg font-bold"
          >
            &times;
          </button>
        </div>
      )}
      {orderDetails ? (
        <div className="w-full max-w-4xl border border-gray-700 rounded-3xl shadow-2xl px-8 py-10 bg-gradient-to-br from-gray-800 to-black">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Order Details</h2>
          <div className="p-4">
            {orderDetails.items.map((item) => (
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
                    <span className="ml-2 text-xs text-gray-500">x{item.quantity}</span>
                  </div>
                </div>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 mt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-bold text-lg">${orderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg text-yellow-600">${orderDetails.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Date:</span>
              <span className="text-gray-400">{new Date(orderDetails.date).toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={handleCancelOrder}
            className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-400 transition-colors"
          >
            Cancel Order
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Enter an order number to retrieve details.</p>
      )}
    </div>
  );
}
