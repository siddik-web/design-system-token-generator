import React from 'react';
import { Palette } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Design System Token Generator
        </h1>
      </div>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Create, manage, and export design tokens for your design system with real-time preview
      </p>
    </header>
  );
}