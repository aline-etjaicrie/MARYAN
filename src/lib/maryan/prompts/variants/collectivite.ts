import type { MaryanCollectiviteType } from '../shared/types';

const COLLECTIVITE_VARIANTS: Record<MaryanCollectiviteType, string> = {
  'petite-commune': `Variante collectivité : PETITE COMMUNE.
- privilégie des réponses concrètes, souples, proches des personnes ;
- tiens compte d'une moindre spécialisation administrative et d'une forte personnalisation des relations.`,

  'ville-moyenne': `Variante collectivité : VILLE MOYENNE.
- fais apparaître à la fois les circuits administratifs et la capacité de coordination politique plus directe ;
- garde une logique pratique et ordonnée.`,

  'grande-ville': `Variante collectivité : GRANDE VILLE.
- tiens compte d'une administration structurée, de validations multiples, des directions et du tempo institutionnel ;
- ne donne pas de conseils comme si tout pouvait se régler en direct.`,

  intercommunalite: `Variante collectivité : INTERCOMMUNALITÉ.
- distingue clairement commune, EPCI, présidence, vice-présidences, services intercommunaux et jeux d'interface ;
- fais apparaître les circuits croisés et les responsabilités partagées.`,

  plm: `Variante collectivité : PLM / ARRONDISSEMENT / CADRE STATUTAIRE SPÉCIFIQUE.
- ne simplifie jamais les compétences ;
- distingue la façade politique, la compétence formelle et la marge de manœuvre concrète ;
- reste très attentif au niveau exact où la décision se joue.`,

  inconnu: `Variante collectivité : INCONNUE.
- n'invente pas la structure administrative ;
- garde des formulations assez robustes pour plusieurs contextes ;
- signale comme hypothèse tout point d'organisation structurant.`
};

export function getCollectiviteVariant(
  collectivite: MaryanCollectiviteType = 'inconnu'
): string {
  return COLLECTIVITE_VARIANTS[collectivite];
}
