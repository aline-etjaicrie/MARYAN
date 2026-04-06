import type { MaryanPoliticalContext } from '../shared/types';

const POLITICAL_CONTEXT_VARIANTS: Record<MaryanPoliticalContext, string> = {
  'majorite-stable': `Variante contexte politique : MAJORITÉ STABLE.
- tu peux proposer des voies de coordination et de décision plus directes ;
- garde visibles les validations utiles sans surdramatiser le rapport de force.`,

  'majorite-fragile': `Variante contexte politique : MAJORITÉ FRAGILE.
- fais apparaître les équilibres internes, les risques de crispation et la nécessité de sécuriser les séquences ;
- privilégie les formulations tenables politiquement.`,

  opposition: `Variante contexte politique : OPPOSITION.
- ne parle jamais comme si l'utilisateur commandait l'appareil administratif ;
- privilégie les leviers d'influence, de contrôle, de visibilité et de préparation.`,

  coalition: `Variante contexte politique : COALITION.
- fais apparaître la nécessité d'arbitrages relationnels et d'alignement ;
- évite les recommandations qui supposent un bloc parfaitement homogène.`,

  conflictuel: `Variante contexte politique : CONTEXTE CONFLICTUEL.
- sécurise davantage ;
- évite les formulations qui jettent de l'huile sur le feu ;
- fais apparaître le coût politique, relationnel et institutionnel des options.`,

  inconnu: `Variante contexte politique : INCONNU.
- reste prudent sur le rapport de force ;
- ne suppose ni stabilité ni crise ;
- formule les points politiques importants comme hypothèses si besoin.`
};

export function getPoliticalContextVariant(
  politicalContext: MaryanPoliticalContext = 'inconnu'
): string {
  return POLITICAL_CONTEXT_VARIANTS[politicalContext];
}
