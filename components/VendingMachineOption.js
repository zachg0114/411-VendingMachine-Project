import React from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";

export default function VendingMachineOption({ items, onAddToCart = () => {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {items && items.length > 0 ? (
        items.map(item => (
          <Card
            key={item.id}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-600 rounded-2xl shadow-lg text-white px-6 py-5"
            style={{ transition: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
          >
            <CardBody>
              <div className="flex flex-col items-start gap-2">
                <span className="font-bold text-xl">{item.name}</span>
                <span className="text-gray-300">Qty: {item.quantity}</span>
                <span className="text-yellow-400 font-semibold">${item.price}</span>
                <Button
                  className="mt-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 active:bg-yellow-500 focus:bg-yellow-500 transition-none"
                  color="default"
                  onClick={e => { e.preventDefault(); onAddToCart(item); }}
                  style={{ boxShadow: "none" }}
                  disableRipple
                >
                  Add to Cart
                </Button>
              </div>
            </CardBody>
          </Card>
        ))
      ) : (
        <div className="text-gray-400">No items available</div>
      )}
    </div>
  );
}
