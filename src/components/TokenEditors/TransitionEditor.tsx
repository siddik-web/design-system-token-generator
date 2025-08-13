import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FormGroup } from '../Common/FormGroup';
import { SearchInput } from '../Common/SearchInput';
import { TokenItem } from '../Common/TokenItem';

interface TransitionEditorProps {
  transitions: Record<string, string>;
  onAddTransition: (name: string, value: string) => void;
  onUpdateTransition: (name: string, value: string) => void;
  onDeleteTransition: (name: string) => void;
  onCopy: (value: string) => void;
}

const TRANSITION_PROPERTIES = [
  { value: 'all', label: 'All Properties' },
  { value: 'opacity', label: 'Opacity' },
  { value: 'transform', label: 'Transform' },
  { value: 'background-color', label: 'Background Color' },
  { value: 'border-color', label: 'Border Color' },
  { value: 'color', label: 'Text Color' },
  { value: 'custom', label: 'Custom...' }
];

const TIMING_FUNCTIONS = [
  { value: 'ease', label: 'Ease' },
  { value: 'linear', label: 'Linear' },
  { value: 'ease-in', label: 'Ease In' },
  { value: 'ease-out', label: 'Ease Out' },
  { value: 'ease-in-out', label: 'Ease In Out' },
  { value: 'custom', label: 'Custom...' }
];

export function TransitionEditor({ transitions, onAddTransition, onUpdateTransition, onDeleteTransition, onCopy }: TransitionEditorProps) {
  const [transitionName, setTransitionName] = useState('');
  const [transitionProperty, setTransitionProperty] = useState('all');
  const [customProperty, setCustomProperty] = useState('');
  const [transitionDuration, setTransitionDuration] = useState('300');
  const [transitionTiming, setTransitionTiming] = useState('ease-in-out');
  const [customTiming, setCustomTiming] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingToken, setEditingToken] = useState<string | null>(null);

  const filteredTransitions = Object.keys(transitions)
    .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  const getTransitionValue = () => {
    const property = transitionProperty === 'custom' ? customProperty : transitionProperty;
    const timing = transitionTiming === 'custom' ? customTiming : transitionTiming;
    return `${property} ${transitionDuration}ms ${timing}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transitionName.trim()) {
      return;
    }

    if (transitionProperty === 'custom' && !customProperty.trim()) {
      return;
    }

    if (transitionTiming === 'custom' && !customTiming.trim()) {
      return;
    }

    const transitionValue = getTransitionValue();
    
    if (editingToken) {
      onUpdateTransition(editingToken, transitionValue);
      setEditingToken(null);
    } else {
      onAddTransition(transitionName, transitionValue);
    }
    
    setTransitionName('');
    setTransitionProperty('all');
    setCustomProperty('');
    setTransitionDuration('300');
    setTransitionTiming('ease-in-out');
    setCustomTiming('');
  };

  const handleEdit = (name: string) => {
    setEditingToken(name);
    setTransitionName(name);
    
    const value = transitions[name];
    const match = value.match(/(.+) ([\d.]+)ms (.+)/);
    if (match) {
      const property = match[1];
      const duration = match[2];
      const timing = match[3];
      
      if (TRANSITION_PROPERTIES.some(p => p.value === property)) {
        setTransitionProperty(property);
        setCustomProperty('');
      } else {
        setTransitionProperty('custom');
        setCustomProperty(property);
      }
      
      setTransitionDuration(duration);
      
      if (TIMING_FUNCTIONS.some(t => t.value === timing)) {
        setTransitionTiming(timing);
        setCustomTiming('');
      } else {
        setTransitionTiming('custom');
        setCustomTiming(timing);
      }
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormGroup label="Transition Name">
          <input
            type="text"
            value={transitionName}
            onChange={(e) => setTransitionName(e.target.value)}
            placeholder="fast, normal, slow"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          />
        </FormGroup>

        <FormGroup label="Property">
          <select
            value={transitionProperty}
            onChange={(e) => setTransitionProperty(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            {TRANSITION_PROPERTIES.map((prop) => (
              <option key={prop.value} value={prop.value}>
                {prop.label}
              </option>
            ))}
          </select>
          
          {transitionProperty === 'custom' && (
            <input
              type="text"
              value={customProperty}
              onChange={(e) => setCustomProperty(e.target.value)}
              placeholder="color, background-color"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 mt-2"
              required
            />
          )}
        </FormGroup>

        <div className="grid grid-cols-2 gap-4">
          <FormGroup label="Duration (ms)">
            <input
              type="number"
              value={transitionDuration}
              onChange={(e) => setTransitionDuration(e.target.value)}
              min="50"
              step="50"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </FormGroup>

          <FormGroup label="Timing Function">
            <select
              value={transitionTiming}
              onChange={(e) => setTransitionTiming(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              {TIMING_FUNCTIONS.map((timing) => (
                <option key={timing.value} value={timing.value}>
                  {timing.label}
                </option>
              ))}
            </select>
          </FormGroup>
        </div>

        {transitionTiming === 'custom' && (
          <FormGroup label="Custom Timing Function">
            <input
              type="text"
              value={customTiming}
              onChange={(e) => setCustomTiming(e.target.value)}
              placeholder="cubic-bezier(0.4, 0, 0.2, 1)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </FormGroup>
        )}

        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="text-sm text-gray-600 mb-4">Preview:</div>
          <div 
            className="w-24 h-24 bg-blue-500 mx-auto rounded-lg cursor-pointer hover:bg-blue-600"
            style={{ transition: getTransitionValue() }}
          />
          <div className="text-xs text-gray-500 text-center mt-2 font-mono">
            {getTransitionValue()}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {editingToken ? 'Update Transition Token' : 'Add Transition Token'}
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transition Tokens</h3>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search transitions..."
        />
        
        <div className="space-y-2">
          {filteredTransitions.map((name) => (
            <TokenItem
              key={name}
              name={name}
              value={transitions[name]}
              category="transitions"
              onEdit={handleEdit}
              onDelete={onDeleteTransition}
              onCopy={onCopy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}