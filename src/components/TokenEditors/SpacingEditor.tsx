import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FormGroup } from '../Common/FormGroup';
import { SearchInput } from '../Common/SearchInput';
import { TokenItem } from '../Common/TokenItem';

interface SpacingEditorProps {
  spacing: Record<string, string>;
  onAddSpacing: (name: string, value: string) => void;
  onUpdateSpacing: (name: string, value: string) => void;
  onDeleteSpacing: (name: string) => void;
  onCopy: (value: string) => void;
}

const SPACING_UNITS = [
  { value: 'rem', label: 'rem' },
  { value: 'em', label: 'em' },
  { value: 'px', label: 'px' }
];

export function SpacingEditor({ spacing, onAddSpacing, onUpdateSpacing, onDeleteSpacing, onCopy }: SpacingEditorProps) {
  const [spacingName, setSpacingName] = useState('');
  const [spacingValue, setSpacingValue] = useState('1');
  const [spacingUnit, setSpacingUnit] = useState('rem');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingToken, setEditingToken] = useState<string | null>(null);

  const filteredSpacing = Object.keys(spacing)
    .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!spacingName.trim() || !spacingValue.trim()) {
      return;
    }

    const finalValue = `${spacingValue}${spacingUnit}`;
    
    if (editingToken) {
      onUpdateSpacing(editingToken, finalValue);
      setEditingToken(null);
    } else {
      onAddSpacing(spacingName, finalValue);
    }
    
    setSpacingName('');
    setSpacingValue('1');
  };

  const handleEdit = (name: string) => {
    setEditingToken(name);
    setSpacingName(name);
    
    const value = spacing[name];
    const match = value.match(/([\d.]+)(\w+)/);
    if (match) {
      setSpacingValue(match[1]);
      setSpacingUnit(match[2]);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormGroup label="Spacing Name">
          <input
            type="text"
            value={spacingName}
            onChange={(e) => setSpacingName(e.target.value)}
            placeholder="xs, s, m, l, xl"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          />
        </FormGroup>

        <div className="grid grid-cols-2 gap-4">
          <FormGroup label="Value">
            <input
              type="number"
              value={spacingValue}
              onChange={(e) => setSpacingValue(e.target.value)}
              step="0.25"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </FormGroup>

          <FormGroup label="Unit">
            <select
              value={spacingUnit}
              onChange={(e) => setSpacingUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              {SPACING_UNITS.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </FormGroup>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {editingToken ? 'Update Spacing Token' : 'Add Spacing Token'}
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Spacing Tokens</h3>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search spacing..."
        />
        
        <div className="space-y-2">
          {filteredSpacing.map((name) => (
            <TokenItem
              key={name}
              name={name}
              value={spacing[name]}
              category="spacing"
              onEdit={handleEdit}
              onDelete={onDeleteSpacing}
              onCopy={onCopy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}