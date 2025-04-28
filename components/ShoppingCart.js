import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
import { Button } from "./ui/button";
import { useRouter } from "next/navigation"; // Import Next.js router

export default function ShoppingCart({
  cart,
  cartOpen,
  setCartOpen,
  cartSummary,
  handleRemoveFromCart,
  handleClearCart,
}) {
  const cartRef = useRef(null);
  const router = useRouter(); // Initialize router

  // Close cart dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    }
    if (cartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen]);

  // Calculate total count (each item counts as 1)
  const totalCount = cart.length;

  return (
    <div
      className="fixed top-8 right-8 z-50 flex items-center" // Adjusted top value to `top-8`
      ref={cartRef}
      style={{ minWidth: 56 }}
    >
      <button
        className="relative flex items-center justify-center text-4xl bg-yellow-400 border-4 border-yellow-600 rounded-full p-3 shadow-lg hover:bg-yellow-300 transition-colors"
        onClick={() => setCartOpen((open) => !open)}
        aria-label="View cart"
        style={{ color: "#222" }}
      >
        <span role="img" aria-label="cart">
          🛒
        </span>
        <AnimatePresence>
          {totalCount > 0 && (
            <motion.span
              key={totalCount}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full px-2 text-xs font-bold border-2 border-white"
            >
              {totalCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
      {cartOpen && (
        <div
          className="absolute right-0 mt-4 w-80 bg-white text-black rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
          style={{ top: 0, maxHeight: "calc(100vh - 32px)", marginTop: "0.5rem" }}
        >
          <div className="p-4 border-b border-gray-200 font-bold flex justify-between items-center bg-yellow-100">
            <span>Shopping Cart</span>
            <Button
              size="sm"
              color="destructive"
              onClick={handleClearCart}
              disabled={cartSummary.length === 0}
            >
              Clear
            </Button>
          </div>
          <div className="p-4 max-h-72 overflow-y-auto">
            {cartSummary.length === 0 ? (
              <div className="text-gray-500 text-center py-8">Your cart is empty.</div>
            ) : (
              cartSummary.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-4 border-b pb-2 last:border-b-0 last:pb-0"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="ml-2 text-xs text-gray-500">x{item.count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">${(item.price * item.count).toFixed(2)}</span>
                    <Button
                      size="sm"
                      color="destructive"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      &times;
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t border-gray-200 bg-yellow-50 flex justify-between">
            <Button
              size="sm"
              onClick={() => router.push("/orders")} // Navigate to the Orders page
            >
              Retrieve Previous Order
            </Button>
            <Button
              color="primary"
              className="w-full font-bold"
              disabled={cartSummary.length === 0}
              onClick={() => router.push("/checkout")} // Navigate to the checkout page
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
