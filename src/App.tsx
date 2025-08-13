import React, { useState } from 'react';
import { Palette, Ruler as Rulers, Type, Square, Droplets, Clock } from 'lucide-react';
import { Header } from './components/Layout/Header';
import { TabNavigation } from './components/Layout/TabNavigation';
import { ColorEditor } from './components/TokenEditors/ColorEditor';
import { SpacingEditor } from './components/TokenEditors/SpacingEditor';
import { TypographyEditor } from './components/TokenEditors/TypographyEditor';
import { RadiusEditor } from './components/TokenEditors/RadiusEditor';
import { ShadowEditor } from './components/TokenEditors/ShadowEditor';
import { TransitionEditor } from './components/TokenEditors/TransitionEditor';
import { ColorPreview } from './components/Preview/ColorPreview';
import { SpacingPreview } from './components/Preview/SpacingPreview';
import { TypographyPreview } from './components/Preview/TypographyPreview';
import { ComponentPreview } from './components/Preview/ComponentPreview';
import { ExportPanel } from './components/Export/ExportPanel';
import { ToastContainer } from './components/Toast/ToastContainer';
import { useTokens } from './hooks/useTokens';
import { useToast } from './hooks/useToast';
import { TokenCategory, TokenTab, PreviewTab } from './types';

const TOKEN_TABS: TokenTab[] = [
  { id: 'colors', label: 'Colors', icon: 'fa-palette' },
  { id: 'spacing', label: 'Spacing', icon: 'fa-arrows-alt-h' },
  { id: 'typography', label: 'Typography', icon: 'fa-font' },
  { id: 'radius', label: 'Radius', icon: 'fa-border-all' },
  { id: 'shadows', label: 'Shadows', icon: 'fa-copy' },
  { id: 'transitions', label: 'Transitions', icon: 'fa-history' }
];

const PREVIEW_TABS: PreviewTab[] = [
  { id: 'all', label: 'Overview', icon: 'fa-th-large' },
  { id: 'colors', label: 'Colors', icon: 'fa-palette' },
  { id: 'typography', label: 'Typography', icon: 'fa-font' },
  { id: 'components', label: 'Components', icon: 'fa-puzzle-piece' }
];

function App() {
  const [activeTab, setActiveTab] = useState<TokenCategory>('colors');
  const [activePreviewTab, setActivePreviewTab] = useState('all');
  const { tokens, addToken, removeToken, updateToken, importTokens, resetTokens } = useTokens();
  const { toasts, showToast, removeToast } = useToast();

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast('Copied to clipboard!', 'success');
    } catch (error) {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const renderTokenEditor = () => {
    switch (activeTab) {
      case 'colors':
        return (
          <ColorEditor
            colors={tokens.colors}
            onAddColor={(name, value) => addToken('colors', name, value)}
            onUpdateColor={(name, value) => updateToken('colors', name, value)}
            onDeleteColor={(name) => removeToken('colors', name)}
            onCopy={handleCopy}
          />
        );
      case 'spacing':
        return (
          <SpacingEditor
            spacing={tokens.spacing}
            onAddSpacing={(name, value) => addToken('spacing', name, value)}
            onUpdateSpacing={(name, value) => updateToken('spacing', name, value)}
            onDeleteSpacing={(name) => removeToken('spacing', name)}
            onCopy={handleCopy}
          />
        );
      case 'typography':
        return (
          <TypographyEditor
            typography={tokens.typography}
            fontFamilies={tokens.fontFamilies}
            onAddTypography={(name, value) => addToken('typography', name, value)}
            onUpdateTypography={(name, value) => updateToken('typography', name, value)}
            onDeleteTypography={(name) => removeToken('typography', name)}
            onAddFontFamily={(name, value) => addToken('fontFamilies', name, value)}
            onUpdateFontFamily={(name, value) => updateToken('fontFamilies', name, value)}
            onDeleteFontFamily={(name) => removeToken('fontFamilies', name)}
            onCopy={handleCopy}
          />
        );
      case 'radius':
        return (
          <RadiusEditor
            radius={tokens.radius}
            onAddRadius={(name, value) => addToken('radius', name, value)}
            onUpdateRadius={(name, value) => updateToken('radius', name, value)}
            onDeleteRadius={(name) => removeToken('radius', name)}
            onCopy={handleCopy}
          />
        );
      case 'shadows':
        return (
          <ShadowEditor
            shadows={tokens.shadows}
            onAddShadow={(name, value) => addToken('shadows', name, value)}
            onUpdateShadow={(name, value) => updateToken('shadows', name, value)}
            onDeleteShadow={(name) => removeToken('shadows', name)}
            onCopy={handleCopy}
          />
        );
      case 'transitions':
        return (
          <TransitionEditor
            transitions={tokens.transitions}
            onAddTransition={(name, value) => addToken('transitions', name, value)}
            onUpdateTransition={(name, value) => updateToken('transitions', name, value)}
            onDeleteTransition={(name) => removeToken('transitions', name)}
            onCopy={handleCopy}
          />
        );
      default:
        return null;
    }
  };

  const renderPreview = () => {
    switch (activePreviewTab) {
      case 'colors':
        return <ColorPreview colors={tokens.colors} onCopy={handleCopy} />;
      case 'typography':
        return <TypographyPreview typography={tokens.typography} fontFamilies={tokens.fontFamilies} />;
      case 'components':
        return <ComponentPreview tokens={tokens} />;
      case 'all':
      default:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-600" />
                  Color Palette
                </h3>
                <ColorPreview colors={tokens.colors} onCopy={handleCopy} />
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Rulers className="w-5 h-5 text-blue-600" />
                  Spacing Scale
                </h3>
                <SpacingPreview spacing={tokens.spacing} />
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Type className="w-5 h-5 text-blue-600" />
                  Typography Scale
                </h3>
                <TypographyPreview typography={tokens.typography} fontFamilies={tokens.fontFamilies} />
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Square className="w-5 h-5 text-blue-600" />
                  Interactive Components
                </h3>
                <ComponentPreview tokens={tokens} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        <Header />
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="xl:col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <TabNavigation
                tabs={TOKEN_TABS}
                activeTab={activeTab}
                onTabChange={(tabId) => setActiveTab(tabId as TokenCategory)}
              />
            </div>
            
            <div className="p-6 max-h-[calc(100vh-100px)] overflow-y-auto">
              {renderTokenEditor()}
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-8 space-y-8">
            {/* Preview Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
                </div>
                
                <div className="flex gap-2 overflow-x-auto">
                  {PREVIEW_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActivePreviewTab(tab.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200
                        ${activePreviewTab === tab.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                        }
                      `}
                    >
                      <i className={`fas ${tab.icon}`} />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                {renderPreview()}
              </div>
            </div>

            {/* Export Panel */}
            <ExportPanel
              tokens={tokens}
              onImportTokens={importTokens}
              onResetTokens={resetTokens}
              onCopy={showToast}
            />
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}

export default App;