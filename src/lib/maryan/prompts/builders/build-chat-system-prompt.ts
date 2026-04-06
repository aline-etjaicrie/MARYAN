import { buildMaryanPrompt } from './build-maryan-prompt';
import type { BuildMaryanChatSystemPromptInput } from '../shared/types';

function wrapSection(title: string, value?: string | null): string | null {
  if (!value || !value.trim()) return null;
  return `${title} :
${value.trim()}`;
}

export function buildMaryanChatSystemPrompt(input: BuildMaryanChatSystemPromptInput): string {
  const { analysisContext, resourcesContext, blocks = {}, additionalSections = [], ...rest } = input;

  const mergedBlocks = {
    ...blocks,
    additionalContext: [
      blocks.additionalContext?.trim() || null,
      wrapSection('Lecture prioritaire de la demande actuelle', analysisContext),
      wrapSection('Ressources utiles réellement disponibles', resourcesContext)
    ]
      .filter(Boolean)
      .join('\n\n')
  };

  return buildMaryanPrompt({
    ...rest,
    blocks: mergedBlocks,
    additionalSections
  });
}
