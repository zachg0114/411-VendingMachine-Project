import React from 'react';

const VendingMachineOption = ({ drinks, onSelect }) => {
  const skeletonArray = Array.from({ length: 12 }); // 4 items across, 3 rows

  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-black bg-opacity-50 rounded-xl border-4 border-gray-700">
      {drinks && drinks.length > 0
        ? drinks.map(drink => (
            <div
              key={drink._id}
              className="bg-gray-900 hover:bg-gray-800 border border-yellow-500 rounded-lg p-4 cursor-pointer text-center shadow-lg transition"
              onClick={() => onSelect(drink)}
            >
              <img src={drink.image} alt={drink.name} className="w-full h-32 object-contain mb-2 rounded" />
              <h2 className="text-lg font-semibold text-yellow-300">{drink.name}</h2>
              <p className="text-sm text-gray-400">${drink.price.toFixed(2)}</p>
            </div>
          ))
        : skeletonArray.map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center shadow-lg animate-pulse"
            >
              <div className="w-full h-32 bg-gray-700 mb-2 rounded"></div>
              <div className="h-4 bg-gray-700 mb-2 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
            </div>
          ))}
    </div>
  );
};

export default VendingMachineOption;
