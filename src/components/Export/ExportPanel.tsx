import React, { useState, useEffect } from 'react';
import { Copy, Download, RotateCcw } from 'lucide-react';
import { DesignTokens, ExportFormat } from '../../types';
import { generateCSS, generateSCSS, generateJSON, generateFigmaTokens, downloadFile } from '../../utils/exportUtils';
import { FormGroup } from '../Common/FormGroup';

interface ExportPanelProps {
  tokens: DesignTokens;
  onImportTokens: (tokens: Partial<DesignTokens>) => void;
  onResetTokens: () => void;
  onCopy: (value: string) => void;
}

const EXPORT_FORMATS = [
  { value: 'css' as const, label: 'CSS Variables' },
  { value: 'scss' as const, label: 'SCSS Variables' },
  { value: 'json' as const, label: 'JSON' },
  { value: 'figma' as const, label: 'Figma Tokens' }
];

export function ExportPanel({ tokens, onImportTokens, onResetTokens, onCopy }: ExportPanelProps) {
  const [exportFormat, setExportFormat] = useState<ExportFormat>('css');
  const [exportContent, setExportContent] = useState('');
  const [importContent, setImportContent] = useState('');

  useEffect(() => {
    let content = '';
    switch (exportFormat) {
      case 'css':
        content = generateCSS(tokens);
        break;
      case 'scss':
        content = generateSCSS(tokens);
        break;
      case 'json':
        content = generateJSON(tokens);
        break;
      case 'figma':
        content = generateFigmaTokens(tokens);
        break;
    }
    setExportContent(content);
  }, [tokens, exportFormat]);

  const handleImport = () => {
    try {
      const importedTokens = JSON.parse(importContent);
      onImportTokens(importedTokens);
      setImportContent('');
      onCopy('Tokens imported successfully!');
    } catch (error) {
      onCopy('Invalid JSON format. Please check your input.');
    }
  };

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(exportContent);
      onCopy('Copied to clipboard!');
    } catch (error) {
      onCopy('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    downloadFile(exportContent, 'design-tokens', exportFormat);
    onCopy('File downloaded successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all tokens to default values?')) {
      onResetTokens();
      onCopy('Tokens reset to defaults');
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Export Tokens</h3>
        <FormGroup label="" className="mb-0">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            {EXPORT_FORMATS.map((format) => (
              <option key={format.value} value={format.value}>
                {format.label}
              </option>
            ))}
          </select>
        </FormGroup>
      </div>

      <div className="space-y-4">
        <textarea
          value={exportContent}
          readOnly
          className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopyContent}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Copy className="w-5 h-5" />
            Copy to Clipboard
          </button>
          
          <button
            onClick={handleDownload}
            className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download File
          </button>
          
          <button
            onClick={handleReset}
            className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset All
          </button>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Import Tokens</h4>
        
        <div className="space-y-4">
          <FormGroup label="JSON Tokens">
            <textarea
              value={importContent}
              onChange={(e) => setImportContent(e.target.value)}
              placeholder="Paste your tokens JSON here..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </FormGroup>
          
          <div className="flex gap-3">
            <button
              onClick={handleImport}
              disabled={!importContent.trim()}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <i className="fas fa-upload" />
              Import Tokens
            </button>
            
            <button
              onClick={() => setImportContent(generateJSON(tokens))}
              className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <i className="fas fa-code" />
              Load Current
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}