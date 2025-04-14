"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [drinks, setDrinks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [comboA, setComboA] = useState(null);
  const [comboB, setComboB] = useState(null);
  const [comboResult, setComboResult] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/drinks') // Use full backend URL for dev
      .then(res => res.json())
      .then(setDrinks)
      .catch(() => setDrinks([]));
  }, []);

  const handleBuy = async (drinkId) => {
    const res = await fetch('http://localhost:5000/api/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drinkId }),
    });
    const data = await res.json();
    alert(data.message);
  };

  const handleCombo = async () => {
    if (!comboA || !comboB) return;

    const res = await fetch('http://localhost:5000/api/combo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drinkA: comboA, drinkB: comboB }),
    });
    const data = await res.json();
    setComboResult(data.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl border-8 border-gray-700 rounded-3xl shadow-2xl p-6 bg-gradient-to-br from-gray-800 to-black">
        <h1 className="text-4xl text-center font-bold mb-8 text-yellow-400">PepsiCo Smart Vending Machine</h1>

        {/* Drink Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4 bg-black bg-opacity-50 rounded-xl">
          {drinks.map(drink => (
            <div
              key={drink._id}
              className="bg-gray-900 hover:bg-gray-800 border border-yellow-500 rounded-lg p-4 cursor-pointer text-center shadow-lg transition"
              onClick={() => setSelected(drink)}
            >
              <img src={drink.image} alt={drink.name} className="w-full h-32 object-contain mb-2 rounded" />
              <h2 className="text-lg font-semibold text-yellow-300">{drink.name}</h2>
            </div>
          ))}
        </div>

        {/* Combo Recommender */}
        <div className="mt-10 p-6 bg-gray-950 border border-yellow-400 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-center text-yellow-300">Flavor Combo Recommender</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
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
            <p className="mt-4 text-green-400 text-center font-medium">{comboResult}</p>
          )}
        </div>
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