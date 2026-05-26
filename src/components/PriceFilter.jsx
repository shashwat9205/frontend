import { useState } from 'react';
import { Slider } from "./ui/slider";

export default function PriceFilter({ min, max, onPriceChange }) {
  const [range, setRange] = useState([min, max]);

  const handleValueChange = (newRange) => {
    setRange(newRange);
  };

  const handleCommit = (newRange) => {
    onPriceChange(newRange);
  };

  // Helper to format currency in Indian style (₹)
  const formatINR = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0, // Removes the .00 at the end for a cleaner look
    }).format(price);
  };

  return (
    <div className="w-full bg-gray-50/50 p-4 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-black uppercase tracking-widest text-gray-500">Price Range</span>
        <span className="text-xs font-bold text-black">
          {formatINR(range[0])} - {formatINR(range[1])}
        </span>
      </div>
      
      <Slider
        min={min}
        max={max}
        step={100} // Changed to 100 for smoother filtering of supplement prices
        value={range}
        onValueChange={handleValueChange}
        onValueCommit={handleCommit}
        className="cursor-pointer"
      />
    </div>
  );
}