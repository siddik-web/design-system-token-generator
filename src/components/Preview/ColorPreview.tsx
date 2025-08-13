import React from 'react';
import { Copy } from 'lucide-react';
import { getContrastColor } from '../../utils/colorUtils';

interface ColorPreviewProps {
  colors: Record<string, string>;
  onCopy: (value: string) => void;
}

export function ColorPreview({ colors, onCopy }: ColorPreviewProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Object.entries(colors).map(([name, value]) => (
        <div
          key={name}
          className="relative group rounded-lg overflow-hidden aspect-square cursor-pointer hover:scale-105 transition-transform duration-200"
          style={{ backgroundColor: value }}
          onClick={() => onCopy(value)}
        >
          <div className={`absolute inset-0 p-3 flex flex-col justify-between ${getContrastColor(value) === 'light' ? 'text-white' : 'text-gray-900'}`}>
            <div className="font-semibold text-sm capitalize">
              {name.replace('-', ' ')}
            </div>
            <div className="text-xs opacity-80 font-mono">
              {value}
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(value);
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-30"
          >
            <Copy className="w-3 h-3 text-white" />
          </button>
        </div>
      ))}
    </div>
  );
}