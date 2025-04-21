"use client";

import { useState } from 'react';
import VendingMachineOption from './VendingMachineOption';

export default function VendingMachine({ initialDrinks }) {
  const [selected, setSelected] = useState(null);

  const handleBuy = async (drinkId) => {
    const res = await fetch('http://localhost:5000/api/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drinkId }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl border-8 border-yellow-500 rounded-3xl shadow-2xl p-6 bg-gradient-to-br from-gray-800 to-black transform scale-105">
        <h1 className="text-4xl text-center font-bold mb-8 text-yellow-400">Vending Machine</h1>

        {/* Vending Machine Grid */}
        <VendingMachineOption drinks={initialDrinks} onSelect={setSelected} />
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
            <p>{selected.description}</p>
            <p className="mt-2 font-semibold">Price: ${selected.price.toFixed(2)}</p>
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={() => handleBuy(selected._id)}
            >
              Purchase
            </button>
            <button
              className="mt-3 block text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
