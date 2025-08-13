import React from 'react';
import { DesignTokens } from '../../types';

interface ComponentPreviewProps {
  tokens: DesignTokens;
}

export function ComponentPreview({ tokens }: ComponentPreviewProps) {
  const primaryColor = tokens.colors.primary || '#2563eb';
  const successColor = tokens.colors.success || '#059669';
  const warningColor = tokens.colors.warning || '#d97706';
  const dangerColor = tokens.colors.danger || '#dc2626';
  const primarySpacing = tokens.spacing.m || '1rem';
  const borderRadius = tokens.radius.m || '8px';
  const boxShadow = tokens.shadows.m || '0 4px 6px rgba(0, 0, 0, 0.1)';
  const transition = tokens.transitions.normal || 'all 300ms ease-in-out';

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl border border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Interactive Components</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Buttons</h4>
              
              <button
                className="w-full text-white font-semibold hover:opacity-90 focus:ring-4 focus:ring-blue-200"
                style={{
                  backgroundColor: primaryColor,
                  padding: primarySpacing,
                  borderRadius: borderRadius,
                  transition: transition,
                  border: 'none'
                }}
              >
                Primary Button
              </button>
              
              <button
                className="w-full font-semibold hover:bg-opacity-10 focus:ring-4 focus:ring-blue-200"
                style={{
                  backgroundColor: 'transparent',
                  color: primaryColor,
                  padding: primarySpacing,
                  borderRadius: borderRadius,
                  border: `2px solid ${primaryColor}`,
                  transition: transition
                }}
              >
                Secondary Button
              </button>
              
              <div className="flex gap-2">
                <span
                  className="inline-block text-white text-sm font-medium"
                  style={{
                    backgroundColor: successColor,
                    padding: `${tokens.spacing.xs || '0.25rem'} ${tokens.spacing.s || '0.5rem'}`,
                    borderRadius: tokens.radius.xl || '16px'
                  }}
                >
                  Success
                </span>
                <span
                  className="inline-block text-white text-sm font-medium"
                  style={{
                    backgroundColor: warningColor,
                    padding: `${tokens.spacing.xs || '0.25rem'} ${tokens.spacing.s || '0.5rem'}`,
                    borderRadius: tokens.radius.xl || '16px'
                  }}
                >
                  Warning
                </span>
                <span
                  className="inline-block text-white text-sm font-medium"
                  style={{
                    backgroundColor: dangerColor,
                    padding: `${tokens.spacing.xs || '0.25rem'} ${tokens.spacing.s || '0.5rem'}`,
                    borderRadius: tokens.radius.xl || '16px'
                  }}
                >
                  Danger
                </span>
              </div>
            </div>

            {/* Form Elements */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Form Elements</h4>
              
              <input
                type="text"
                placeholder="Text input field"
                className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                style={{
                  padding: primarySpacing,
                  borderRadius: borderRadius,
                  transition: transition
                }}
              />
              
              <textarea
                placeholder="Textarea field"
                rows={3}
                className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none resize-none"
                style={{
                  padding: primarySpacing,
                  borderRadius: borderRadius,
                  transition: transition
                }}
              />
              
              <select
                className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                style={{
                  padding: primarySpacing,
                  borderRadius: borderRadius,
                  transition: transition
                }}
              >
                <option>Select an option</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>

            {/* Card Component */}
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Card Component</h4>
              
              <div
                className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300"
                style={{
                  padding: tokens.spacing.l || '1.5rem',
                  borderRadius: borderRadius,
                  boxShadow: boxShadow
                }}
              >
                <h5 className="text-xl font-bold text-gray-900 mb-3">Sample Card</h5>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  This card demonstrates how your design tokens work together to create consistent, 
                  beautiful UI components. The spacing, colors, shadows, and border radius all come 
                  from your token system.
                </p>
                
                <div className="flex gap-3">
                  <button
                    className="text-white font-medium hover:opacity-90"
                    style={{
                      backgroundColor: primaryColor,
                      padding: `${tokens.spacing.s || '0.5rem'} ${tokens.spacing.m || '1rem'}`,
                      borderRadius: tokens.radius.s || '4px',
                      transition: transition,
                      border: 'none'
                    }}
                  >
                    Action
                  </button>
                  <button
                    className="font-medium hover:bg-gray-50"
                    style={{
                      backgroundColor: 'transparent',
                      color: primaryColor,
                      padding: `${tokens.spacing.s || '0.5rem'} ${tokens.spacing.m || '1rem'}`,
                      borderRadius: tokens.radius.s || '4px',
                      border: `1px solid ${tokens.colors['gray-300'] || '#d1d5db'}`,
                      transition: transition
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}