import { useState, useCallback } from 'react';
import { DesignTokens, TokenCategory } from '../types';

const DEFAULT_TOKENS: DesignTokens = {
  colors: {
    'primary': '#2563eb',
    'secondary': '#7c3aed',
    'success': '#059669',
    'warning': '#d97706',
    'danger': '#dc2626',
    'gray-50': '#f9fafb',
    'gray-100': '#f3f4f6',
    'gray-200': '#e5e7eb',
    'gray-300': '#d1d5db',
    'gray-400': '#9ca3af',
    'gray-500': '#6b7280',
    'gray-600': '#4b5563',
    'gray-700': '#374151',
    'gray-800': '#1f2937',
    'gray-900': '#111827'
  },
  spacing: {
    'xs': '0.25rem',
    's': '0.5rem',
    'm': '1rem',
    'l': '1.5rem',
    'xl': '2rem',
    '2xl': '3rem'
  },
  typography: {
    'xs': '0.75rem',
    's': '0.875rem',
    'm': '1rem',
    'l': '1.125rem',
    'xl': '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem'
  },
  fontFamilies: {
    'primary': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'monospace': "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
  },
  radius: {
    'none': '0px',
    'xs': '2px',
    's': '4px',
    'm': '8px',
    'l': '12px',
    'xl': '16px',
    '2xl': '24px'
  },
  shadows: {
    'xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
    's': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    'm': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    'l': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    'xl': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)'
  },
  transitions: {
    'fast': 'all 150ms ease-in-out',
    'normal': 'all 300ms ease-in-out',
    'slow': 'all 500ms ease-in-out'
  }
};

export function useTokens() {
  const [tokens, setTokens] = useState<DesignTokens>(DEFAULT_TOKENS);

  const addToken = useCallback((category: TokenCategory, name: string, value: string) => {
    setTokens(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: value
      }
    }));
  }, []);

  const removeToken = useCallback((category: TokenCategory, name: string) => {
    setTokens(prev => {
      const newTokens = { ...prev };
      delete newTokens[category][name];
      return newTokens;
    });
  }, []);

  const updateToken = useCallback((category: TokenCategory, name: string, value: string) => {
    setTokens(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: value
      }
    }));
  }, []);

  const importTokens = useCallback((importedTokens: Partial<DesignTokens>) => {
    setTokens(prev => {
      const newTokens = { ...prev };
      Object.keys(importedTokens).forEach(category => {
        if (category in newTokens) {
          newTokens[category as TokenCategory] = {
            ...newTokens[category as TokenCategory],
            ...importedTokens[category as TokenCategory]
          };
        }
      });
      return newTokens;
    });
  }, []);

  const resetTokens = useCallback(() => {
    setTokens(DEFAULT_TOKENS);
  }, []);

  return {
    tokens,
    addToken,
    removeToken,
    updateToken,
    importTokens,
    resetTokens
  };
}