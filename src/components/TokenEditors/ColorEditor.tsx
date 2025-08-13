import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { FormGroup } from '../Common/FormGroup';
import { SearchInput } from '../Common/SearchInput';
import { TokenItem } from '../Common/TokenItem';
import { hexToRgba, rgbToHsl, isValidColor, getContrastColor } from '../../utils/colorUtils';

interface ColorEditorProps {
  colors: Record<string, string>;
  onAddColor: (name: string, value: string) => void;
  onUpdateColor: (name: string, value: string) => void;
  onDeleteColor: (name: string) => void;
  onCopy: (value: string) => void;
}

const PRESET_COLORS = [
  '#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626',
  '#0891b2', '#7e22ce', '#059669', '#ea580c', '#e11d48',
  '#64748b', '#374151', '#111827', '#f3f4f6', '#ffffff'
];

const COLOR_MODES = [
  { id: 'hex', label: 'HEX' },
  { id: 'rgb', label: 'RGB' },
  { id: 'hsl', label: 'HSL' }
] as const;

type ColorMode = typeof COLOR_MODES[number]['id'];

export function ColorEditor({ colors, onAddColor, onUpdateColor, onDeleteColor, onCopy }: ColorEditorProps) {
  const [colorName, setColorName] = useState('');
  const [colorValue, setColorValue] = useState('#2563eb');
  const [colorMode, setColorMode] = useState<ColorMode>('hex');
  const [opacity, setOpacity] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingToken, setEditingToken] = useState<string | null>(null);

  const filteredColors = Object.keys(colors)
    .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  const updateColorValue = (hex: string, mode: ColorMode, opacity: number) => {
    const rgb = { r: 0, g: 0, b: 0 };
    if (hex.startsWith('#')) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (result) {
        rgb.r = parseInt(result[1], 16);
        rgb.g = parseInt(result[2], 16);
        rgb.b = parseInt(result[3], 16);
      }
    }

    switch (mode) {
      case 'rgb':
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(opacity / 100).toFixed(2)})`;
      case 'hsl':
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      case 'hex':
      default:
        return hex;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!colorName.trim() || !colorValue.trim()) {
      return;
    }
    
    if (!isValidColor(colorValue)) {
      return;
    }

    const finalValue = updateColorValue(colorValue, colorMode, opacity);
    
    if (editingToken) {
      onUpdateColor(editingToken, finalValue);
      setEditingToken(null);
    } else {
      onAddColor(colorName, finalValue);
    }
    
    setColorName('');
    setOpacity(100);
  };

  const handleEdit = (name: string) => {
    setEditingToken(name);
    setColorName(name);
    const value = colors[name];
    
    if (value.startsWith('rgba')) {
      const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        const a = match[4] ? parseFloat(match[4]) : 1;
        
        const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        setColorValue(hex);
        setOpacity(Math.round(a * 100));
        setColorMode('rgb');
      }
    } else if (value.startsWith('#')) {
      setColorValue(value);
      setOpacity(100);
      setColorMode('hex');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormGroup label="Color Name">
          <input
            type="text"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            placeholder="primary, success, etc."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          />
        </FormGroup>

        <FormGroup label="Color Mode">
          <div className="flex gap-2">
            {COLOR_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setColorMode(mode.id)}
                className={`
                  flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200
                  ${colorMode === mode.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </FormGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Color Value">
            <div className="relative">
              <input
                type="text"
                value={updateColorValue(colorValue, colorMode, opacity)}
                onChange={(e) => setColorValue(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
              <div 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: colorValue }}
              />
            </div>
          </FormGroup>

          <FormGroup label="Color Picker">
            <input
              type="color"
              value={colorValue}
              onChange={(e) => setColorValue(e.target.value)}
              className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
            />
          </FormGroup>
        </div>

        <FormGroup label={`Opacity: ${opacity}%`}>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </FormGroup>

        <FormGroup label="Preset Colors">
          <div className="grid grid-cols-8 gap-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setColorValue(color)}
                className={`
                  w-8 h-8 rounded-lg border-2 transition-transform duration-200 hover:scale-110
                  ${colorValue === color ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-300'}
                `}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </FormGroup>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {editingToken ? 'Update Color Token' : 'Add Color Token'}
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Tokens</h3>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search colors..."
        />
        
        <div className="space-y-2">
          {filteredColors.map((name) => (
            <TokenItem
              key={name}
              name={name}
              value={colors[name]}
              category="colors"
              onEdit={handleEdit}
              onDelete={onDeleteColor}
              onCopy={onCopy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}