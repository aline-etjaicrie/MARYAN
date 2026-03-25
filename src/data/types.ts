export type DiagnosticProfile =
  | "mandat_recent"
  | "arbitrage"
  | "isolement"
  | "surcharge"
  | "exposition"
  | "tension_relationnelle"
  | "besoin_methode"
  | "prise_de_parole"
  | "gouvernance";

export type TargetRole =
  | "maire"
  | "adjoint"
  | "conseiller_municipal"
  | "majorite"
  | "opposition"
  | "maire_arrondissement"
  | "adjoint_arrondissement"
  | "conseiller_arrondissement"
  | "conseiller_paris"
  | "interco"
  | "conseiller_communautaire"
  | "vice_president_interco"
  | "president_epci"
  | "elu_metropolitain"
  | "maire_de_secteur";

export type InstitutionContext =
  | "commune"
  | "paris"
  | "plm"
  | "intercommunalite";

export type MaryanResource = {
  id: string;
  title: string;
  slug: string;
  pillar: "se_situer" | "comprendre" | "agir" | "se_proteger";
  format: "fiche" | "guide" | "checklist" | "repere" | "parcours";
  promise: string;
  intro: string;
  understand: string[];
  commonTrap: string;
  actions: string[];
  reflex: string;
  sensitiveNote?: string;
  targetRoles: Array<TargetRole>;
  institutionContexts?: Array<InstitutionContext>;
  experienceLevels: Array<"debutant" | "intermediaire" | "confirme">;
  diagnosticProfiles: Array<DiagnosticProfile>;
  useCases: string[];
  tags: string[];
  ctaType: "copilote" | "offre_individuelle" | "offre_collectivite" | "formation_irl";
  irlPotential: boolean;
  priority: "haute" | "moyenne";
};

export type MaryanPath = {
  id: string;
  title: string;
  slug: string;
  promise: string;
  description: string;
  diagnosticProfiles: Array<DiagnosticProfile>;
  targetRoles: Array<TargetRole>;
  experienceLevels: Array<"debutant" | "intermediaire" | "confirme">;
  priorities: string[];
  resourceIds: string[];
  ctaType: "copilote" | "offre_individuelle" | "offre_collectivite" | "formation_irl";
  irlPotential: boolean;
};

export type MaryanSituation = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  diagnosticProfiles: Array<DiagnosticProfile>;
  targetRoles: Array<TargetRole>;
  experienceLevels: Array<"debutant" | "intermediaire" | "confirme">;
  pillars: Array<"se_situer" | "comprendre" | "agir" | "se_proteger">;
  resourceIds: string[];
  pathIds: string[];
  priorities: string[];
  ctaType: "copilote" | "offre_individuelle" | "offre_collectivite" | "formation_irl";
};
