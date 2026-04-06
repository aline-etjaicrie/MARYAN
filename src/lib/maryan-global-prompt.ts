import {
  buildMaryanDbBlocks,
  MARYAN_CORE_PROMPT,
  MARYAN_POLICIES_PROMPT,
  type MaryanGlobalPromptBlocks
} from './maryan/prompts';

export type { MaryanGlobalPromptBlocks } from './maryan/prompts';

export const MARYAN_GLOBAL_PROMPT = [MARYAN_CORE_PROMPT, MARYAN_POLICIES_PROMPT].join('\n\n');

export function buildMaryanGlobalPrompt(blocks: MaryanGlobalPromptBlocks = {}): string {
  return [MARYAN_GLOBAL_PROMPT, buildMaryanDbBlocks(blocks)].filter(Boolean).join('\n\n');
}
