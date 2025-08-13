import React from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemoveToast: (id: string) => void;
}

export function ToastContainer({ toasts, onRemoveToast }: ToastContainerProps) {
  const getToastIcon = (type: ToastMessage['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getToastStyles = (type: ToastMessage['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-600 border-green-700';
      case 'error':
        return 'bg-red-600 border-red-700';
      case 'info':
        return 'bg-blue-600 border-blue-700';
      default:
        return 'bg-green-600 border-green-700';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg text-white shadow-lg border
            transform transition-all duration-300 ease-in-out
            ${getToastStyles(toast.type)}
            animate-in slide-in-from-right-full
          `}
        >
          {getToastIcon(toast.type)}
          <span className="font-medium">{toast.message}</span>
          <button
            onClick={() => onRemoveToast(toast.id)}
            className="ml-2 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}