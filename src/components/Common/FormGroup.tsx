import React, { ReactNode } from 'react';

interface FormGroupProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function FormGroup({ label, children, className = '' }: FormGroupProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}