import React from 'react';

interface TypographyPreviewProps {
  typography: Record<string, string>;
  fontFamilies: Record<string, string>;
}

export function TypographyPreview({ typography, fontFamilies }: TypographyPreviewProps) {
  const sortedTypography = Object.entries(typography)
    .sort(([, a], [, b]) => parseFloat(b) - parseFloat(a));

  const primaryFont = Object.values(fontFamilies)[0] || "'Inter', sans-serif";

  return (
    <div className="space-y-6">
      {sortedTypography.map(([name, value]) => (
        <div key={name} className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-900 capitalize">
              {name.replace('-', ' ')}
            </span>
            <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {value}
            </span>
          </div>
          
          <div 
            className="text-gray-800 leading-tight"
            style={{ 
              fontSize: value,
              fontFamily: primaryFont
            }}
          >
            The quick brown fox jumps over the lazy dog
          </div>
        </div>
      ))}
    </div>
  );
}