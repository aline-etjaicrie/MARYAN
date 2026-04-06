import { MARYAN_APP_COPILOTE_PROMPT } from '../apps/copilote';
import { MARYAN_APP_DASHBOARD_PROMPT } from '../apps/dashboard';
import { MARYAN_APP_DIAGNOSTIC_PROMPT } from '../apps/diagnostic';
import { MARYAN_APP_RADAR_PROMPT } from '../apps/radar';
import { MARYAN_APP_RESSOURCES_PROMPT } from '../apps/ressources';
import { MARYAN_CORE_PROMPT } from '../core/maryan-core-prompt';
import { MARYAN_POLICIES_PROMPT } from '../core/maryan-policies';
import { buildMaryanDbBlocks } from '../shared/db-blocks';
import type { BuildMaryanPromptInput, MaryanAppType } from '../shared/types';
import { getCollectiviteVariant } from '../variants/collectivite';
import { getExperienceVariant } from '../variants/experience';
import { getPoliticalContextVariant } from '../variants/political-context';
import { getRoleVariant } from '../variants/role';
import { getSituationModeVariant } from '../variants/situation-mode';

function getAppPrompt(app: MaryanAppType): string {
  switch (app) {
    case 'copilote':
      return MARYAN_APP_COPILOTE_PROMPT;
    case 'ressources':
      return MARYAN_APP_RESSOURCES_PROMPT;
    case 'radar':
      return MARYAN_APP_RADAR_PROMPT;
    case 'diagnostic':
      return MARYAN_APP_DIAGNOSTIC_PROMPT;
    case 'dashboard':
      return MARYAN_APP_DASHBOARD_PROMPT;
    default:
      return MARYAN_APP_COPILOTE_PROMPT;
  }
}

function wrapTaskInstruction(taskInstruction?: string | null): string | null {
  if (!taskInstruction?.trim()) return null;

  return `Instruction de tâche spécifique :
${taskInstruction.trim()}`;
}

export function buildMaryanPrompt(input: BuildMaryanPromptInput): string {
  const {
    app,
    role = 'inconnu',
    experience = 'inconnu',
    politicalContext = 'inconnu',
    collectivite = 'inconnu',
    situationMode = null,
    blocks = {},
    taskInstruction,
    additionalSections = []
  } = input;

  return [
    MARYAN_CORE_PROMPT,
    MARYAN_POLICIES_PROMPT,
    getAppPrompt(app),
    getRoleVariant(role),
    getExperienceVariant(experience),
    getPoliticalContextVariant(politicalContext),
    getCollectiviteVariant(collectivite),
    getSituationModeVariant(situationMode),
    wrapTaskInstruction(taskInstruction),
    ...additionalSections,
    buildMaryanDbBlocks(blocks)
  ]
    .filter(Boolean)
    .join('\n\n');
}
