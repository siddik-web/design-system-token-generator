import React from 'react';

interface SpacingPreviewProps {
  spacing: Record<string, string>;
}

export function SpacingPreview({ spacing }: SpacingPreviewProps) {
  const sortedSpacing = Object.entries(spacing)
    .sort(([, a], [, b]) => parseFloat(a) - parseFloat(b));

  return (
    <div className="space-y-6">
      <div className="flex items-end gap-2 p-6 bg-gray-50 rounded-lg overflow-x-auto">
        {sortedSpacing.map(([name, value]) => (
          <div key={name} className="flex flex-col items-center">
            <div
              className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 cursor-pointer rounded-sm flex items-center justify-center text-white text-xs font-semibold"
              style={{ 
                width: value, 
                height: value,
                minWidth: '20px',
                minHeight: '20px'
              }}
              title={`${name}: ${value}`}
            >
              {name}
            </div>
            <div className="text-xs text-gray-600 mt-2 text-center">
              <div className="font-medium">{name}</div>
              <div className="font-mono">{value}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {sortedSpacing.map(([name, value]) => (
          <div key={name} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-900">{name}</span>
              <span className="text-sm font-mono text-gray-600">{value}</span>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <div 
                className="bg-blue-500 rounded"
                style={{ height: '20px', width: value }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}