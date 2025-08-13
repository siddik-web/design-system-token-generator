import React from 'react';
import { TokenTab } from '../../types';

interface TabNavigationProps {
  tabs: TokenTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-3 font-semibold text-sm whitespace-nowrap
            border-b-2 transition-all duration-200 hover:text-blue-600
            ${activeTab === tab.id
              ? 'text-blue-600 border-blue-600 bg-blue-50'
              : 'text-gray-600 border-transparent hover:border-gray-300'
            }
          `}
        >
          <i className={`fas ${tab.icon} text-lg`} />
          {tab.label}
        </button>
      ))}
    </div>
  );
}