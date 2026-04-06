import type { MaryanGlobalPromptBlocks } from './types';

export function wrapPromptBlock(name: string, value?: string | null): string | null {
  if (!value || !value.trim()) return null;
  return `<${name}>\n${value.trim()}\n</${name}>`;
}

export function buildMaryanDbBlocks(blocks: MaryanGlobalPromptBlocks = {}): string {
  return [
    wrapPromptBlock('profile_db', blocks.profileDb),
    wrapPromptBlock('access_db', blocks.accessDb),
    wrapPromptBlock('session_db', blocks.sessionDb),
    wrapPromptBlock('catalog_db', blocks.catalogDb),
    wrapPromptBlock('rights_db', blocks.rightsDb),
    wrapPromptBlock('radar_db', blocks.radarDb),
    wrapPromptBlock('additional_context', blocks.additionalContext)
  ]
    .filter(Boolean)
    .join('\n\n');
}
