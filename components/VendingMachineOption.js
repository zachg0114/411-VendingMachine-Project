import React from "react";
import { Button } from "./ui/button"; // Use custom Button component
import { useToast } from "./ui/toast"; // Correct relative path

export default function VendingMachineOption({
  items,
  onAddToCart = () => {},
}) {
  const { showToast } = useToast(); // Access showToast function

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {items && items.length > 0 ? (
        items.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-600 rounded-2xl shadow-lg text-white px-6 py-5"
            style={{
              transition: "none",
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            }}
          >
            <div className="flex flex-col items-start gap-2">
              {item.img && (
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-2 border border-gray-700"
                />
              )}
              <span className="font-bold text-xl">{item.name}</span>
              <span className="text-gray-300">Qty: {item.quantity}</span>
              <span className="text-yellow-400 font-semibold">
                ${item.price}
              </span>
              <Button
                className="mt-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 active:bg-yellow-500 focus:bg-yellow-500 transition-none"
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart(item);
                  showToast(`${item.name} added to cart!`); // Show toast notification
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-400">No items available</div>
      )}
    </div>
  );
}
