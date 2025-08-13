import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FormGroup } from '../Common/FormGroup';
import { SearchInput } from '../Common/SearchInput';
import { TokenItem } from '../Common/TokenItem';

interface TypographyEditorProps {
  typography: Record<string, string>;
  fontFamilies: Record<string, string>;
  onAddTypography: (name: string, value: string) => void;
  onUpdateTypography: (name: string, value: string) => void;
  onDeleteTypography: (name: string) => void;
  onAddFontFamily: (name: string, value: string) => void;
  onUpdateFontFamily: (name: string, value: string) => void;
  onDeleteFontFamily: (name: string) => void;
  onCopy: (value: string) => void;
}

const FONT_UNITS = [
  { value: 'rem', label: 'rem' },
  { value: 'em', label: 'em' },
  { value: 'px', label: 'px' }
];

const PRESET_FONTS = [
  { value: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", label: 'Inter' },
  { value: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif", label: 'Roboto' },
  { value: "'JetBrains Mono', 'Fira Code', monospace", label: 'JetBrains Mono' },
  { value: "Georgia, 'Times New Roman', serif", label: 'Georgia' },
  { value: "Custom", label: 'Custom...' }
];

export function TypographyEditor({ 
  typography, 
  fontFamilies, 
  onAddTypography, 
  onUpdateTypography, 
  onDeleteTypography,
  onAddFontFamily,
  onUpdateFontFamily,
  onDeleteFontFamily,
  onCopy 
}: TypographyEditorProps) {
  const [fontName, setFontName] = useState('');
  const [fontValue, setFontValue] = useState('1');
  const [fontUnit, setFontUnit] = useState('rem');
  const [selectedFontFamily, setSelectedFontFamily] = useState(PRESET_FONTS[0].value);
  const [customFontFamily, setCustomFontFamily] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingToken, setEditingToken] = useState<string | null>(null);
  const [editingFontFamily, setEditingFontFamily] = useState<string | null>(null);

  const filteredTypography = Object.keys(typography)
    .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  const filteredFontFamilies = Object.keys(fontFamilies)
    .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  const handleFontSizeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fontName.trim() || !fontValue.trim()) {
      return;
    }

    const finalValue = `${fontValue}${fontUnit}`;
    
    if (editingToken) {
      onUpdateTypography(editingToken, finalValue);
      setEditingToken(null);
    } else {
      onAddTypography(fontName, finalValue);
    }
    
    setFontName('');
    setFontValue('1');
  };

  const handleFontFamilySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const familyValue = selectedFontFamily === 'Custom' ? customFontFamily : selectedFontFamily;
    
    if (!familyValue.trim()) {
      return;
    }

    const familyName = `font-${Date.now().toString().slice(-4)}`;
    onAddFontFamily(familyName, familyValue);
    
    setSelectedFontFamily(PRESET_FONTS[0].value);
    setCustomFontFamily('');
  };

  const handleEdit = (name: string) => {
    if (name in typography) {
      setEditingToken(name);
      setFontName(name);
      
      const value = typography[name];
      const match = value.match(/([\d.]+)(\w+)/);
      if (match) {
        setFontValue(match[1]);
        setFontUnit(match[2]);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Font Size Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Font Sizes</h3>
        
        <form onSubmit={handleFontSizeSubmit} className="space-y-6">
          <FormGroup label="Font Size Name">
            <input
              type="text"
              value={fontName}
              onChange={(e) => setFontName(e.target.value)}
              placeholder="xs, s, m, l, xl"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </FormGroup>

          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="Value">
              <input
                type="number"
                value={fontValue}
                onChange={(e) => setFontValue(e.target.value)}
                step="0.125"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
            </FormGroup>

            <FormGroup label="Unit">
              <select
                value={fontUnit}
                onChange={(e) => setFontUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {FONT_UNITS.map((unit) => (
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
            {editingToken ? 'Update Font Size' : 'Add Font Size'}
          </button>
        </form>
      </div>

      {/* Font Family Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Font Families</h3>
        
        <form onSubmit={handleFontFamilySubmit} className="space-y-6">
          <FormGroup label="Font Family">
            <select
              value={selectedFontFamily}
              onChange={(e) => setSelectedFontFamily(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              {PRESET_FONTS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </FormGroup>

          {selectedFontFamily === 'Custom' && (
            <FormGroup label="Custom Font Family">
              <input
                type="text"
                value={customFontFamily}
                onChange={(e) => setCustomFontFamily(e.target.value)}
                placeholder="'Your Font', sans-serif"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
            </FormGroup>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Font Family
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography Tokens</h3>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search typography..."
        />
        
        <div className="space-y-4">
          {/* Font Sizes */}
          {filteredTypography.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Font Sizes</h4>
              <div className="space-y-2">
                {filteredTypography.map((name) => (
                  <TokenItem
                    key={name}
                    name={name}
                    value={typography[name]}
                    category="typography"
                    onEdit={handleEdit}
                    onDelete={onDeleteTypography}
                    onCopy={onCopy}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Font Families */}
          {filteredFontFamilies.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Font Families</h4>
              <div className="space-y-2">
                {filteredFontFamilies.map((name) => (
                  <TokenItem
                    key={name}
                    name={name}
                    value={fontFamilies[name]}
                    category="fontFamilies"
                    onEdit={() => {}}
                    onDelete={onDeleteFontFamily}
                    onCopy={onCopy}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}