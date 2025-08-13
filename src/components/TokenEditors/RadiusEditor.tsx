import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FormGroup } from '../Common/FormGroup';
import { SearchInput } from '../Common/SearchInput';
import { TokenItem } from '../Common/TokenItem';

interface RadiusEditorProps {
  radius: Record<string, string>;
  onAddRadius: (name: string, value: string) => void;
  onUpdateRadius: (name: string, value: string) => void;
  onDeleteRadius: (name: string) => void;
  onCopy: (value: string) => void;
}

export function RadiusEditor({ radius, onAddRadius, onUpdateRadius, onDeleteRadius, onCopy }: RadiusEditorProps) {
  const [radiusName, setRadiusName] = useState('');
  const [radiusValue, setRadiusValue] = useState('4');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingToken, setEditingToken] = useState<string | null>(null);

  const filteredRadius = Object.keys(radius)
    .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!radiusName.trim() || !radiusValue.trim()) {
      return;
    }

    const finalValue = `${radiusValue}px`;
    
    if (editingToken) {
      onUpdateRadius(editingToken, finalValue);
      setEditingToken(null);
    } else {
      onAddRadius(radiusName, finalValue);
    }
    
    setRadiusName('');
    setRadiusValue('4');
  };

  const handleEdit = (name: string) => {
    setEditingToken(name);
    setRadiusName(name);
    setRadiusValue(radius[name].replace('px', ''));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormGroup label="Radius Name">
          <input
            type="text"
            value={radiusName}
            onChange={(e) => setRadiusName(e.target.value)}
            placeholder="none, xs, s, m, l, xl"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          />
        </FormGroup>

        <FormGroup label="Radius Value (px)">
          <input
            type="number"
            value={radiusValue}
            onChange={(e) => setRadiusValue(e.target.value)}
            min="0"
            step="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          />
        </FormGroup>

        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Preview:</div>
          <div 
            className="w-16 h-16 bg-blue-500 mx-auto"
            style={{ borderRadius: `${radiusValue}px` }}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {editingToken ? 'Update Radius Token' : 'Add Radius Token'}
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Radius Tokens</h3>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search radius..."
        />
        
        <div className="space-y-2">
          {filteredRadius.map((name) => (
            <TokenItem
              key={name}
              name={name}
              value={radius[name]}
              category="radius"
              onEdit={handleEdit}
              onDelete={onDeleteRadius}
              onCopy={onCopy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}