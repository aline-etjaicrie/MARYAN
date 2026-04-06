export type MaryanAppType = 'copilote' | 'ressources' | 'radar' | 'diagnostic' | 'dashboard';

export type MaryanUserRole =
  | 'maire'
  | 'adjoint'
  | 'conseiller-majorite'
  | 'conseiller-opposition'
  | 'elu-arrondissement'
  | 'elu-intercommunal'
  | 'inconnu';

export type MaryanExperienceLevel = 'debutant' | 'intermediaire' | 'experimente' | 'inconnu';

export type MaryanPoliticalContext =
  | 'majorite-stable'
  | 'majorite-fragile'
  | 'opposition'
  | 'coalition'
  | 'conflictuel'
  | 'inconnu';

export type MaryanCollectiviteType =
  | 'petite-commune'
  | 'ville-moyenne'
  | 'grande-ville'
  | 'intercommunalite'
  | 'plm'
  | 'inconnu';

export type MaryanSituationMode =
  | 'prise_de_reperes'
  | 'soutien_reassurance'
  | 'reprise_de_recul'
  | 'arbitrage_cadrage'
  | 'lecture_de_tension'
  | 'parole_exposition'
  | 'explication_pedagogique'
  | 'cadre_relation_projet'
  | 'ia_usage_reflechi'
  | 'vigilance_risque'
  | 'cadrage_general'
  | 'inconnu';

export interface MaryanGlobalPromptBlocks {
  profileDb?: string | null;
  accessDb?: string | null;
  sessionDb?: string | null;
  catalogDb?: string | null;
  rightsDb?: string | null;
  radarDb?: string | null;
  additionalContext?: string | null;
}

export interface BuildMaryanPromptInput {
  app: MaryanAppType;
  role?: MaryanUserRole;
  experience?: MaryanExperienceLevel;
  politicalContext?: MaryanPoliticalContext;
  collectivite?: MaryanCollectiviteType;
  situationMode?: MaryanSituationMode | null;
  blocks?: MaryanGlobalPromptBlocks;
  taskInstruction?: string | null;
  additionalSections?: Array<string | null | undefined>;
}

export interface BuildMaryanChatSystemPromptInput extends BuildMaryanPromptInput {
  analysisContext?: string | null;
  resourcesContext?: string | null;
}

export interface MaryanProfileContextSource {
  firstName?: string | null;
  role?: string | null;
  commune?: string | null;
  diagnosticKey?: string | null;
  diagnosticLabel?: string | null;
  experience?: string | null;
  tags?: string[] | null;
  plan?: string | null;
  source?: string | null;
  note?: string | null;
}

export interface MaryanAccessContextSource {
  plan?: string | null;
  status?: string | null;
  accessibleFeatures?: string[] | null;
  restrictedFeatures?: string[] | null;
  remainingFreeMessages?: number | null;
  notes?: string[] | null;
}

export interface MaryanSessionContextSource {
  summary?: string | null;
  clarifiedPoints?: string[] | null;
  openQuestions?: string[] | null;
  lastUserNeed?: string | null;
}

export interface MaryanCatalogContextItem {
  title: string;
  slug?: string | null;
  kind?: string | null;
  promise?: string | null;
  access?: string | null;
}

export interface MaryanRightsContextItem {
  title: string;
  reference?: string | null;
  summary?: string | null;
}

export interface MaryanRadarContextItem {
  title: string;
  proofStatus?: 'verified' | 'internal' | 'unverified' | string | null;
  sourceName?: string | null;
  sourceUrl?: string | null;
  publicSummary?: string | null;
  maryanSummary?: string | null;
}
