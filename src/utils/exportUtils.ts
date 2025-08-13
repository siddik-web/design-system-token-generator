import { DesignTokens, ExportFormat } from '../types';

export function generateCSS(tokens: DesignTokens): string {
  let css = ':root {\n';
  
  // Add colors
  Object.keys(tokens.colors).sort().forEach(name => {
    css += `  --color-${name}: ${tokens.colors[name]};\n`;
  });
  
  // Add spacing
  Object.keys(tokens.spacing).sort().forEach(name => {
    css += `  --spacing-${name}: ${tokens.spacing[name]};\n`;
  });
  
  // Add typography
  Object.keys(tokens.typography).sort().forEach(name => {
    css += `  --font-size-${name}: ${tokens.typography[name]};\n`;
  });
  
  // Add font families
  Object.keys(tokens.fontFamilies).sort().forEach(name => {
    css += `  --font-family-${name}: ${tokens.fontFamilies[name]};\n`;
  });
  
  // Add radius
  Object.keys(tokens.radius).sort().forEach(name => {
    css += `  --radius-${name}: ${tokens.radius[name]};\n`;
  });
  
  // Add shadows
  Object.keys(tokens.shadows).sort().forEach(name => {
    css += `  --shadow-${name}: ${tokens.shadows[name]};\n`;
  });
  
  // Add transitions
  Object.keys(tokens.transitions).sort().forEach(name => {
    css += `  --transition-${name}: ${tokens.transitions[name]};\n`;
  });
  
  css += '}';
  return css;
}

export function generateSCSS(tokens: DesignTokens): string {
  let scss = '';
  
  // Add colors
  Object.keys(tokens.colors).sort().forEach(name => {
    scss += `$color-${name}: ${tokens.colors[name]};\n`;
  });
  
  scss += '\n';
  
  // Add spacing
  Object.keys(tokens.spacing).sort().forEach(name => {
    scss += `$spacing-${name}: ${tokens.spacing[name]};\n`;
  });
  
  scss += '\n';
  
  // Add typography
  Object.keys(tokens.typography).sort().forEach(name => {
    scss += `$font-size-${name}: ${tokens.typography[name]};\n`;
  });
  
  scss += '\n';
  
  // Add font families
  Object.keys(tokens.fontFamilies).sort().forEach(name => {
    scss += `$font-family-${name}: ${tokens.fontFamilies[name]};\n`;
  });
  
  scss += '\n';
  
  // Add radius
  Object.keys(tokens.radius).sort().forEach(name => {
    scss += `$radius-${name}: ${tokens.radius[name]};\n`;
  });
  
  scss += '\n';
  
  // Add shadows
  Object.keys(tokens.shadows).sort().forEach(name => {
    scss += `$shadow-${name}: ${tokens.shadows[name]};\n`;
  });
  
  scss += '\n';
  
  // Add transitions
  Object.keys(tokens.transitions).sort().forEach(name => {
    scss += `$transition-${name}: ${tokens.transitions[name]};\n`;
  });
  
  return scss;
}

export function generateJSON(tokens: DesignTokens): string {
  return JSON.stringify(tokens, null, 2);
}

export function generateFigmaTokens(tokens: DesignTokens): string {
  const figmaTokens: Record<string, any> = {};
  
  for (const [category, tokenObj] of Object.entries(tokens)) {
    figmaTokens[category] = {};
    
    for (const [name, value] of Object.entries(tokenObj)) {
      figmaTokens[category][name] = {
        value: value,
        type: getCategoryType(category)
      };
    }
  }
  
  return JSON.stringify(figmaTokens, null, 2);
}

function getCategoryType(category: string): string {
  switch (category) {
    case 'colors':
      return 'color';
    case 'spacing':
    case 'radius':
      return 'dimension';
    case 'typography':
      return 'fontSize';
    case 'fontFamilies':
      return 'fontFamily';
    case 'shadows':
      return 'boxShadow';
    case 'transitions':
      return 'transition';
    default:
      return 'other';
  }
}

export function downloadFile(content: string, filename: string, format: ExportFormat): void {
  const extension = format === 'json' ? 'json' : 
                   format === 'scss' ? 'scss' : 
                   format === 'figma' ? 'json' : 'css';
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}