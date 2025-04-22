"use client";

import { useState, useEffect } from 'react';
import VendingMachineOption from '../components/VendingMachineOption'; // Corrected import path

export default function VendingMachine() {
	const [drinks, setDrinks] = useState([]);
	const [snacks, setSnacks] = useState([]);
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch drinks
				const drinksRes = await fetch('http://localhost:5000/api/drinks');
				const drinksData = await drinksRes.json();
				setDrinks(drinksData);

				// Fetch snacks
				const snacksRes = await fetch('http://localhost:5000/api/snacks');
				const snacksData = await snacksRes.json();
				setSnacks(snacksData);
			} catch (err) {
				console.error('Failed to fetch data:', err);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6 flex flex-col items-center justify-center">
			<div className="w-full max-w-4xl border-8 border-yellow-500 rounded-3xl shadow-2xl p-6 bg-gradient-to-br from-gray-800 to-black transform scale-105">
				<h1 className="text-4xl text-center font-bold mb-8 text-yellow-400">Vending Machine</h1>

				{/* Drinks Section */}
				<h2 className="text-2xl font-bold mb-4 text-yellow-300">Drinks</h2>
				<VendingMachineOption drinks={drinks} onSelect={setSelected} />

				{/* Snacks Section */}
				<h2 className="text-2xl font-bold mt-8 mb-4 text-yellow-300">Snacks</h2>
				<VendingMachineOption drinks={snacks} onSelect={setSelected} />
			</div>

			{/* Modal */}
			{selected && (
				<div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
					<div className="bg-white text-black p-6 rounded-lg max-w-md w-full mx-4">
						<h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
						<p>{selected.description}</p>
						<p className="mt-2 font-semibold">Price: ${selected.price.toFixed(2)}</p>
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