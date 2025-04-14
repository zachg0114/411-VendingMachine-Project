import { useEffect, useState } from 'react';

export default function Home() {
  const [drinks, setDrinks] = useState([]);
  const [selected, setSelected] = useState(null);

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

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">PepsiCo Digital Vending Machine</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {drinks.map(drink => (
          <div
            key={drink._id}
            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700"
            onClick={() => setSelected(drink)}
          >
            <img src={drink.image} alt={drink.name} className="w-full h-32 object-cover" />
            <h2 className="text-lg mt-2">{drink.name}</h2>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-2">{selected.name}</h2>
            <p>{selected.description}</p>
            <p className="mt-2">Price: ${selected.price.toFixed(2)}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleBuy(selected._id)}
            >
              Purchase
            </button>
            <button
              className="mt-2 block text-sm text-gray-500"
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
