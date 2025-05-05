"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import VendingMachineOption from './VendingMachineOption';
import { ShoppingCart } from "lucide-react"; 

export default function VendingMachine({ initialDrinks }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);

  const cartSummary = cart.reduce((acc, item) => {
    const found = acc.find(i => i.id === item.id);
    if (found) {
      found.count += 1;
    } else {
      acc.push({ ...item, count: 1 });
    }
    return acc;
  }, []);

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

  const handleAddToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  const handleCartIconClick = () => {
    setCartOpen(open => !open);
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === id);
      if (idx !== -1) {
        const newCart = [...prev];
        newCart.splice(idx, 1);
        return newCart;
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div
        className="fixed top-6 right-8 z-50 flex items-center"
        ref={cartRef}
        style={{ minWidth: 56 }}
      >
        <button
          className="relative flex items-center justify-center text-4xl bg-yellow-400 border-4 border-yellow-600 rounded-full p-3 shadow-lg hover:bg-yellow-300 transition-colors"
          onClick={handleCartIconClick}
          aria-label="View cart"
          style={{ color: "#222" }}
        >
          <span role="img" aria-label="cart">🛒</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs font-bold border-2 border-white">
              {cart.length}
            </span>
          )}
        </button>
        {cartOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200 font-bold flex justify-between items-center">
              Cart
              <Button size="sm" color="danger" variant="light" onClick={() => setCart([])}>
                Clear
              </Button>
            </div>
            <div className="p-4 max-h-60 overflow-y-auto">
              {cartSummary.length === 0 ? (
                <div className="text-gray-500">Your cart is empty.</div>
              ) : (
                cartSummary.map((item, idx) => (
                  <div key={item.id} className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="ml-2 text-xs text-gray-500">x{item.count}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">${(item.price * item.count).toFixed(2)}</span>
                      <Button
                        size="sm"
                        color="danger"
                        variant="light"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        &times;
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <Card className="w-full max-w-4xl border border-gray-700 rounded-3xl shadow-2xl px-8 py-10 bg-gradient-to-br from-gray-800 to-black mt-20">
        <CardHeader className="flex justify-center mb-4">
          <h1 className="text-4xl font-bold text-yellow-400">Vending Machine</h1>
        </CardHeader>
        <CardBody>
          <VendingMachineOption
            items={initialDrinks}
            onAddToCart={handleAddToCart}
          />
        </CardBody>
      </Card>
    </div>
  );
}
