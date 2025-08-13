export interface DesignTokens {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, string>;
  fontFamilies: Record<string, string>;
  radius: Record<string, string>;
  shadows: Record<string, string>;
  transitions: Record<string, string>;
}

export type TokenCategory = keyof DesignTokens;

export interface ColorMode {
  mode: 'hex' | 'rgb' | 'hsl';
  opacity: number;
}

export interface ShadowToken {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
}

export interface TransitionToken {
  property: string;
  duration: number;
  timing: string;
}

export type ExportFormat = 'css' | 'scss' | 'json' | 'figma';

export interface PreviewTab {
  id: string;
  label: string;
  icon: string;
}

export interface TokenTab {
  id: TokenCategory;
  label: string;
  icon: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}