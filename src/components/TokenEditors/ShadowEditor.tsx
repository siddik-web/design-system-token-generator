import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FormGroup } from '../Common/FormGroup';
import { SearchInput } from '../Common/SearchInput';
import { TokenItem } from '../Common/TokenItem';
import { hexToRgba } from '../../utils/colorUtils';

interface ShadowEditorProps {
  shadows: Record<string, string>;
  onAddShadow: (name: string, value: string) => void;
  onUpdateShadow: (name: string, value: string) => void;
  onDeleteShadow: (name: string) => void;
  onCopy: (value: string) => void;
}

export function ShadowEditor({ shadows, onAddShadow, onUpdateShadow, onDeleteShadow, onCopy }: ShadowEditorProps) {
  const [shadowName, setShadowName] = useState('');
  const [shadowX, setShadowX] = useState('0');
  const [shadowY, setShadowY] = useState('2');
  const [shadowBlur, setShadowBlur] = useState('4');
  const [shadowSpread, setShadowSpread] = useState('0');
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowOpacity, setShadowOpacity] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingToken, setEditingToken] = useState<string | null>(null);

  const filteredShadows = Object.keys(shadows)
    .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  const previewShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${hexToRgba(shadowColor, shadowOpacity / 100)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shadowName.trim()) {
      return;
    }

    const shadowValue = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${hexToRgba(shadowColor, shadowOpacity / 100)}`;
    
    if (editingToken) {
      onUpdateShadow(editingToken, shadowValue);
      setEditingToken(null);
    } else {
      onAddShadow(shadowName, shadowValue);
    }
    
    setShadowName('');
    setShadowX('0');
    setShadowY('2');
    setShadowBlur('4');
    setShadowSpread('0');
    setShadowOpacity(50);
  };

  const handleEdit = (name: string) => {
    setEditingToken(name);
    setShadowName(name);
    
    const value = shadows[name];
    const match = value.match(/(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(.+)/);
    if (match) {
      setShadowX(match[1]);
      setShadowY(match[2]);
      setShadowBlur(match[3]);
      setShadowSpread(match[4]);
      
      const colorValue = match[5];
      if (colorValue.startsWith('rgba')) {
        const rgbaMatch = colorValue.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (rgbaMatch) {
          const hex = '#' + ((1 << 24) + (parseInt(rgbaMatch[1]) << 16) + (parseInt(rgbaMatch[2]) << 8) + parseInt(rgbaMatch[3])).toString(16).slice(1);
          setShadowColor(hex);
          setShadowOpacity(Math.round(parseFloat(rgbaMatch[4] || '1') * 100));
        }
      } else if (colorValue.startsWith('#')) {
        setShadowColor(colorValue);
        setShadowOpacity(100);
      }
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormGroup label="Shadow Name">
          <input
            type="text"
            value={shadowName}
            onChange={(e) => setShadowName(e.target.value)}
            placeholder="xs, s, m, l, xl"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          />
        </FormGroup>

        <div className="grid grid-cols-2 gap-4">
          <FormGroup label="X Offset">
            <input
              type="number"
              value={shadowX}
              onChange={(e) => setShadowX(e.target.value)}
              step="0.5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </FormGroup>

          <FormGroup label="Y Offset">
            <input
              type="number"
              value={shadowY}
              onChange={(e) => setShadowY(e.target.value)}
              step="0.5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </FormGroup>

          <FormGroup label="Blur Radius">
            <input
              type="number"
              value={shadowBlur}
              onChange={(e) => setShadowBlur(e.target.value)}
              step="0.5"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </FormGroup>

          <FormGroup label="Spread Radius">
            <input
              type="number"
              value={shadowSpread}
              onChange={(e) => setShadowSpread(e.target.value)}
              step="0.5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </FormGroup>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormGroup label="Shadow Color">
            <div className="relative">
              <input
                type="text"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
            </div>
          </FormGroup>

          <FormGroup label={`Opacity: ${shadowOpacity}%`}>
            <input
              type="range"
              min="0"
              max="100"
              value={shadowOpacity}
              onChange={(e) => setShadowOpacity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </FormGroup>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Preview:</div>
          <div 
            className="w-24 h-24 bg-white mx-auto rounded-lg border border-gray-200"
            style={{ boxShadow: previewShadow }}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {editingToken ? 'Update Shadow Token' : 'Add Shadow Token'}
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shadow Tokens</h3>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search shadows..."
        />
        
        <div className="space-y-2">
          {filteredShadows.map((name) => (
            <TokenItem
              key={name}
              name={name}
              value={shadows[name]}
              category="shadows"
              onEdit={handleEdit}
              onDelete={onDeleteShadow}
              onCopy={onCopy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}