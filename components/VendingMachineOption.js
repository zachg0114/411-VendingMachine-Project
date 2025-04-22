import React from 'react';

const VendingMachineOption = ({ items, onSelect }) => {
  const skeletonArray = Array.from({ length: 12 }); // 4 items across, 3 rows

  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-black bg-opacity-50 rounded-xl border-4 border-gray-700">
      {items && items.length > 0
        ? items.map(item => (
            <div
              key={item._id}
              className="bg-gray-900 hover:bg-gray-800 border border-yellow-500 rounded-lg p-4 cursor-pointer text-center shadow-lg transition"
              onClick={() => onSelect(item)}
            >
              <img src={item.image} alt={item.name} className="w-full h-32 object-contain mb-2 rounded" />
              <h2 className="text-lg font-semibold text-yellow-300">{item.name}</h2>
              <p className="text-sm text-gray-400">{item.description}</p>
              <p className="text-sm text-yellow-400">Price: ${item.price.toFixed(2)}</p>
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
