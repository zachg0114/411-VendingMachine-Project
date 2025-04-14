"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [drinks, setDrinks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [comboA, setComboA] = useState(null);
  const [comboB, setComboB] = useState(null);
  const [comboResult, setComboResult] = useState(null);

  useEffect(() => {
    fetch('/api/drinks')
      .then(res => res.json())
      .then(setDrinks);
  }, []);

  const handleBuy = async (drinkId) => {
    const res = await fetch('/api/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drinkId }),
    });
    const data = await res.json();
    alert(data.message);
  };

  const handleCombo = async () => {
    if (!comboA || !comboB) return;

    const res = await fetch('/api/combo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drinkA: comboA, drinkB: comboB }),
    });
    const data = await res.json();
    setComboResult(data.message);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-8 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">PepsiCo Digital Vending Machine</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {drinks.map(drink => (
          <div
            key={drink._id}
            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 shadow-md transition"
            onClick={() => setSelected(drink)}
          >
            <img src={drink.image} alt={drink.name} className="w-full h-40 object-contain rounded" />
            <h2 className="text-xl mt-3 font-semibold">{drink.name}</h2>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white text-black p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
            <p>{selected.description}</p>
            <p className="mt-2">Price: ${selected.price.toFixed(2)}</p>
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              onClick={() => handleBuy(selected._id)}
            >
              Purchase
            </button>
            <button
              className="mt-2 block text-sm text-gray-600 hover:text-gray-800"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mt-16 p-6 bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Flavor Combo Recommender</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <select
            className="bg-white text-black p-2 rounded outline-none"
            value={comboA || ''}
            onChange={(e) => setComboA(e.target.value)}
          >
            <option value="" disabled>Select First Drink</option>
            {drinks.map(drink => (
              <option key={drink._id} value={drink.name}>{drink.name}</option>
            ))}
          </select>

          <select
            className="bg-white text-black p-2 rounded outline-none"
            value={comboB || ''}
            onChange={(e) => setComboB(e.target.value)}
          >
            <option value="" disabled>Select Second Drink</option>
            {drinks.map(drink => (
              <option key={drink._id} value={drink.name}>{drink.name}</option>
            ))}
          </select>

          <button
            onClick={handleCombo}
            className="bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded text-black font-bold transition"
          >
            Recommend Combo
          </button>
        </div>
        {comboResult && (
          <p className="mt-4 text-green-400 font-medium">{comboResult}</p>
        )}
      </div>
    </div>
  );
}
