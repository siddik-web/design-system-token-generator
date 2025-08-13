import React from 'react';
import { Edit, Trash2, Copy } from 'lucide-react';
import { TokenCategory } from '../../types';

interface TokenItemProps {
  name: string;
  value: string;
  category: TokenCategory;
  onEdit: (name: string) => void;
  onDelete: (name: string) => void;
  onCopy: (value: string) => void;
}

export function TokenItem({ name, value, category, onEdit, onDelete, onCopy }: TokenItemProps) {
  const getTokenName = (category: TokenCategory, name: string): string => {
    switch (category) {
      case 'colors':
        return `--color-${name}`;
      case 'spacing':
        return `--spacing-${name}`;
      case 'typography':
        return `--font-size-${name}`;
      case 'fontFamilies':
        return `--font-family-${name}`;
      case 'radius':
        return `--radius-${name}`;
      case 'shadows':
        return `--shadow-${name}`;
      case 'transitions':
        return `--transition-${name}`;
      default:
        return `--${name}`;
    }
  };

  return (
    <div className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-gray-300 transition-all duration-200">
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-900 text-sm truncate">
          {getTokenName(category, name)}
        </div>
        <div className="text-xs text-gray-500 font-mono mt-1 truncate">
          {value}
        </div>
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onCopy(value)}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
          title="Copy value"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(name)}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
          title="Edit token"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(name)}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200"
          title="Delete token"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}