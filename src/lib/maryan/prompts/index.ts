export { MARYAN_CORE_PROMPT } from './core/maryan-core-prompt';
export {
  MARYAN_ACCESS_POLICY_PROMPT,
  MARYAN_DATA_POLICY_PROMPT,
  MARYAN_POLICIES_PROMPT,
  MARYAN_RADAR_POLICY_PROMPT,
  MARYAN_RESOURCES_POLICY_PROMPT,
  MARYAN_SENSITIVE_POLICY_PROMPT,
  MARYAN_STYLE_POLICY_PROMPT
} from './core/maryan-policies';

export { MARYAN_APP_COPILOTE_PROMPT } from './apps/copilote';
export { MARYAN_APP_RESSOURCES_PROMPT } from './apps/ressources';
export { MARYAN_APP_RADAR_PROMPT } from './apps/radar';
export { MARYAN_APP_DIAGNOSTIC_PROMPT } from './apps/diagnostic';
export { MARYAN_APP_DASHBOARD_PROMPT } from './apps/dashboard';

export { getRoleVariant } from './variants/role';
export { getExperienceVariant } from './variants/experience';
export { getPoliticalContextVariant } from './variants/political-context';
export { getCollectiviteVariant } from './variants/collectivite';
export { getSituationModeVariant } from './variants/situation-mode';

export { buildProfileContext } from './adapters/profile-context';
export { buildAccessContext } from './adapters/access-context';
export { buildSessionContext } from './adapters/session-context';
export { buildCatalogContext } from './adapters/catalog-context';
export { buildRightsContext } from './adapters/rights-context';
export { buildRadarContext } from './adapters/radar-context';

export { wrapPromptBlock, buildMaryanDbBlocks } from './shared/db-blocks';
export type {
  BuildMaryanChatSystemPromptInput,
  BuildMaryanPromptInput,
  MaryanAccessContextSource,
  MaryanAppType,
  MaryanCatalogContextItem,
  MaryanCollectiviteType,
  MaryanExperienceLevel,
  MaryanGlobalPromptBlocks,
  MaryanPoliticalContext,
  MaryanProfileContextSource,
  MaryanRadarContextItem,
  MaryanRightsContextItem,
  MaryanSessionContextSource,
  MaryanSituationMode,
  MaryanUserRole
} from './shared/types';

export { buildMaryanPrompt } from './builders/build-maryan-prompt';
export { buildMaryanChatSystemPrompt } from './builders/build-chat-system-prompt';
